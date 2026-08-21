> 🔀 **CAMPAIGN PIVOT (2026-08-20).** The 8-level FleetPulse Nexus build below is **PARKED** until the
> Mercer Mettl OA is cleared — it has near-zero transfer to an MCQ + auto-graded-build screening round.
> **Active campaign is now "Operation: Mettl Gate"** — see `SAVE_GAME_STATE.json` (14 quests, 33 challenges,
> lock/unlock gating) and the doc set in `projects/react/FleetPulse Nexus/docs/mettl_prep/` (files 7, 8, 9).
> The roadmap below resumes AFTER the OA, where it becomes strong material for the live technical rounds
> (Phases 2-3) and for the CV. Original state preserved in `SAVE_GAME_STATE.prebuild.bak.json`.

# CRUCIBLE_MANIFEST.md — React SME Real-World Mastery Project

**Active Campaign:** Accenture Custom Software Engineer (React.js, 3+ YOE)  
**Target Date:** ~~August 17, 2026~~ — **UNSET, ask Devang** (OA still upcoming as of 2026-08-20)  
**Workspace Project Root:** `projects/react`  
**Product:** **FleetPulse Nexus** — Enterprise IoT Fleet & Mission Command Orchestrator  

## System Personas
- **Victor (Disruptive Innovation Oracle)**: Product domain design, market disruption, real-world utility architecture.
- **Senku Ishigami (Dr. STONE)**: 10B% logical Socratic drill master, code reviewer, first-principles React mechanics.
- **Jesus Scriptural Anchor**: Steady confidence and grounded peace under high-pressure interview gates.

## Architecture & Quest Roadmap
1. **Level 1: Live Telemetry Ingestion & Stream Engine** (`src/components/telemetry/`)
   - Real-world telemetry stream (packets, rolling latency, pause/resume, sample-rate throttling).
   - Core React mechanics: Fiber double-buffering, Stale Closures, functional state updaters, `useEffect` synchronization & cleanup, `React.memo` custom comparator.
2. **Level 2: Headless Custom Hooks & Network Resilience** (`src/hooks/`)
   - `useTelemetryStream`, `useDebounce`, `useLocalStorage`, `useOnlineStatus`.
   - **Mettl Live-Coding Target**: `useFetch` hook with in-memory response caching, loading/error states, and request cancellation via `AbortController`.
   - Core React mechanics: Encapsulated logic, `useSyncExternalStore`, `useRef` for mutable instance cache.
3. **Level 3: Tactical Fleet Command & Dual-Engine State Architecture** (`src/store/`, `src/components/fleet/`)
   - **Dual-Engine Store Architecture (Zustand + Redux Toolkit)**: Side-by-side implementation of both modern state engines adhering to the exact same `FleetState` interface.
   - **Store Adapter (Facade Pattern)**: Plug-and-play toggle in UI allowing instant switching between Zustand and Redux Toolkit at runtime without altering component consumers.
   - **Single-Vehicle Tactical HUD & Mission Simulator**: Focus viewport on selected vehicle showing localized grid telemetry, sector map, and real-time status.
   - **React 19 Injection**: `useActionState`, `useFormStatus`, and native `useOptimistic` for instantaneous mission dispatch updates.
4. **Level 4: Enterprise React Router, Compound Systems & SSR/Hydration Architecture** (`src/components/ui/`, `src/routes/`)
   - **React Router Navigation (`react-router-dom`)**: Multi-view routing (`/` Command Dashboard, `/vehicles/:id` Tactical Telemetry HUD, `/diagnostics` Architecture Profiler) with `useParams`, `useNavigate`, `useLocation` query params, and Protected Route guards.
   - **Compound Component Design System**: Accessible `<Modal>`, `<Tabs>`, and `<FilterDrawer>` utilizing React Context, `createPortal`, `useImperativeHandle`, `forwardRef`, `useLayoutEffect`, and `useId`.
   - **RSC & SSR Hydration Diagnostic Simulator**: Interactive visualizer contrasting Server Component data payloads, `createRoot` client rendering vs `hydrateRoot` SSR hydration, and JS Event Loop microtask queues.
5. **Level 5: 10,000-Asset High-Density Virtual Grid & Performance Profiler** (`src/components/grid/`)
   - Virtualized windowing grid rendering 10k live assets at 60 FPS, non-blocking real-time search/filter via `useTransition` and `useDeferredValue`.
   - **Performance & Bundling**: React DevTools Profiler audit, identifying re-render bottlenecks, and Webpack code-splitting with `React.lazy` & `<Suspense>`.
6. **Level 6: Enterprise Resilience, Auth Refresh Queue & Security Hardening** (`src/services/`)
   - **Axios/Fetch JWT Interceptor Mutex Queue**: Silent automatic 401 token refresh preventing duplicate refresh calls under concurrent network bursts.
   - **Resilience & Security**: Granular Class Error Boundaries (`componentDidCatch`, `getDerivedStateFromError`), XSS sanitization, REST vs GraphQL error strategies.
7. **Level 7: Automated Mission Test Suite (Vitest + RTL + MSW)** (`src/__tests__/`)
   - **React Testing Library (RTL)**: `userEvent` vs `fireEvent` input simulation, callback assertions on `<Search />`, testing async loaders with `waitFor` & `findBy`.
   - **Mock Service Worker (MSW)**: Intercepting network requests, simulating API failure edge cases, asserting state containment.
8. **Level 8: Advanced UX & Command Control (Backlog)**
   - Predictive degradation models, time-series sparklines, and active command/control dispatching (Sally & Victor's strategic roadmap).
