import { getDefaultDiagramForTopic } from '../src/lib/diagram/diagramTemplates';
import { extractGoogleDriveId, buildDrawIoEmbedUrl, buildDrawIoGoogleDriveUrl, parseDrawIoXml, appendDiagramTab } from '../src/lib/diagram/diagramUtils';

console.log('🧪 Running Murat Test Suite: Architecture Diagram Engine & GDrive Integration...\n');

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passCount++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    failCount++;
  }
}

// Test 1: URL to Pixels routing
const urlToPixelsDiag = getDefaultDiagramForTopic('web-platform-critical-rendering-path', 'URL to pixels — the critical rendering path');
assert(urlToPixelsDiag.includes('Critical Rendering Path — URL to Pixels Execution Flow'), 'URL to Pixels resolves Critical Rendering Path diagram');
assert(urlToPixelsDiag.includes('HTML Stream Parser'), 'Critical Rendering Path diagram includes HTML Parser');
assert(urlToPixelsDiag.includes('GPU Compositing'), 'Critical Rendering Path diagram includes GPU Compositing');

// Test 2: CORS / Security routing
const corsDiag = getDefaultDiagramForTopic('web-platform-cors', 'CORS, the same-origin policy, and preflight');
assert(corsDiag.includes('Web Security'), 'CORS topic resolves Web Security diagram');
assert(corsDiag.includes('Preflight Request'), 'CORS diagram includes Preflight Request node');

// Test 3: Event Loop routing
const eventLoopDiag = getDefaultDiagramForTopic('javascript-event-loop', 'Event Loop and Microtask Queue');
assert(eventLoopDiag.includes('V8 Engine Event Loop'), 'Event Loop topic resolves Event Loop diagram');
assert(eventLoopDiag.includes('Microtask Queue'), 'Event Loop diagram includes Microtask Queue');

// Test 4: Hooks routing
const hooksDiag = getDefaultDiagramForTopic('react-hooks-lifecycle', 'React Hooks State Machine');
assert(hooksDiag.includes('React Hooks Linked List'), 'Hooks topic resolves Hooks State Machine diagram');

// Test 5: Google Drive Link Parsing
const gdriveUrl = 'https://drive.google.com/file/d/1Gqr4_E4MBM9njW8r4ZzuP1Lzkf19vi9q/view?usp=sharing';
const extractedId = extractGoogleDriveId(gdriveUrl);
assert(extractedId === '1Gqr4_E4MBM9njW8r4ZzuP1Lzkf19vi9q', 'Extracts exact Google Drive file ID from sharing link');

// Test 6: Draw.io Embed URL formation
const embedUrl = buildDrawIoEmbedUrl({ gdriveId: extractedId || undefined });
assert(embedUrl.includes('stealth=1'), 'Embed URL includes stealth=1 (zero telemetry / notifications)');
assert(embedUrl.includes('sync=none'), 'Embed URL includes sync=none (zero 404 polling)');
assert(!embedUrl.includes('#G'), 'Embed URL does not contain crashing #G hash inside iframe src');

// Test 7: External Diagrams.net Google Drive URL
const extUrl = buildDrawIoGoogleDriveUrl(extractedId!);
assert(extUrl === 'https://app.diagrams.net/#G1Gqr4_E4MBM9njW8r4ZzuP1Lzkf19vi9q', 'External popup launches native Google Drive OAuth hash');

// Test 8: XML AST Parser Verification
const ast = parseDrawIoXml(urlToPixelsDiag);
assert(ast.nodes.length >= 6, 'Parses AST nodes correctly for Socratic AI Agent');
assert(ast.edges.length >= 5, 'Parses AST edges correctly for Socratic AI Agent');

// Test 9: Multi-tab Append Verification (Never Overwrites User Diagram)
const multiTabXml = appendDiagramTab(urlToPixelsDiag, 'AI Enhanced Review', '<mxCell id="99" value="AI Invariant Check" vertex="1" parent="1"><mxGeometry x="100" y="100" width="100" height="50" as="geometry" /></mxCell>');
assert(multiTabXml.includes('name="Topic Architecture"'), 'Preserves original user tab name and content');
assert(multiTabXml.includes('name="AI Enhanced Review"'), 'Adds new AI tab cleanly');
assert(multiTabXml.includes('value="AI Invariant Check"'), 'Includes AI nodes in the new tab');

console.log(`\n📊 Test Results: ${passCount} passed, ${failCount} failed.\n`);
if (failCount > 0) {
  process.exit(1);
}
