import type { MasteryUnit } from '../masteryStream';

export const star = (question: string, situation: string, task: string, action: string, result: string) =>
  `/* ${question}\n   Write it out, then record yourself saying it in 60 seconds.\n   Aim for 4–6 sentences. Specifics beat adjectives every time. */\n\nSITUATION — ${situation}\n  →\n\nTASK — ${task}\n  →\n\nACTION — ${action}\n  →\n\nRESULT — ${result}\n  →\n`;

export const behaviouralStarUnits: MasteryUnit[] = [
  {
    id: 'hr-pitch',
    trackId: 'behavioural',
    trackName: 'Behavioural & HR',
    category: 'The Opening',
    title: 'Tell me about yourself — the 30-second version',
    level: 'Warm-up',
    xp: 40,
    theory: {
      hook: 'The first question is not a biography request. It is a positioning question, and the answer sets the frame for every question after it.',
      deepDive:
        'A strong answer is three beats and under 45 seconds. (1) Where you are now, in one line — role, stack, scale. (2) The one thing that makes you unusual, stated as a capability rather than a claim. (3) Why this role, connected to something specific about the team or the work. Then stop.',
      interviewPitch:
        '"I build front-end systems in React — most recently a spec-first workflow where the tooling grades the work rather than the developer marking their own homework. What I bring beyond the stack is that I design the process around the failure mode, not just the feature."',
    },
    why: 'It is asked in every round, by every interviewer, and it is the only answer you can prepare word-for-word without it sounding rehearsed.',
    verify: 'Record it. If it runs past 45 seconds, or if you cannot say it without reading, it is not ready.',
    hints: [
      'Three beats: where you are now · what makes you unusual · why this role. Nothing else.',
      'Replace every adjective with a fact. Not "passionate about performance" — "cut a 2.4s LCP to 900ms".',
      'End on the role, not on yourself. The last sentence should point at them.',
    ],
    practice: {
      type: 'js_snippet',
      task: 'Draft your opening pitch in the editor. Then record yourself delivering it in under 45 seconds.',
      starterCode: `/* Tell me about yourself — 30 to 45 seconds.\n   Three beats. No chronology. End on why this team. */\n\n1. CURRENT ROLE & SCALE\n   →\n\n2. THE UNUSUAL CAPABILITY (one concrete thing you do that others do not)\n   →\n\n3. WHY THIS ROLE (connected to something specific about them)\n   →\n`,
      solutionCode: '',
      specs: [
        'Under 45 seconds spoken',
        'No college-to-present chronology',
        'Contains at least one concrete number (scale, users, time, latency)',
        'Ends on why this company, not on a generic goal',
      ],
    },
  },
  {
    id: 'hr-conflict',
    trackId: 'behavioural',
    trackName: 'Behavioural & HR',
    category: 'STAR Stories',
    title: 'A time you disagreed with a technical decision',
    level: 'Core',
    xp: 50,
    theory: {
      hook: 'They are not asking whether you were right. They are asking whether you can disagree without creating wreckage, and whether you can execute a decision you lost.',
      deepDive:
        'The shape: you had a different view on an architectural or process choice · you grounded your argument in data/constraints rather than taste · you stated your case clearly · a decision was made · you committed fully either way. If you won, the victory was quiet; if you lost, you did not drag your feet.',
      interviewPitch:
        '"We were choosing between writing a custom virtualised list and using an off-the-shelf library for a 10k-item view. I advocated the library because our edge cases were standard. The lead wanted custom to avoid bundle weight. I ran a spike, measured the bundle delta at 8kB, and we went with the library. If we had stayed with custom, I would have owned the tests."',
    },
    why: 'Seniority is mostly how you handle disagreement. A junior engineer treats it as a fight to win; a senior engineer treats it as a search for the cheapest correct answer.',
    hints: [
      'The disagreement must be technical or process, never interpersonal.',
      'Show the evidence you brought, not just the opinion you held.',
      'The ending must show commitment, whether your view was taken or not.',
    ],
    practice: {
      type: 'js_snippet',
      task: 'Write your STAR answer for a technical disagreement. Then record the 60-second version.',
      starterCode: star(
        'A time you disagreed with a technical decision.',
        'What was the decision, and who was involved?',
        'What was your proposal, and why did you believe it was better?',
        'How did you make the case — what evidence or spike did you bring?',
        'What was decided, and how did you execute after the decision was made?',
      ),
      solutionCode: '',
      specs: [
        'Situation is technical, not personal',
        'The disagreement was resolved with evidence, not authority',
        'Result shows full commitment to the outcome',
        'Under 60 seconds spoken',
      ],
    },
  },
  {
    id: 'hr-failure',
    trackId: 'behavioural',
    trackName: 'Behavioural & HR',
    category: 'STAR Stories',
    title: 'A time you caused or handled a production outage',
    level: 'Core',
    xp: 50,
    theory: {
      hook: 'A candidate who has never broken production has either never shipped anything or does not know when they broke it.',
      deepDive:
        'The answer that loses the interview is the fake failure: "I worked too hard" or "a third-party API went down". A real failure has a real blast radius, your own contribution acknowledged without hiding behind the team, and a permanent change made to the system so the same mistake is impossible.',
      interviewPitch:
        '"I pushed an un-memoized selector into a shared hook that caused a re-render cascade on every keypress in our main form. We caught it in staging telemetry before deploy. The fix was two lines; the real work was adding an ESLint rule so the pattern fails in CI for anyone else."',
    },
    why: 'Interviewers look for psychological safety and systemic thinking. Hiding a failure signals risk; explaining what you fixed in the system signals reliability.',
    hints: [
      'Pick a real mistake, not a humblebrag.',
      'Spend 20% on the mistake, 80% on the response and the systemic fix.',
      'The fix must be a mechanism (linter, test, alert, runbook), not "I was more careful".',
    ],
    practice: {
      type: 'js_snippet',
      task: 'Write your outage/failure STAR story. Then record the 60-second version.',
      starterCode: star(
        'A time you made a mistake that affected production or the team.',
        'What was the context, and what actually broke?',
        'What were you accountable for?',
        'What did you do once you knew — including telling people?',
        'What mechanism changed so it cannot happen the same way again?',
      ),
      solutionCode: '',
      specs: [
        'A real cost is named',
        'Your own share is owned without blaming others',
        'Most of the answer is the fix, not the failure',
        'The fix is systemic — a check, a test, a process — not "I was more careful"',
      ],
    },
  },
];
