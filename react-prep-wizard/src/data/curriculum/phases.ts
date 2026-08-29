import type { CurriculumPhase } from './types';

/**
 * Five phases, ordered by which hiring lane each one opens.
 *
 * Comp bands and loop shapes describe the Indian React market at 3 YOE as of
 * 2026, including remote-from-India contracts. They are ranges observed across
 * lanes, not quotes — treat them as calibration for effort, never as a promise.
 */
export const CURRICULUM_PHASES: CurriculumPhase[] = [
  {
    id: 'p0-engine',
    order: 0,
    name: 'Engine Lock',
    promise: 'The JavaScript runtime and React render cycle stop being magic you memorised.',
    youAreHereWhen:
      'You can use hooks and closures correctly but cannot yet derive, from first principles, why a given snippet logs in that order.',
    unlocks: [],
    draws: {
      masteryTrackIds: ['js_core', 'js_traps', 'react_core'],
      learnAreas: ['JavaScript', 'React Core'],
      projectIds: ['basic-equality-lab', 'basic-react-first'],
    },
    gates: [
      {
        id: 'g0-event-loop',
        claim: 'Predict the output of a mixed sync / micro / macro task snippet without running it.',
        proof: 'Three unseen snippets, written order stated aloud before execution, all three correct.',
      },
      {
        id: 'g0-closure',
        claim: 'Explain a stale closure in a React event handler and fix it two different ways.',
        proof: 'Unit js-closures-stale-state and react-stale-closure-event solved unassisted.',
      },
    ],
    estimatedHours: 25,
  },

  {
    id: 'p1-service-loop',
    order: 1,
    name: 'Service Loop Ready',
    promise: 'You can clear a mass-hiring pipeline: timed MCQ screen, one or two technical rounds, managerial.',
    youAreHereWhen: 'Fundamentals are solid but you have never sat a timed 36-question screen.',
    unlocks: [
      {
        band: 'Software Engineer / Senior Software Engineer / Application Development Analyst',
        employers: ['Accenture', 'Infosys', 'Wipro', 'Cognizant', 'Capgemini', 'LTIMindtree', 'Persistent', 'KPIT', 'Tech Mahindra'],
        loop: [
          'Aptitude + technical MCQ screen (Mettl / HackerRank / AMCAT), typically 36q in 50min',
          'Technical round 1 — React fundamentals, JS output questions, one easy DSA',
          'Technical round 2 — project deep dive, Redux, occasionally a small component',
          'Managerial / HR — stability, relocation, notice period',
        ],
        compLpa: [8, 16],
        realism:
          'The screen is the real filter and it rewards breadth over depth. Class lifecycle, Redux boilerplate and Webpack still appear even though nobody writes them any more.',
      },
    ],
    draws: {
      // css_layouts lives here, but it is 178 units — roughly four times what any
      // service or product loop asks. Treat it as a reference shelf to dip into,
      // never as a queue to finish.
      masteryTrackIds: ['react_ecosystem', 'behavioural', 'css_layouts'],
      masteryUnitIds: ['build-counter', 'build-todo', 'build-search', 'build-pagination'],
      learnAreas: ['State Management', 'Routing', 'Tooling'],
      projectIds: ['basic-controlled-form', 'basic-fetch-list', 'basic-routed-app', 'basic-class-museum', 'inter-flux-to-rtk'],
    },
    gates: [
      {
        id: 'g1-oa',
        claim: 'Score 75%+ on a timed 36-question / 50-minute mixed screen.',
        proof: 'Two consecutive mock papers at or above threshold, full 50-minute clock, no lookups.',
      },
      {
        id: 'g1-stories',
        claim: 'Five STAR stories ready: conflict, failure, ownership, ambiguity, influence.',
        proof: 'Each told in under two minutes with a number in it.',
      },
    ],
    estimatedHours: 40,
    skipIf: 'You already hold a service-company offer and are only targeting product or remote roles.',
  },

  {
    id: 'p2-machine-coding',
    order: 2,
    name: 'Machine Coding Loop',
    promise: 'You can build a correct, keyboard-accessible, network-aware component under a 60–90 minute clock.',
    youAreHereWhen: 'You can build these components given a day, but not under a timer with someone watching.',
    unlocks: [
      {
        band: 'SDE-1 / SDE-2 / Frontend Engineer',
        employers: ['Groww', 'Meesho', 'Swiggy', 'Razorpay', 'Zeta', 'CRED', 'Postman', 'BrowserStack', 'Freshworks', 'PhonePe', 'Zomato', 'Urban Company'],
        loop: [
          'DSA screen — arrays, strings, hashmaps, easy to medium',
          'Machine coding — 60 to 90 minutes, build a working component live',
          'Codebase / project deep dive',
          'Hiring manager',
        ],
        compLpa: [18, 35],
        realism:
          'Machine coding is the round people fail. It is judged on a working happy path first, then edge cases, then structure — in that order. Elegant but unfinished loses to plain but complete.',
      },
    ],
    draws: {
      masteryTrackIds: ['js_practical', 'react_practical', 'async_apis'],
      learnAreas: ['React Advanced', 'Data & APIs'],
      projectIds: ['service-typeahead', 'service-infinite-feed', 'service-kanban', 'service-form-wizard', 'service-data-grid', 'inter-utility-belt'],
    },
    gates: [
      {
        id: 'g2-typeahead',
        claim: 'Build an autocomplete with debounce, request cancellation, keyboard navigation and an empty state in 60 minutes.',
        proof: 'Timed, from a blank file, no reference material open.',
      },
      {
        id: 'g2-polyfills',
        claim: 'Write map, filter, reduce, bind, call, apply, Promise.all and debounce from memory.',
        proof: 'Under 10 minutes total, passing their own assertions.',
      },
    ],
    estimatedHours: 60,
  },

  {
    id: 'p3-system-design',
    order: 3,
    name: 'Frontend System Design Loop',
    promise: 'You can answer "design X" with transport, caching and failure-mode tradeoffs instead of library names.',
    youAreHereWhen: 'You can build a feature but cannot yet defend why it polls rather than subscribes.',
    unlocks: [
      {
        band: 'SDE-2 / Senior Frontend Engineer',
        employers: ['Atlassian', 'Uber', 'Adobe', 'Salesforce', 'Microsoft India', 'Flipkart', 'Sprinklr', 'Media.net', 'Hasura', 'Sprig'],
        loop: [
          'DSA — medium',
          'Machine coding — harder variant, edge cases explicitly probed',
          'Frontend system design — 45 to 60 minutes, whiteboard or doc',
          'Hiring manager / bar raiser',
        ],
        compLpa: [30, 60],
        realism:
          'At 3 YOE the design round is scored on whether you name tradeoffs and failure modes, not on whether you reach the "right" architecture. Saying "long polling, because the update rate is low and it survives corporate proxies" beats naming five technologies.',
      },
    ],
    draws: {
      learnAreas: ['Web Platform', 'Performance', 'Architecture'],
      projectIds: ['service-live-ops', 'inter-designed-dashboard', 'project-pulseui', 'project-chronosgraph', 'inter-perf-audit'],
    },
    gates: [
      {
        id: 'g3-feed',
        claim: 'Design a news feed end to end in 45 minutes: transport, pagination, caching, virtualization, optimistic writes, offline.',
        proof: 'Spoken aloud and recorded, with at least three tradeoffs named and one failure mode per choice.',
      },
      {
        id: 'g3-transport',
        claim: 'Choose between short polling, long polling, SSE, WebSocket and webhooks for a stated workload, and say what breaks.',
        proof: 'Five scenarios, correct choice plus the failure mode of the rejected options.',
      },
    ],
    estimatedHours: 70,
  },

  {
    id: 'p4-craft-trust',
    order: 4,
    name: 'Craft & Trust Loop',
    promise: 'Your work survives evaluation when you are not in the room to explain it.',
    youAreHereWhen: 'You interview well in person but your take-homes and repos do not stand on their own.',
    unlocks: [
      {
        band: 'Senior Frontend Engineer (remote) / Contractor',
        employers: ['US and EU startups hiring directly from India', 'Toptal-tier marketplaces', 'Turing', 'GitLab-style all-remote companies'],
        loop: [
          'Written application and repository review',
          'Asynchronous take-home, judged on tests, types and the README as much as the feature',
          'Live pairing or architecture discussion',
          'Culture / communication',
        ],
        compLpa: [40, 90],
        realism:
          'Selection is heavily on written communication and evidence. There is often no DSA at all. The bar that fails people is a take-home with no tests, no types and no design note.',
      },
    ],
    draws: {
      learnAreas: ['Security', 'Testing', 'Accessibility', 'Observability', 'TypeScript'],
      projectIds: ['product-embed-guard', 'inter-tested-library', 'product-relay', 'adv-react-from-scratch'],
    },
    gates: [
      {
        id: 'g4-repo',
        claim: 'Ship one public repository with tests, types, CI, an accessibility pass and a written design note.',
        proof: 'A stranger can clone it, run it, and understand the tradeoffs without asking you anything.',
      },
      {
        id: 'g4-security',
        claim: 'Name the attack each security header prevents, and sanitize untrusted HTML correctly.',
        proof: 'Explain XSS, CSRF, CORS, SSRF and clickjacking with a concrete exploit and its fix.',
      },
    ],
    estimatedHours: 55,
  },
];

export const PHASE_BY_ID = new Map(CURRICULUM_PHASES.map((p) => [p.id, p]));
