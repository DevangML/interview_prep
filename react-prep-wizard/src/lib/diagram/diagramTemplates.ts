/**
 * Standard draw.io XML wrapper generator
 */
function wrapMxGraph(innerCellsXml: string): string {
  return `<mxfile host="app.diagrams.net" modified="${new Date().toISOString()}" agent="DrawAiAgent" version="24.7.5">
  <diagram id="learning-path-diagram" name="Topic Architecture">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1100" pageHeight="850" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        ${innerCellsXml}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

// 1. Critical Rendering Path (URL to Pixels)
export const TEMPLATE_CRITICAL_RENDERING_PATH = wrapMxGraph(`
  <mxCell id="2" value="Critical Rendering Path — URL to Pixels Execution Flow" style="swimlane;whiteSpace=wrap;html=1;fillColor=#0f172a;strokeColor=#38bdf8;fontColor=#f8fafc;fontSize=14;fontStyle=1;startSize=28;rounded=1;" vertex="1" parent="1">
    <mxGeometry x="40" y="40" width="820" height="460" as="geometry" />
  </mxCell>
  <mxCell id="3" value="1. Network Pipeline\n(DNS -&gt; TCP -&gt; TLS -&gt; HTTP/2)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#38bdf8;fontColor=#f8fafc;fontStyle=1;" vertex="1" parent="2">
    <mxGeometry x="30" y="60" width="160" height="60" as="geometry" />
  </mxCell>
  <mxCell id="4" value="2. HTML Stream Parser\n(Incremental Tokenizer -&gt; DOM)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#06b6d4;fontColor=#f8fafc;fontStyle=1;" vertex="1" parent="2">
    <mxGeometry x="230" y="60" width="170" height="60" as="geometry" />
  </mxCell>
  <mxCell id="5" value="3. CSSOM Construction\n(Render-Blocking Stylesheet Parse)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e1b4b;strokeColor=#818cf8;fontColor=#f8fafc;fontStyle=1;" vertex="1" parent="2">
    <mxGeometry x="230" y="170" width="170" height="60" as="geometry" />
  </mxCell>
  <mxCell id="6" value="4. Render Tree Matching\n(DOM + CSSOM Matching &amp; Display)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#a855f7;fontColor=#f8fafc;fontStyle=1;" vertex="1" parent="2">
    <mxGeometry x="440" y="110" width="170" height="70" as="geometry" />
  </mxCell>
  <mxCell id="7" value="5. Layout / Reflow\n(Box Model Geometry &amp; Viewport)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#f59e0b;fontColor=#f8fafc;fontStyle=1;" vertex="1" parent="2">
    <mxGeometry x="640" y="60" width="150" height="60" as="geometry" />
  </mxCell>
  <mxCell id="8" value="6. Paint &amp; Rasterization\n(Vector Display Lists to Pixels)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#022c22;strokeColor=#10b981;fontColor=#f8fafc;fontStyle=1;" vertex="1" parent="2">
    <mxGeometry x="640" y="170" width="150" height="60" as="geometry" />
  </mxCell>
  <mxCell id="9" value="7. GPU Compositing\n(Layer Tiles to Screen Buffers)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#450a0a;strokeColor=#ef4444;fontColor=#f8fafc;fontStyle=1;" vertex="1" parent="2">
    <mxGeometry x="640" y="280" width="150" height="60" as="geometry" />
  </mxCell>
  <mxCell id="10" value="Script Execution &amp; Defer / Async" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#312e81;strokeColor=#a78bfa;fontColor=#f8fafc;" vertex="1" parent="2">
    <mxGeometry x="30" y="280" width="370" height="50" as="geometry" />
  </mxCell>
  <mxCell id="11" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38bdf8;strokeWidth=2;" edge="1" parent="2" source="3" target="4">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
  <mxCell id="12" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#06b6d4;strokeWidth=2;" edge="1" parent="2" source="4" target="6">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
  <mxCell id="13" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#818cf8;strokeWidth=2;" edge="1" parent="2" source="5" target="6">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
  <mxCell id="14" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#a855f7;strokeWidth=2;" edge="1" parent="2" source="6" target="7">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
  <mxCell id="15" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#f59e0b;strokeWidth=2;" edge="1" parent="2" source="7" target="8">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
  <mxCell id="16" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#10b981;strokeWidth=2;" edge="1" parent="2" source="8" target="9">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
  <mxCell id="17" value="Blocks Parser" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#f43f5e;dashed=1;" edge="1" parent="2" source="10" target="4">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
`);

// 2. React 19 Fiber Reconciler
export const TEMPLATE_FIBER_RECONCILER = wrapMxGraph(`
  <mxCell id="2" value="React 19 Reconciler (Fiber Architecture)" style="swimlane;whiteSpace=wrap;html=1;fillColor=#0f172a;strokeColor=#38bdf8;fontColor=#f8fafc;fontSize=14;fontStyle=1;startSize=28;rounded=1;" vertex="1" parent="1">
    <mxGeometry x="40" y="40" width="760" height="460" as="geometry" />
  </mxCell>
  <mxCell id="3" value="State Update Trigger\n(setState / useActionState)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#38bdf8;fontColor=#f8fafc;fontStyle=1;" vertex="1" parent="2">
    <mxGeometry x="40" y="60" width="180" height="60" as="geometry" />
  </mxCell>
  <mxCell id="4" value="Concurrent Scheduler\n(Prioritized Lanes &amp; Microtasks)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#a855f7;fontColor=#f8fafc;fontStyle=1;" vertex="1" parent="2">
    <mxGeometry x="280" y="60" width="200" height="60" as="geometry" />
  </mxCell>
  <mxCell id="5" value="Render Phase (Interruptible)\nWorkLoopSync / WorkLoopConcurrent" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#f59e0b;fontColor=#f8fafc;fontStyle=1;" vertex="1" parent="2">
    <mxGeometry x="280" y="170" width="200" height="80" as="geometry" />
  </mxCell>
  <mxCell id="6" value="Current Fiber Tree\n(Screen-Visible DOM Repr)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#022c22;strokeColor=#10b981;fontColor=#f8fafc;" vertex="1" parent="2">
    <mxGeometry x="60" y="300" width="180" height="60" as="geometry" />
  </mxCell>
  <mxCell id="7" value="WorkInProgress Fiber Tree\n(Double-Buffering &amp; Diffing)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e1b4b;strokeColor=#6366f1;fontColor=#f8fafc;" vertex="1" parent="2">
    <mxGeometry x="300" y="300" width="200" height="60" as="geometry" />
  </mxCell>
  <mxCell id="8" value="Commit Phase (Synchronous)\nMutation, Layout, Passive Effects" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#450a0a;strokeColor=#ef4444;fontColor=#f8fafc;fontStyle=1;" vertex="1" parent="2">
    <mxGeometry x="540" y="170" width="180" height="80" as="geometry" />
  </mxCell>
  <mxCell id="9" value="Host DOM Mutation\n(DOM paint &amp; Browser Layout)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#10b981;fontColor=#f8fafc;fontStyle=1;" vertex="1" parent="2">
    <mxGeometry x="540" y="300" width="180" height="60" as="geometry" />
  </mxCell>
  <mxCell id="10" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38bdf8;strokeWidth=2;" edge="1" parent="2" source="3" target="4">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
  <mxCell id="11" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#a855f7;strokeWidth=2;" edge="1" parent="2" source="4" target="5">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
  <mxCell id="12" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#f59e0b;strokeWidth=2;" edge="1" parent="2" source="5" target="7">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
  <mxCell id="13" value="alternate pointer" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#94a3b8;dashed=1;strokeWidth=1;" edge="1" parent="2" source="6" target="7">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
  <mxCell id="14" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#ef4444;strokeWidth=2;" edge="1" parent="2" source="5" target="8">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
  <mxCell id="15" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#10b981;strokeWidth=2;" edge="1" parent="2" source="8" target="9">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
`);

// 3. React Hooks State Machine
export const TEMPLATE_HOOKS_STATE_MACHINE = wrapMxGraph(`
  <mxCell id="2" value="React Hooks Linked List &amp; Dispatch Lifecycle" style="swimlane;whiteSpace=wrap;html=1;fillColor=#0f172a;strokeColor=#38bdf8;fontColor=#f8fafc;fontSize=14;fontStyle=1;startSize=28;rounded=1;" vertex="1" parent="1">
    <mxGeometry x="40" y="40" width="760" height="420" as="geometry" />
  </mxCell>
  <mxCell id="3" value="Component Render Invocation" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#38bdf8;fontColor=#f8fafc;fontStyle=1;" vertex="1" parent="2">
    <mxGeometry x="40" y="60" width="180" height="50" as="geometry" />
  </mxCell>
  <mxCell id="4" value="ReactCurrentDispatcher.current\n(HooksDispatcherOnMount / OnUpdate)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#f59e0b;fontColor=#f8fafc;" vertex="1" parent="2">
    <mxGeometry x="270" y="55" width="220" height="60" as="geometry" />
  </mxCell>
  <mxCell id="5" value="Hook Node 1: useState\nmemoizedState: val | next -&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e1b4b;strokeColor=#818cf8;fontColor=#f8fafc;" vertex="1" parent="2">
    <mxGeometry x="40" y="180" width="180" height="60" as="geometry" />
  </mxCell>
  <mxCell id="6" value="Hook Node 2: useEffect\ninst, create, deps | next -&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e1b4b;strokeColor=#818cf8;fontColor=#f8fafc;" vertex="1" parent="2">
    <mxGeometry x="270" y="180" width="190" height="60" as="geometry" />
  </mxCell>
  <mxCell id="7" value="Hook Node 3: useRef\ncurrent: refValue | next: null" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e1b4b;strokeColor=#818cf8;fontColor=#f8fafc;" vertex="1" parent="2">
    <mxGeometry x="510" y="180" width="190" height="60" as="geometry" />
  </mxCell>
  <mxCell id="8" value="Update Queue &amp; Dispatcher\nAction dispatch creates pending circular list" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#064e3b;strokeColor=#34d399;fontColor=#f8fafc;" vertex="1" parent="2">
    <mxGeometry x="180" y="300" width="360" height="60" as="geometry" />
  </mxCell>
  <mxCell id="9" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38bdf8;strokeWidth=2;" edge="1" parent="2" source="3" target="4">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
  <mxCell id="10" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#818cf8;strokeWidth=2;" edge="1" parent="2" source="4" target="5">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
  <mxCell id="11" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#818cf8;strokeWidth=2;" edge="1" parent="2" source="5" target="6">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
  <mxCell id="12" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#818cf8;strokeWidth=2;" edge="1" parent="2" source="6" target="7">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
  <mxCell id="13" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#34d399;strokeWidth=2;" edge="1" parent="2" source="5" target="8">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
`);

// 4. Event Loop & Microtasks Flow
export const TEMPLATE_EVENT_LOOP = wrapMxGraph(`
  <mxCell id="2" value="V8 Engine Event Loop &amp; Task Queues" style="swimlane;whiteSpace=wrap;html=1;fillColor=#0f172a;strokeColor=#38bdf8;fontColor=#f8fafc;fontSize=14;fontStyle=1;startSize=28;rounded=1;" vertex="1" parent="1">
    <mxGeometry x="40" y="40" width="760" height="420" as="geometry" />
  </mxCell>
  <mxCell id="3" value="Call Stack\n(Single-Threaded Execution)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#38bdf8;fontColor=#f8fafc;fontStyle=1;" vertex="1" parent="2">
    <mxGeometry x="40" y="60" width="200" height="70" as="geometry" />
  </mxCell>
  <mxCell id="4" value="Microtask Queue\n(Promises, queueMicrotask, MutationObserver)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e1b4b;strokeColor=#a855f7;fontColor=#f8fafc;fontStyle=1;" vertex="1" parent="2">
    <mxGeometry x="300" y="60" width="240" height="70" as="geometry" />
  </mxCell>
  <mxCell id="5" value="Render Steps\n(rAF, Style Recalc, Layout, Paint)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#022c22;strokeColor=#10b981;fontColor=#f8fafc;fontStyle=1;" vertex="1" parent="2">
    <mxGeometry x="300" y="190" width="240" height="70" as="geometry" />
  </mxCell>
  <mxCell id="6" value="Macrotask / Task Queue\n(setTimeout, setInterval, I/O, UI Events)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#450a0a;strokeColor=#ef4444;fontColor=#f8fafc;fontStyle=1;" vertex="1" parent="2">
    <mxGeometry x="300" y="310" width="240" height="70" as="geometry" />
  </mxCell>
  <mxCell id="7" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#a855f7;strokeWidth=2;" edge="1" parent="2" source="3" target="4">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
  <mxCell id="8" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#10b981;strokeWidth=2;" edge="1" parent="2" source="4" target="5">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
  <mxCell id="9" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#ef4444;strokeWidth=2;" edge="1" parent="2" source="5" target="6">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
`);

// 5. Web Security, CORS & Network
export const TEMPLATE_WEB_SECURITY = wrapMxGraph(`
  <mxCell id="2" value="Web Security &amp; Cross-Origin Resource Sharing (CORS)" style="swimlane;whiteSpace=wrap;html=1;fillColor=#0f172a;strokeColor=#38bdf8;fontColor=#f8fafc;fontSize=14;fontStyle=1;startSize=28;rounded=1;" vertex="1" parent="1">
    <mxGeometry x="40" y="40" width="760" height="420" as="geometry" />
  </mxCell>
  <mxCell id="3" value="Client Origin\nhttps://frontend.dev" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#38bdf8;fontColor=#f8fafc;fontStyle=1;" vertex="1" parent="2">
    <mxGeometry x="40" y="80" width="180" height="60" as="geometry" />
  </mxCell>
  <mxCell id="4" value="Preflight Request\nOPTIONS /api/resource\nOrigin, Access-Control-Request-Method" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e1b4b;strokeColor=#818cf8;fontColor=#f8fafc;" vertex="1" parent="2">
    <mxGeometry x="270" y="50" width="220" height="80" as="geometry" />
  </mxCell>
  <mxCell id="5" value="API Server Target\nhttps://api.backend.com" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#022c22;strokeColor=#10b981;fontColor=#f8fafc;fontStyle=1;" vertex="1" parent="2">
    <mxGeometry x="540" y="80" width="180" height="60" as="geometry" />
  </mxCell>
  <mxCell id="6" value="Server CORS Headers\nAccess-Control-Allow-Origin: *\nAccess-Control-Allow-Credentials: true\nSameSite=Strict Cookies" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#064e3b;strokeColor=#34d399;fontColor=#f8fafc;" vertex="1" parent="2">
    <mxGeometry x="270" y="190" width="220" height="90" as="geometry" />
  </mxCell>
  <mxCell id="7" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#818cf8;strokeWidth=2;" edge="1" parent="2" source="3" target="4">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
  <mxCell id="8" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#10b981;strokeWidth=2;" edge="1" parent="2" source="4" target="5">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
  <mxCell id="9" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#34d399;strokeWidth=2;" edge="1" parent="2" source="5" target="6">
    <mxGeometry relative="1" as="geometry" />
  </mxCell>
`);

export function getDefaultDiagramForTopic(topicId: string, topicTitle: string): string {
  const lower = (topicId + ' ' + topicTitle).toLowerCase();

  // Critical Rendering Path / Browser Pipeline
  if (
    lower.includes('critical-rendering') ||
    lower.includes('url to pixel') ||
    lower.includes('how a page becomes pixels') ||
    lower.includes('parser') ||
    lower.includes('cssom') ||
    lower.includes('reflow')
  ) {
    return TEMPLATE_CRITICAL_RENDERING_PATH;
  }

  // Security, CORS, XSS, CSRF, Cookies
  if (
    lower.includes('cors') ||
    lower.includes('security') ||
    lower.includes('xss') ||
    lower.includes('csrf') ||
    lower.includes('cookie') ||
    lower.includes('same-origin')
  ) {
    return TEMPLATE_WEB_SECURITY;
  }

  // Event loop, Microtasks, Async
  if (
    lower.includes('event-loop') ||
    lower.includes('microtask') ||
    lower.includes('macrotask') ||
    lower.includes('task queue') ||
    lower.includes('asynchronous')
  ) {
    return TEMPLATE_EVENT_LOOP;
  }

  // Hooks & State machine
  if (
    lower.includes('hook') ||
    lower.includes('usestate') ||
    lower.includes('useeffect') ||
    lower.includes('usememo') ||
    lower.includes('useref') ||
    lower.includes('usereducer')
  ) {
    return TEMPLATE_HOOKS_STATE_MACHINE;
  }

  // Fiber Reconciler
  if (
    lower.includes('fiber') ||
    lower.includes('reconcil') ||
    lower.includes('diff') ||
    lower.includes('double-buffer') ||
    lower.includes('concurrent')
  ) {
    return TEMPLATE_FIBER_RECONCILER;
  }

  // Default fallback
  return TEMPLATE_CRITICAL_RENDERING_PATH;
}
