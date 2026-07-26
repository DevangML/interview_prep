# Backend Python & Frappe Framework — Technical Syllabus (2026)

- **Produced by:** Technical & Domain Research Specialist
- **Date:** 2026-07-26
- **Question asked:** What is the 98%+ complete 2026 Backend Python & Frappe Framework syllabus for 2-3 YOE software engineering interviews?
- **Method:** web search / doc fetch / curriculum synthesis
- **Confidence:** HIGH
- **Decay class:** MEDIUM
- **Supersedes:** nothing

---

## 1. Overview & Tier Requirements

Python backend and Frappe Framework developers at the 2-3 YOE level must demonstrate strong mastery of Python execution internals (GIL, memory management, decorators, generators, asyncio), database interaction efficiency (solving ORM N+1 problems), RESTful API design standards, and full-stack Frappe Framework architecture (DocTypes, hooks, permission models, background queues).

---

## 2. Topic Inventory & Core Architecture

### A. Python Internals & Advanced Language Mechanics
- **CPython Memory Management:**
  - **Reference Counting:** Every CPython object (`PyObject`) contains an `ob_refcnt` field. Incrementing/decrementing reference count; memory freed immediately when `ob_refcnt == 0`.
  - **Generational Garbage Collector:** Solves **Cyclic References** (`A.ref = B; B.ref = A`). Categorizes non-zero refcnt objects into 3 generations (Gen 0, Gen 1, Gen 2). Uses threshold-based collection to detect and free unreferenced cycles.
- **Global Interpreter Lock (GIL):**
  - Mutex that prevents multiple native threads from executing CPython bytecode simultaneously.
  - **Impact:** Python multithreading does NOT speed up CPU-bound tasks across multiple cores.
  - **Solutions:** Use `multiprocessing` (separate process memory spaces) for CPU-bound work; use `threading` or `asyncio` for I/O-bound work.
- **Decorators & Closures:**
  - **Closure:** A nested function that retains access to variables from its enclosing lexical scope even after the outer function has finished executing.
  - **Decorator:** Function accepting a function, extending its behavior, and returning a replacement function.
  - *Parameterized Decorator Pattern:*
    ```python
    from functools import wraps

    def repeat(num_times):
        def decorator_repeat(func):
            @wraps(func)
            def wrapper(*args, **kwargs):
                for _ in range(num_times):
                    result = func(*args, **kwargs)
                return result
            return wrapper
        return decorator_repeat
    ```
- **Generators & Iterators:**
  - Iterator Protocol: Objects implementing `__iter__()` and `__next__()`.
  - Generators: Functions containing `yield`. Pauses execution and yields control while preserving frame stack. Memory efficient for large streams ($O(1)$ space complexity). `yield from` delegates sub-generators.
- **Async Python (`asyncio`):**
  - **Event Loop:** Manages and dispatches execution of asynchronous tasks and I/O callbacks.
  - **Coroutines:** `async def` functions returning coroutine objects. Must be `await`ed or scheduled as a Task (`asyncio.create_task()`). Non-blocking I/O operations yield control back to the event loop.

### B. REST API Architecture & Standards
- **RESTful Constraints:** Statelessness, Uniform Interface, Cacheability, Layered System, Client-Server.
- **HTTP Status Codes:**
  - `200 OK`, `201 Created`, `204 No Content`.
  - `400 Bad Request`, `401 Unauthorized` (Unauthenticated), `403 Forbidden` (Unauthorized), `404 Not Found`, `409 Conflict`, `422 Unprocessable Entity`, `429 Too Many Requests`.
  - `500 Internal Server Error`, `502 Bad Gateway`, `503 Service Unavailable`, `504 Gateway Timeout`.
- **Authentication Mechanisms:**
  - **JWT (JSON Web Token):** `Header.Payload.Signature` (HMAC SHA256 / RS256). Stateless validation on backend without DB lookup.
  - **Session Authentication:** Session ID stored in HTTP-only cookie, verified against Redis/Database session store.

