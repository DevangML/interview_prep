import type { ProjectBlueprint } from '../types';

/**
 * The build that teaches layout shift the hard way.
 *
 * An infinite list is trivial until you add images, a back button and a user on
 * a phone. Then it is three problems: a sentinel that must not fire twice, a
 * scroll position that must survive navigation, and a media box that must
 * reserve its space before the bytes arrive.
 */
export const infiniteFeedProject: ProjectBlueprint = {
  id: 'service-infinite-feed',
  title: 'Infinite Feed: Paging, Restoring, And Not Jumping',
  tagline: 'A list that never ends, a back button that works, and a layout that holds still.',
  realWorldAnalog: 'Every social feed, product listing and search results page',
  track: 'service',
  tier: 'flagship',
  difficulty: 'Junior',
  estimatedBuildTimeHours: 10,
  architecturePattern: 'Cursor pagination · observer sentinel · restored scroll',
  summary:
    'Build a feed that pages on scroll, then use it like a real person: scroll for a minute, open an item, press back. Most implementations return you to the top of page one with everything refetched. Fixing that properly forces a cursor, a cache that survives navigation, and a media box that reserves its height — which is the same fix as not scoring badly on layout shift.',
  tags: ['React', 'Pagination', 'IntersectionObserver', 'CLS', 'Machine coding'],
  xpBounty: 280,
  prerequisites: ['basic-fetch-list'],
  coreScopeBoundaries: {
    inScopeMinimal: [
      'Cursor-based pagination, with the reason offset paging breaks on a live feed stated.',
      'An IntersectionObserver sentinel that cannot fire two requests for the same page.',
      'Every card reserves its media box before the image loads.',
      'Scroll position and loaded pages survive navigating to an item and back.',
      'A skeleton whose height matches the real card, not a generic grey bar.',
      'An end-of-feed state, an error state with retry, and an empty state.',
      'The list is reachable and announced when new items arrive.',
      'A measured layout-shift score before and after the reservation fix.',
    ],
    outOfScopeBloat: [
      'Full windowing — the whole point is that pagination alone should hold up to a few hundred rows.',
      'Real-time insertion at the top of the feed.',
      'Comments, likes, or any second entity.',
      'A backend. A mock cursor API is enough and fails more interestingly.',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'The feed that pages',
      focus: 'Cursor pagination and a sentinel that fires once',
      codeSnippet: `const io = new IntersectionObserver(([entry]) => {\n  // Without the guard this fires while the request is still in flight,\n  // and page 2 is requested three times before it arrives.\n  if (entry.isIntersecting && !loadingRef.current && cursorRef.current) load();\n}, { rootMargin: '400px' });`,
      failureModeOrInvariant:
        'Offset paging on a feed that receives new items duplicates and skips rows: everything shifts by one between requests. An unguarded sentinel fires on every intersection tick, so a slow page-two request becomes three identical requests and three appends.',
      architecturalLesson:
        'A cursor names a position in the data; an offset names a position in a list that is still moving. Guarded loading is state, not a flag you can keep in a closure.',
    },
    {
      stageNumber: 2,
      stageName: 'The feed that holds still',
      focus: 'Reserved media boxes and honest skeletons',
      codeSnippet: `/* The box exists before the bytes do. */\n.card__media { aspect-ratio: 16 / 9; inline-size: 100%; }\n.card__media img { inline-size: 100%; block-size: 100%; object-fit: cover; }\n\n/* A skeleton that is not the card's height is a layout shift you scheduled. */\n.card--skeleton { min-block-size: var(--card-height); }`,
      failureModeOrInvariant:
        'An image with no reserved box lays out at zero height, then jumps to its natural size when it decodes — pushing everything the user was reading down the page. This is most of a bad Cumulative Layout Shift score, and it is worst on the slow connections where it is least forgivable.',
      architecturalLesson:
        'Reserve space from the ratio, not from a guess. Every unreserved async box is a layout shift with a delay fuse.',
    },
    {
      stageNumber: 3,
      stageName: 'The back button that works',
      focus: 'Cache, scroll restoration and the states at the end',
      codeSnippet: `// Restoring means the pages are still there — refetching is not restoring.\nuseLayoutEffect(() => {\n  const y = sessionStorage.getItem(\`feed:\${key}\`);\n  if (y) window.scrollTo(0, Number(y));\n}, []);\n\nuseEffect(() => () => sessionStorage.setItem(\`feed:\${key}\`, String(window.scrollY)), [key]);`,
      failureModeOrInvariant:
        'Restoring scroll in useEffect runs after paint, so the user sees the top of the feed for a frame before it jumps. Restoring before the cached pages have rendered scrolls to a position that does not exist yet, and the browser clamps it to the bottom of a short list.',
      architecturalLesson:
        'Restoration is ordering: content first, then position, before paint. That is what useLayoutEffect is for, and one of the few times it is correct.',
    },
  ],
  deliverables: [
    { id: 'Feed list', title: 'Paged list', spec: 'Cursor-paged list that appends without duplicating, with the guard that makes a second concurrent page request impossible.' },
    { id: 'Sentinel', title: 'Observer sentinel', spec: 'An IntersectionObserver with a stated rootMargin, disconnected on unmount, that cannot fire while a request is in flight.' },
    { id: 'Page cache', title: 'Navigation-surviving cache', spec: 'Loaded pages and the cursor persist across navigation so returning to the feed renders from memory rather than refetching.' },
    { id: 'Media card', title: 'Reserved media box', spec: 'Every card reserves its image area from an aspect ratio before load, with a measured layout-shift score committed before and after.' },
    { id: 'Skeletons', title: 'Height-matched skeletons', spec: 'Placeholder cards match the real card height exactly, so the transition from skeleton to content shifts nothing.' },
    { id: 'Scroll restore', title: 'Scroll restoration', spec: 'Position is saved on unmount and restored before paint once cached pages have rendered, verified by navigating away and back.' },
    { id: 'Token theme', title: 'Token-driven styling', spec: 'Card spacing, radius and colour come from custom properties on one layer with no literal values in component styles.' },
    { id: 'Test suite', title: 'Behavioural tests', spec: 'Tests prove a page is never requested twice, the end state renders once the cursor is null, and retry recovers from an error.' },
  ],
  layers: [
    { layer: 'Data', components: ['cursor pager', 'page cache', 'retry'], invariants: ['A page is requested at most once per cursor value.'] },
    { layer: 'Viewport', components: ['sentinel', 'scroll restore', 'end marker'], invariants: ['Restoration happens before paint, after cached content renders.'] },
    { layer: 'Card', components: ['media box', 'skeleton', 'meta row'], invariants: ['Nothing that loads asynchronously renders without its space reserved.'] },
  ],
  explicitTopics: [
    { category: 'JavaScript', topic: 'DOM APIs', subtopic: 'IntersectionObserver and teardown', howCovered: 'The sentinel is an observer with a stated rootMargin, disconnected on unmount and guarded against re-entry.', conceptIds: ['js-dom-events'] },
    { category: 'React', topic: 'Effects', subtopic: 'Layout effects and ordering', howCovered: 'Scroll restoration runs in useLayoutEffect because after-paint is a visible jump.', conceptIds: ['react-effects'] },
    { category: 'React', topic: 'State', subtopic: 'In-flight as state, not a closure flag', howCovered: 'The loading guard lives in a ref read by the observer callback, and the reason a state variable fails there is stated.', conceptIds: ['react-state', 'react-hooks-rest', 'rd-react-hooks'] },
    { category: 'JavaScript', topic: 'Async', subtopic: 'Sequencing appends', howCovered: 'Pages must append in request order, so a late page two cannot land after page three.', conceptIds: ['js-promises', 'js-event-loop'] },
    { category: 'Web', topic: 'HTTP', subtopic: 'Cursor pagination and caching headers', howCovered: 'Cursors are compared with offset paging on a moving feed, with the duplicate-and-skip failure demonstrated.', conceptIds: ['web-http'] },
    { category: 'State', topic: 'Caching', subtopic: 'Surviving navigation', howCovered: 'Returning to the feed renders from cache; refetching is shown not to be restoration.', conceptIds: ['state-alternatives', 'rd-react-data-fetching'] },
    { category: 'Routing', topic: 'Navigation', subtopic: 'Back, restoration, and keys', howCovered: 'Opening an item and pressing back is the acceptance test for the whole build.', conceptIds: ['router-core'] },
    { category: 'CSS', topic: 'Intrinsic sizing', subtopic: 'aspect-ratio and logical properties', howCovered: 'Media boxes reserve space from a ratio, which is the fix for most of the layout-shift score.', conceptIds: ['css-ratio-logical'] },
    { category: 'Performance', topic: 'Layout shift', subtopic: 'CLS measured, not asserted', howCovered: 'The score is recorded before and after the reservation fix and committed to the repository.', conceptIds: ['rd-perf-web-vitals', 'rd-perf-rendering-media'] },
    { category: 'React', topic: 'Rendering', subtopic: 'Keys across appends', howCovered: 'Stable ids keep already-rendered cards mounted when a page appends, so images do not re-decode.', conceptIds: ['react-rendering-model', 'react-perf'] },
    { category: 'CSS', topic: 'Containment', subtopic: 'Scroll and paint boundaries', howCovered: 'The list owns its containment so offscreen cards cost less paint as the feed grows.', conceptIds: ['css-box-display'] },
    { category: 'JavaScript', topic: 'Data', subtopic: 'Appending without mutating', howCovered: 'New pages concatenate into a new array, so a cached page is never edited in place.', conceptIds: ['js-arrays-objects'] },
    { category: 'TypeScript', topic: 'Modelling', subtopic: 'A union for feed state', howCovered: 'Idle, loading, error, end-of-feed and populated are one union, so an end marker cannot render beside a spinner.', conceptIds: ['ts-essentials'] },
    { category: 'HTML', topic: 'Semantics', subtopic: 'A feed is a list', howCovered: 'Cards are list items inside a labelled region, so the structure survives without CSS.', conceptIds: ['html-semantics'] },
    { category: 'Accessibility', topic: 'Announcements', subtopic: 'New items and the end of the feed', howCovered: 'Arrival of a page is announced politely, and the end state is reachable without scrolling by mouse.', conceptIds: ['a11y-core'] },
    { category: 'Testing', topic: 'Behavioural tests', subtopic: 'The guarantees, not the calls', howCovered: 'A test proves the same cursor is never requested twice even when the sentinel fires repeatedly.', conceptIds: ['testing-react', 'rd-react-testing'] },
  ],
  implicitFoundations: [
    { domain: 'Language Semantics', title: 'Each page owns its request', mechanism: 'Every load closes over its own cursor and abort handle.', realWorldImpact: 'A stale closure appends page two twice under the wrong cursor.', conceptIds: ['js-scope-closures', 'js-types-coercion', 'js-defaulting-operators'] },
    { domain: 'Language Semantics', title: 'Cached pages are read-only', mechanism: 'Appends build new arrays rather than pushing into the cached one.', realWorldImpact: 'Mutating the cache makes the restored feed differ from the one the user left.', conceptIds: ['react-immutability', 'react-references-copying'] },
    { domain: 'Security & Invariants', title: 'Feed content is untrusted', mechanism: 'Card text and image URLs are treated as hostile, with a scheme allowlist on media.', realWorldImpact: 'A javascript: image source is a live vulnerability in a user-generated feed.', conceptIds: ['web-security'] },
    { domain: 'V8 Engine & Memory', title: 'Position outlives the component', mechanism: 'Scroll offset and cursor persist to sessionStorage keyed by feed.', realWorldImpact: 'A reload mid-scroll otherwise sends the reader back to the top.', conceptIds: ['web-storage'] },
    { domain: 'DOM & Browser Pipeline', title: 'The card is a flex line', mechanism: 'Avatar, text column and trailing timestamp lay out on one axis.', realWorldImpact: 'A long display name must not push the timestamp off the card.', conceptIds: ['css-flex-axes', 'css-flex-sizing', 'css-flex-align'] },
    { domain: 'DOM & Browser Pipeline', title: 'The feed column is a grid', mechanism: 'The page is a centred grid track with a max measure for readability.', realWorldImpact: 'A full-width feed on a desktop monitor is unreadable.', conceptIds: ['css-grid-tracks', 'css-grid-placement', 'css-grid-align'] },
    { domain: 'DOM & Browser Pipeline', title: 'Sticky chrome and overlays', mechanism: 'The feed header sticks and the retry toast anchors above the list.', realWorldImpact: 'A sticky element inside a containing block behaves differently than authors expect.', conceptIds: ['css-positioning', 'css-states'] },
    { domain: 'Tooling & Build', title: 'One definition per token', mechanism: 'Card spacing, radius and colour are custom properties in a layer.', realWorldImpact: 'Skeleton and card share exact heights because both read the same token.', conceptIds: ['css-tokens-modern', 'css-cascade', 'css-selectors', 'css-units', 'css-media-container', 'rd-fe-modern-css'] },
    { domain: 'Language Semantics', title: 'Throttling the scroll write', mechanism: 'Persisting the scroll offset is throttled rather than written per scroll event.', realWorldImpact: 'An unthrottled write on scroll is a guaranteed jank source.', conceptIds: ['js-polyfills'] },
  ],
  frameworkVsManual: {
    frameworkHandled: ['Nothing required. A query library may be introduced in stage 3, but only after the cache is hand-built once.'],
    manualEngineeringRequired: [
      'The re-entry guard that makes a duplicate page request impossible.',
      'The reservation strategy for every asynchronously sized box.',
      'The restoration ordering: cached content, then position, before paint.',
    ],
  },
};
