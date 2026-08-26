import { QueryClient } from '@tanstack/react-query';
import { ApiError } from './apiError';

/**
 * `retry: 1` retried everything, including the failures that can never succeed
 * on a second attempt. Retrying a 401 cannot produce a token, and retrying a
 * 422 cannot fix the payload — it only doubles the log noise and delays the
 * error the user is waiting to see. Only genuinely transient failures repeat.
 */
const shouldRetry = (failureCount: number, error: unknown): boolean => {
  if (error instanceof ApiError) {
    if (!error.isRetryable) return false;
    // A cold or migrating backend deserves more patience than a flaky request.
    return failureCount < (error.status === 503 ? 3 : 2);
  }
  return failureCount < 1;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10_000,
      refetchOnWindowFocus: true,
      retry: shouldRetry,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
    },
    mutations: {
      // A save that failed on a dropped connection is worth one more attempt;
      // a rejected one is not.
      retry: (count, error) => error instanceof ApiError && error.status === 0 && count < 1,
    },
  },
});
