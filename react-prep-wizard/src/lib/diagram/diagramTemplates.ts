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

export function getDefaultDiagramForTopic(topicId: string, topicTitle: string): string {
  const lower = (topicId + ' ' + topicTitle).toLowerCase();
  if (lower.includes('fiber') || lower.includes('reconcil') || lower.includes('render') || lower.includes('diff')) {
    return TEMPLATE_FIBER_RECONCILER;
  }
  if (lower.includes('hook') || lower.includes('state') || lower.includes('effect') || lower.includes('memo') || lower.includes('ref')) {
    return TEMPLATE_HOOKS_STATE_MACHINE;
  }
  return TEMPLATE_FIBER_RECONCILER;
}
