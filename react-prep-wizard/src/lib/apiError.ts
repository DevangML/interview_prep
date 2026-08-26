/**
 * One way to call the API and one way to fail.
 *
 * The old code did `await r.json()` before checking `r.ok`, so any non-JSON
 * error body — a proxy 502, an HTML 500, a dropped connection — surfaced to the
 * user as "Unexpected token 'I', \"Internal S\"... is not valid JSON". The real
 * failure was never shown and never logged. Every failure now becomes an
 * ApiError carrying a human message, a machine code, and the request id that
 * matches the server log line.
 */

export interface ApiErrorBody {
  code: string;
  message: string;
  status: number;
  requestId?: string;
  fields?: Record<string, string>;
}

export class ApiError extends Error {
  readonly code: string;
  readonly status: number;
  readonly requestId?: string;
  readonly fields?: Record<string, string>;

  constructor(body: ApiErrorBody) {
    super(body.message);
    this.name = 'ApiError';
    this.code = body.code;
    this.status = body.status;
    this.requestId = body.requestId;
    this.fields = body.fields;
  }

  /** True when retrying could plausibly succeed — the server said so, not us. */
  get isRetryable(): boolean {
    return this.status === 0 || this.status === 503 || this.status === 429 || this.status >= 500;
  }
}

/** Messages for the failures that never reach a handler on the server. */
const TRANSPORT: Record<string, string> = {
  offline: 'You appear to be offline. Check your connection and try again.',
  unreachable: 'Cannot reach the server. Is the API running?',
  aborted: 'The request was cancelled.',
};

function transportError(err: unknown, requestId?: string): ApiError {
  if (err instanceof DOMException && err.name === 'AbortError') {
    return new ApiError({ code: 'aborted', message: TRANSPORT.aborted, status: 0, requestId });
  }
  const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
  return new ApiError({
    code: offline ? 'offline' : 'unreachable',
    message: offline ? TRANSPORT.offline : TRANSPORT.unreachable,
    status: 0,
    requestId,
  });
}

/**
 * Reads the error envelope, and degrades sensibly when there isn't one —
 * a bare proxy 502 has no JSON body to parse, and pretending otherwise is how
 * the original bug hid the real cause.
 */
async function toApiError(response: Response): Promise<ApiError> {
  const requestId = response.headers.get('X-Request-ID') ?? undefined;
  let payload: unknown = null;
  try {
    const text = await response.text();
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = null; // Non-JSON body: fall through to the status-based message.
  }

  const envelope = (payload as { error?: ApiErrorBody } | null)?.error;
  if (envelope?.message) {
    return new ApiError({ ...envelope, requestId: envelope.requestId ?? requestId });
  }

  // FastAPI's own `{"detail": "..."}`, for any route not yet using the envelope.
  const detail = (payload as { detail?: unknown } | null)?.detail;
  const message =
    typeof detail === 'string' ? detail : statusMessage(response.status);
  return new ApiError({ code: `http_${response.status}`, message, status: response.status, requestId });
}

function statusMessage(status: number): string {
  if (status === 401) return 'Your session has expired. Please sign in again.';
  if (status === 403) return 'You do not have access to this.';
  if (status === 404) return 'Not found.';
  if (status === 429) return 'Too many requests. Please wait a moment.';
  if (status === 502 || status === 504) return 'Cannot reach the server. Is the API running?';
  if (status === 503) return 'The service is not ready yet. Try again shortly.';
  if (status >= 500) return 'Something went wrong on our side.';
  return `Request failed (${status}).`;
}

export interface RequestOptions extends RequestInit {
  /** Attach the stored bearer token. Defaults to true. */
  auth?: boolean;
}

/**
 * The single entry point. Throws ApiError for every failure, so a caller never
 * has to distinguish "the network died" from "the server said no".
 */
export async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { auth = true, headers, ...init } = options;
  let token: string | null = null;
  try {
    token = auth ? localStorage.getItem('token') : null;
  } catch {
    token = null; // Storage can be unavailable; that is not a request failure.
  }

  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      headers: {
        ...(init.body ? { 'Content-Type': 'application/json' } : {}),
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  } catch (err) {
    const apiError = transportError(err);
    reportError(apiError, url);
    throw apiError;
  }

  if (!response.ok) {
    const apiError = await toApiError(response);
    reportError(apiError, url);
    throw apiError;
  }

  if (response.status === 204) return undefined as T;
  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiError({
      code: 'malformed_response',
      message: 'The server sent a response we could not read.',
      status: response.status,
      requestId: response.headers.get('X-Request-ID') ?? undefined,
    });
  }
}

/** Every API failure reaches the console once, with the id to quote in a bug report. */
function reportError(error: ApiError, url: string): void {
  const id = error.requestId ? ` [request ${error.requestId}]` : '';
  console.error(`API ${error.status || 'network'} ${url} — ${error.code}: ${error.message}${id}`);
}