### C. ORM Mechanics & Database Performance
- **ORM vs Raw SQL:** ORMs abstract database interactions into domain objects, but can generate inefficient queries if misused.
- **The N+1 Query Problem:**
  - Occurs when fetching a list of $N$ parent records and subsequently making 1 additional database query for each parent to retrieve child relations ($1 + N$ queries total).
  - **Solutions:**
    - **`select_related`:** Performs SQL `INNER/LEFT JOIN` in a single query. Used for 1:1 and Foreign Key (N:1) relationships.
    - **`prefetch_related`:** Executes 2 separate queries (1 for Parents, 1 for Children with `IN` clause) and merges them in Python memory. Used for 1:N and M:N relationships.

### D. Frappe Framework & DocType Architecture

#### 1. Frappe Stack Architecture
- **Components:** Python WSGI (Gunicorn/Werkzeug) + MariaDB/PostgreSQL + Redis (Session/Cache/RQ Workers) + Node.js (Socket.io real-time events) + Frappe Desk SPA.

#### 2. DocType System (Metadata as Code)
- **DocType Types:**
  - **Standard DocType:** Maps directly to a SQL database table (`tabCustomer`).
  - **Single DocType:** Key-Value singleton stored in `tabSingle DocTypes` (`System Settings`).
  - **Submittable DocType:** Lifecycle states: `0` (Draft), `1` (Submitted - read-only), `2` (Cancelled).
  - **Child Table:** Embedded table link; linked to parent via `parent`, `parenttype`, `parentfield`.
- **Controller Lifecycle Hooks:**
  ```
  before_insert → validate → before_save → on_update → [before_submit → on_submit] → [on_cancel] → on_trash
  ```

#### 3. Frappe Extensions & APIs
- **Client Scripts vs Server Scripts:** Client scripts run JS event handlers (`refresh`, `validate`, `onload`) in browser; Server scripts extend DocType execution without modifying core code.
- **`hooks.py` Integration:** Connects custom app functionality to core hooks: `doc_events`, `scheduler_events` (cron jobs), `jinja` filters, `override_whitelisted_methods`.
- **Auto REST API Generation:**
  - Read: `GET /api/resource/{DocType}/{name}`
  - Write: `POST /api/resource/{DocType}`
  - Method Whitelisting: `@frappe.whitelist(allow_guest=False)` decorator exposes Python functions as REST endpoints (`/api/method/app.module.method_name`).

#### 4. Frappe RBAC & Background Jobs
- **Permission Manager:** Role-Based Access Control (RBAC), DocPerm table, User Permissions (Row-level security, e.g., restrict User A to `Company X`).
- **Asynchronous Background Jobs:** Frappe RQ integration via `frappe.enqueue(method, queue='default', timeout=300, **kwargs)`. Queues: `short`, `default`, `long`.

---

## 3. Recommended Study Plan & Hour Allocations

| # | Topic Block | Target Hours | Core Objective |
|---|---|---|---|
| 1 | Python Internals: CPython, Memory & GIL | 8 h | Understand refcnt, GC generations & GIL |
| 2 | Advanced Python: Decorators, Generators & Asyncio | 10 h | Master parameterized decorators, generators & asyncio |
| 3 | REST API Design & Auth Protocols | 6 h | Practice JWT, status codes & OpenAPI specs |
| 4 | ORM Performance & N+1 Query Fixes | 8 h | Debug N+1 queries with select/prefetch related |
| 5 | Frappe Framework: DocTypes & Lifecycle Hooks | 12 h | Build custom DocTypes & controller hooks |
| 6 | Frappe Hooks.py, REST APIs & RBAC | 10 h | Master `hooks.py`, `@frappe.whitelist` & DocPerms |
| 7 | Frappe RQ Jobs & Bench CLI Workflows | 6 h | Implement `frappe.enqueue` & Bench commands |
| **Total** | **Backend Python & Frappe** | **60 h** | **Complete 98%+ Interview Readiness** |

---

## Sources
- [VERIFIED 2026-07-26] https://docs.frappe.io/framework — Official Frappe Framework architecture & DocType docs
- [VERIFIED 2026-07-26] https://www.geeksforgeeks.org/python/python-interview-questions/ — 68-question Python interview bank
