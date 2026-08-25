# 🧙 React Prep Wizard (v2.0)

> An elite, high-performance **React 19 + TypeScript + Vite 6 + Zustand + CodeMirror 6** technical interview & assessment crucible. Engineered from first principles with **Display-P3 / HDR Wide Color Gamut**, **React Compiler**, and **zero-freeze declarative sandboxes**.

---

## 🌟 What is React Prep Wizard?

React Prep Wizard is an offline-capable, local workbench designed for mastering React frontend architecture, CSS layouts, and live technical interviews. It includes 9 integrated modules covering everything from basic DOM atoms to complex state management and responsive grid architecture.

---

## 🚀 Key Modules & Capabilities

| Module | Route | Highlights |
| :--- | :--- | :--- |
| **🏠 Dashboard** | `/` | Campaign progression, rank tiers, XP metrics, next recommended objective, real-time activity stream. |
| **🎨 CSS 100** | `/css100` | 100 graded drills, live SVG wireframe target overlay (HUD Mode), computed style spec verifiers, 75s sprint timer, Before vs After vs Mine comparison. |
| **⚔️ Campaign Arena** | `/arena` | Quest-gated challenges with live test execution, hint tiers, defense questions, and Python backend sync (`/api/challenge`). |
| **⚡ Practice Set** | `/challenges` | 6 ungated standard drills: Step Counter, Live Search, Todo App, Pagination, Form Validation, Debounce Effect. |
| **🪜 Layout Ladder** | `/ladder` | 70-lesson progressive CSS curriculum across 9 stages: Atoms, Flexbox, Grid, Track Sizing, Container Queries, Reactivity. |
| **🧪 Playground** | `/playground` | Instant React 19 scratchpad with hot-reloading JSX and CSS compilation. |
| **🎯 UI Targets** | `/targets` | 10 layout archetype targets (Centered Box, Action Bar, App Shell, Modal Dialog) with timed speed recall tests. |
| **🧩 Match the Target** | `/match` | Pixel-accuracy CSS visual battles comparing your stylesheet against reference targets in real-time. |
| **🔥 Rapid Fire** | `/rapid` | Timed speed quiz testing JS closures, event loop microtasks, React hooks, and CSS edge cases. |

---

## 💎 First-Principles Architectural Enhancements

### 1. Zero-Freeze Declarative Sandbox Frames
- **Legacy Issue**: Browsers wipe iframe DOM on `display: none` or tab switching, causing permanent UI freezes and zombie render states.
- **Solution**: [`SandboxFrame.tsx`](src/components/preview/SandboxFrame.tsx) is a controlled declarative iframe component driven by pure React props. Switching tabs or modes cleanly mounts/unmounts isolated sandboxes without shared state leaks.

### 2. Native CodeMirror 6 with Emmet on Enter & Tab
- **Legacy Issue**: Custom regex indentation scripts clashed with Emmet and Enter key dispatchers.
- **Solution**: Native `@emmetio/codemirror6-plugin` integrated with custom Enter handlers:
  - Type `div.red` or `div.class_name` + **Enter** $\to$ immediately expands to `<div className="class_name">...</div>`.
  - Press **Enter** between matching tags `<tag>|</tag>` $\to$ automatically expands to a formatted multi-line indented block.
  - Native AST-aware smart indentation and bracket completion.

### 3. Rainbow Indentation Guides (Display-P3 Wide Gamut)
- Visual vertical guide lines dynamically rendered at each indentation depth level (2-space increments) with vibrant wide-gamut hues.

### 4. React Compiler & Display-P3 / HDR Color Tokens
- Built with `babel-plugin-react-compiler` targeting React 19 for automatic fine-grained reactivity.
- Visual tokens leverage CSS `@supports (color: color(display-p3 1 1 1))` and OKLCH color spaces for high dynamic range displays.

### 5. Persistent Telemetry & Auth (SQLite + Python)
- **Use Case:** The architecture has shifted from ephemeral local state to a persistent SaaS structure. `server.py` now implements a secure Auth layer (JWT-style session tokens, hashed passwords) and an SQLite database (`local_state.db`). It permanently records telemetry (event sourcing), completed challenges, XP progression, and code snapshots.
- **Why it matters:** Candidates can resume sessions securely, and progression data is now immune to local browser cache wipes. 

---

## 🚀 Deployment Strategy (Always Live, Performant, Totally Free)

Because the platform now utilizes a **Python native HTTP Server + Local SQLite Database**, it cannot be deployed on ephemeral serverless platforms (like Vercel or Cloudflare Workers) which wipe local disk writes on cold starts. 

To deploy this **"As Is" (totally free, always live, performant)**, you must use a free-tier Virtual Private Server (VPS) that provides persistent block storage:

1. **Google Cloud Platform (GCP) - e2-micro (Recommended)**
   - **Cost:** 100% Free forever (1 instance per month in us-central1, us-east1, or us-west1).
   - **Storage:** 30 GB standard persistent disk (more than enough for SQLite and Vite static chunks).
   - **Performance:** Dedicated micro-VM that never sleeps.
2. **Oracle Cloud Infrastructure (OCI) - Always Free**
   - **Cost:** 100% Free forever.
   - **Compute:** Up to 4 ARM Ampere A1 Compute instances (or 2 AMD x86 instances).
   - **Storage:** 200 GB persistent block volume.

**Setup Instructions for VPS:**
```bash
# 1. Clone your repo onto the VPS
git clone <repo-url>
cd react-prep-wizard

# 2. Build the Vite frontend
npm install
npm run build

# 3. Start the backend persistently (using systemd or screen/tmux)
python3 server.py
# (It will serve the production static files from dist/ and listen for API calls)
```

---

## 🛠️ Quickstart & Local Development

### 1. Install Dependencies
```bash
cd react-prep-wizard
npm install
```

### 2. Start the Full Stack (Frontend + Python Backend + SQLite)
```bash
npm run dev:all
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser. (The Python backend will automatically initialize `local_state.db` and serve APIs on port 8777).

### 3. Build for Production
```bash
npm run build
```

---

## 📊 Code Budget & Strict Quality Standards

- **Strict File Budget**: Every single application component and page file is strictly **under 200 lines of code**.
- **Unified State**: Single Zustand store (`src/store.ts`).
- **Zero Main-Thread Blocking**: JSX transform, Prettier formatting, and AST Semantic Evaluation execute in dedicated off-thread Web Workers.
