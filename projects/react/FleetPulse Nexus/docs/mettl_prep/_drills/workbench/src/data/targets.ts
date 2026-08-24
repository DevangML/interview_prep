export interface TargetArchetype {
  id: number;
  title: string;
  time: string;
  html: string;
  checks: string[];
}

export const TARGETS_DATA: TargetArchetype[] = [
  {
    id: 1,
    title: 'Centered Box',
    time: '2 min',
    html: `<div class="t-center" style="min-height:220px;display:grid;place-items:center;padding:16px;">
  <div style="width:100%;max-width:420px;background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:24px;box-shadow:0 4px 12px rgba(0,0,0,0.08)">
    <h2 style="margin:0 0 12px;font-size:1.2rem;font-weight:700">Sign in</h2>
    <p style="margin:0;color:#586069">Card body</p>
  </div>
</div>`,
    checks: [
      'box-sizing reset typed first',
      '100dvh not 100vh',
      'max-width on the card, width:100% under it',
    ],
  },
  {
    id: 2,
    title: 'Action Bar',
    time: '3 min',
    html: `<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;padding:12px;background:#fff;border-radius:8px;border:1px solid #e5e7eb">
  <div style="flex:1 1 200px">
    <input style="width:100%;padding:8px 12px;border:1px solid #d1d5db;border-radius:6px" type="search" placeholder="Search…">
  </div>
  <div style="display:flex;gap:8px">
    <button style="padding:8px 16px;border-radius:6px;border:1px solid #d1d5db;background:#fff;cursor:pointer">Filter</button>
    <button style="padding:8px 16px;border-radius:6px;border:1px solid #2563eb;background:#2563eb;color:#fff;font-weight:500;cursor:pointer">Add item</button>
  </div>
</div>`,
    checks: [
      'input has a <label> (.sr-only if invisible)',
      'flex:1 1 200px on the grow side',
      'flex-wrap:wrap — check at 375px',
    ],
  },
  {
    id: 3,
    title: 'Data List',
    time: '3 min',
    html: `<ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px">
  <li style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 16px;background:#fff;border:1px solid #e5e7eb;border-radius:6px">
    <div><p style="margin:0;font-weight:600">Primary title</p><span style="font-size:0.85rem;color:#6b7280">2 hours ago</span></div>
    <div style="display:flex;align-items:center;gap:8px"><span style="font-size:0.75rem;padding:2px 8px;border-radius:999px;background:#e0f2fe;color:#0369a1">Active</span><button style="border:none;background:transparent;font-size:1.2rem;cursor:pointer;color:#6b7280">&times;</button></div>
  </li>
</ul>`,
    checks: [
      'ul reset: list-style none, margin 0, padding 0',
      'icon button has aria-label',
      'gap on the column, not margins',
    ],
  },
  {
    id: 4,
    title: 'Card Grid',
    time: '90 sec',
    html: `<div style="display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))">
  <div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;min-height:120px"><h4 style="margin:0 0 8px">Card 1</h4><p style="margin:0;font-size:0.9rem;color:#4b5563">Summary text.</p><div style="margin-top:12px;font-weight:700">$1,240</div></div>
  <div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;min-height:120px"><h4 style="margin:0 0 8px">Card 2</h4><p style="margin:0;font-size:0.9rem;color:#4b5563">Summary text.</p><div style="margin-top:12px;font-weight:700">$2,450</div></div>
</div>`,
    checks: [
      'one line: repeat(auto-fit, minmax(220px, 1fr))',
      'know auto-fit vs auto-fill and WHY',
      'no media query needed',
    ],
  },
  {
    id: 5,
    title: 'App Shell',
    time: '5 min',
    html: `<div style="display:grid;grid-template-rows:48px 1fr;grid-template-columns:180px 1fr;grid-template-areas:'hd hd' 'sb main';height:220px;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
  <header style="grid-area:hd;border-bottom:1px solid #e5e7eb;background:#fff;display:flex;align-items:center;padding:0 16px;font-weight:700">Brand</header>
  <aside style="grid-area:sb;border-right:1px solid #e5e7eb;background:#f9fafb;padding:12px;font-size:0.85rem">Sidebar</aside>
  <main style="grid-area:main;padding:16px;background:#fff;overflow-y:auto"><h2 style="margin-top:0;font-size:1.1rem">Dashboard</h2><p style="font-size:0.85rem">Only this area scrolls.</p></main>
</div>`,
    checks: [
      'grid-template-areas, not nested flex',
      '<a> MUST have href or it is not focusable',
      'only main scrolls, page does not',
      'collapses under 640px',
    ],
  },
  {
    id: 6,
    title: 'Modal',
    time: '3 min',
    html: `<div style="padding:16px;background:#f3f4f6;border-radius:8px;display:flex;justify-content:center">
  <div style="width:100%;max-width:380px;background:#fff;border:1px solid #e5e7eb;border-radius:8px;box-shadow:0 10px 25px rgba(0,0,0,0.1);overflow:hidden">
    <header style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid #e5e7eb;font-weight:700">Confirm Action <button style="border:none;background:none;cursor:pointer;font-size:1.1rem">&times;</button></header>
    <div style="padding:16px;font-size:0.9rem">Escape closes this. Focus returns to the trigger.</div>
    <footer style="display:flex;justify-content:flex-end;gap:8px;padding:12px 16px;background:#f9fafb"><button style="padding:6px 12px;border:1px solid #d1d5db;border-radius:6px;background:#fff">Cancel</button><button style="padding:6px 12px;border:none;border-radius:6px;background:#2563eb;color:#fff">Confirm</button></footer>
  </div>
</div>`,
    checks: [
      'native <dialog> + showModal()',
      '::backdrop styled',
      'Escape closes, focus returns to trigger',
      'can name all 6 hand-rolled requirements out loud',
    ],
  },
  {
    id: 7,
    title: 'Form + Inline Validation',
    time: '4 min',
    html: `<form style="display:flex;flex-direction:column;gap:12px;max-width:360px;padding:16px;background:#fff;border:1px solid #e5e7eb;border-radius:8px">
  <div style="display:flex;flex-direction:column;gap:4px">
    <label style="font-size:0.85rem;font-weight:600">Email</label>
    <input style="padding:8px 12px;border:1px solid #b91c1c;border-radius:6px" value="not-an-email">
    <p style="margin:0;font-size:0.8rem;color:#b91c1c" role="alert">Enter a valid email address.</p>
  </div>
  <button style="padding:8px 16px;border:none;border-radius:6px;background:#2563eb;color:#fff;font-weight:500">Submit</button>
</form>`,
    checks: [
      'aria-describedby links input to error',
      'aria-invalid on the field',
      'role=alert on the message',
      'error clears on fix',
    ],
  },
  {
    id: 8,
    title: 'Data Table',
    time: '4 min',
    html: `<div style="overflow-x:auto;background:#fff;border:1px solid #e5e7eb;border-radius:8px">
  <table style="width:100%;border-collapse:collapse;font-size:0.88rem">
    <thead><tr style="background:#f9fafb;border-bottom:1px solid #e5e7eb"><th style="padding:8px 12px;text-align:left">Name</th><th style="padding:8px 12px;text-align:left">Status</th><th style="padding:8px 12px;text-align:right">Amount</th></tr></thead>
    <tbody>
      <tr style="border-bottom:1px solid #f1f5f9"><td style="padding:8px 12px">Alpha Corp</td><td style="padding:8px 12px"><span style="color:#059669">Active</span></td><td style="padding:8px 12px;text-align:right;font-variant-numeric:tabular-nums">$1,240.00</td></tr>
      <tr><td style="padding:8px 12px">Beta LLC</td><td style="padding:8px 12px"><span style="color:#d97706">Pending</span></td><td style="padding:8px 12px;text-align:right;font-variant-numeric:tabular-nums">$450.00</td></tr>
    </tbody>
  </table>
</div>`,
    checks: [
      'wrapper scrolls, page does not',
      'th scope=col',
      'aria-sort on sortable headers',
      'numbers right-aligned, tabular-nums',
    ],
  },
  {
    id: 9,
    title: 'Tabs',
    time: '4 min',
    html: `<div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
  <div style="display:flex;border-bottom:1px solid #e5e7eb;background:#f9fafb">
    <button style="padding:10px 16px;border:none;background:none;border-bottom:2px solid #2563eb;color:#2563eb;font-weight:600;cursor:pointer">Overview</button>
    <button style="padding:10px 16px;border:none;background:none;color:#6b7280;cursor:pointer">Details</button>
  </div>
  <div style="padding:16px;font-size:0.9rem">Overview tab content.</div>
</div>`,
    checks: [
      'tabs are <button>, never <div>',
      'roving tabindex: active 0, rest -1',
      'arrow keys move between tabs',
      'aria-selected drives the style',
    ],
  },
  {
    id: 10,
    title: 'State Triad',
    time: '2 min',
    html: `<div style="display:grid;gap:8px">
  <div style="padding:16px;text-align:center;color:#6b7280;background:#fff;border:1px dashed #d1d5db;border-radius:8px">Loading…</div>
  <div style="padding:16px;text-align:center;color:#6b7280;background:#fff;border:1px dashed #d1d5db;border-radius:8px">No results for "xyz". <button style="margin-left:8px;padding:4px 8px;border:1px solid #d1d5db;border-radius:4px;background:#fff">Clear</button></div>
  <div style="padding:16px;text-align:center;color:#b91c1c;background:#fef2f2;border:1px dashed #fca5a5;border-radius:8px">Failed to load. <button style="margin-left:8px;padding:4px 8px;border:1px solid #fca5a5;border-radius:4px;background:#fff">Retry</button></div>
</div>`,
    checks: [
      'aria-live=polite on loading',
      'role=alert on error',
      'empty state has a MESSAGE and a recovery action',
      'every hidden test case checks these three',
    ],
  },
];
