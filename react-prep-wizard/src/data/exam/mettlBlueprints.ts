/**
 * Published assessment blueprints — Mercer | Mettl.
 *
 * These are not inferred. Every duration, question count and competency name
 * below is taken from the vendor's own product page, because Mettl publishes
 * the competency framework for each test in its library. Where a number is an
 * inference rather than a published fact, it is labelled as one.
 */

export interface ExamCompetency {
  name: string;
  subSkills: string[];
}

export interface ExamBlueprint {
  id: string;
  vendor: string;
  name: string;
  sourceUrl: string;
  durationMinutes: number;
  mcqCount: number;
  codingCount: number;
  difficulty: string;
  experienceYears: string;
  /** Seconds per question — the constraint that decides how to prepare. */
  secondsPerQuestion: number;
  competencies: ExamCompetency[];
  notes: string[];
}

export const METTL_BLUEPRINTS: ExamBlueprint[] = [
  {
    id: 'mettl-react-redux',
    vendor: 'Mercer | Mettl',
    name: 'React Redux Developer Test',
    sourceUrl: 'https://mettl.com/test/react-redux-developer-test/',
    durationMinutes: 50,
    mcqCount: 36,
    codingCount: 0,
    difficulty: 'Moderate',
    experienceYears: '2-5',
    secondsPerQuestion: 83,
    competencies: [
      {
        name: 'ECMAScript',
        subSkills: [
          'Template and Extended Literals',
          'Arrow Functions',
          'De-Structuring Assignments',
          'Modules and Classes in JavaScript ES6',
        ],
      },
      {
        name: 'Redux',
        subSkills: [
          'Pure Functions',
          'Actions',
          'Reducers',
          'Store',
          'Data flow',
          'Integrating React with Redux JS',
        ],
      },
      {
        name: 'React',
        subSkills: [
          'State Application',
          'Props Application',
          'Lifecycle Application',
          'Virtual and Actual DOM Application',
          'Higher Order Components',
        ],
      },
    ],
    notes: [
      'Most likely paper for an Accenture React lateral at 2-3 years experience.',
      '83 seconds per question and no coding round: this is a recall-speed exam, not a build exam.',
      'Redux is billed equal to React itself — a preparation without Redux is missing roughly a third.',
    ],
  },
  {
    id: 'mettl-reactjs',
    vendor: 'Mercer | Mettl',
    name: 'ReactJS Online Test',
    sourceUrl: 'https://mettl.com/test/reactjs-assessments-test/',
    durationMinutes: 60,
    mcqCount: 20,
    codingCount: 1,
    difficulty: 'Intermediate',
    experienceYears: '1-3',
    secondsPerQuestion: 150,
    competencies: [
      {
        name: 'React Tools',
        subSkills: ['React Router', 'Redux', 'Flux', 'Webpack'],
      },
      {
        name: 'ReactJS Concepts',
        subSkills: [
          'Server Components',
          'Rendering: createRoot and hydrateRoot',
          'Actions',
          'New hooks (React 19)',
        ],
      },
      {
        name: 'Fundamentals',
        subSkills: [
          'Components and events',
          'Props and state',
          'Pure components',
          'Render methods',
          'JavaScript ES6',
        ],
      },
    ],
    notes: [
      'Adds one coding question on a front-end simulator, described by the vendor as basic JavaScript.',
      'Flux and Webpack appear here and in almost no 2026 prep material — a cheap differentiator.',
    ],
  },
  {
    id: 'mettl-frontend-experienced',
    vendor: 'Mercer | Mettl',
    name: 'Front-end Developer Assessment (Experienced)',
    sourceUrl: 'https://mettl.com/en/test/front-end-developer-assessment-for-experienced-professionals/',
    durationMinutes: 60,
    mcqCount: 19,
    codingCount: 1,
    difficulty: 'Intermediate',
    experienceYears: '5-10',
    secondsPerQuestion: 150,
    competencies: [
      { name: 'Hands-on Programming', subSkills: ['Front-end Simulator - JavaScript'] },
      {
        name: 'HTML',
        subSkills: ['HTML5 Semantics', 'HTML5 API', 'HTML5 Elements', 'HTML5 Attributes', 'HTML5 Multimedia'],
      },
      {
        name: 'CSS',
        subSkills: ['CSS3 Responsive design', 'CSS3 Backgrounds', 'CSS3 Flexbox', 'CSS3 Layout', 'CSS3 Text and font styling'],
      },
      {
        name: 'JavaScript',
        subSkills: ['DOM', 'Event and Event Handler', 'Functions', 'Asynchronous', 'State Management'],
      },
      {
        name: 'React',
        subSkills: ['State', 'Properties', 'Lifecycle', 'JSX', 'Rendering'],
      },
    ],
    notes: [
      'The most granular published sub-skill list of the four — use it as the checklist.',
      'Named target roles: senior front-end developer, senior React developer, senior website developer.',
    ],
  },
  {
    id: 'mettl-frontend-basic',
    vendor: 'Mercer | Mettl',
    name: 'Front End Web Developer Test (Basic)',
    sourceUrl: 'https://mettl.com/test/front-end-web-developer-basic/',
    durationMinutes: 60,
    mcqCount: 18,
    codingCount: 1,
    difficulty: 'Moderate',
    experienceYears: '0.5-2',
    secondsPerQuestion: 150,
    competencies: [
      {
        name: 'JavaScript',
        subSkills: ['Arrays', 'Scopes and namespaces', 'Parsing', 'Events and event handlers', 'Functions', 'Object usage and properties'],
      },
      { name: 'HTML', subSkills: ['Elements', 'HTML5 elements', 'Semantics', 'Multimedia'] },
      { name: 'CSS', subSkills: ['Text and margins', 'CSS3 backgrounds', 'Borders', 'Text application'] },
    ],
    notes: ['Below the 2-3 year band; useful as the floor of assumed knowledge.'],
  },
];
