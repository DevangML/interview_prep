import type { MasteryUnit } from '../masteryStream';

/**
 * The behavioural round — the one part of the pipeline the app had nothing for,
 * despite the curriculum listing it as a parallel track and the Accenture
 * process putting a human interview after the OA.
 *
 * These units deliberately contain **no stories**. Nobody can write your STAR
 * answers but you: an invented "time I resolved a conflict" is worse than
 * nothing, because you will hear yourself lying in the room. What they contain
 * is the *scaffold* — the question as it is actually asked, the shape of a
 * strong answer, and the traps — with the editor as the writing pad and the
 * Spoken Defense recorder as the rehearsal.
 *
 * The practice type is `js_snippet` so the unit reuses the existing editor and
 * recorder; nothing here is executed.
 */

const star = (question: string, situation: string, task: string, action: string, result: string) =>
  `/* ${question}
   Write it out, then record yourself saying it in 60 seconds.
   Aim for 4–6 sentences. Specifics beat adjectives every time. */

SITUATION — ${situation}
  →

TASK — ${task}
  →

ACTION — ${action}
  →

RESULT — ${result}
  →
`;

export const behaviouralUnits: MasteryUnit[] = [
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
        'A strong answer is three beats and under 45 seconds. (1) Where you are now, in one line — role, stack, scale. (2) The one thing that makes you unusual, stated as a capability rather than a claim. (3) Why this role, connected to something specific about the team or the work. Then stop. Silence after a tight answer reads as confidence; filling it reads as nerves.\n\nThe most common failure is chronological drift — starting at college and narrating forward until the interviewer interrupts. The second most common is listing technologies with no verb attached: "React, Redux, Node" tells them nothing about what you did with any of it.',
      interviewPitch:
        '"I build front-end systems in React — most recently a spec-first workflow where the tooling grades the work rather than the developer marking their own homework. What I bring beyond the stack is that I design the process around the failure mode, not just the feature. That is what drew me here: the work is at a scale where process quality compounds."',
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
      task: 'Draft your 30-second pitch, then record it. Three beats, under 45 seconds.',
      starterCode: `/* Tell me about yourself.
   Three beats. Under 45 seconds. Then record it. */

NOW — role, stack, scale, in one line
  →

UNUSUAL — the capability that is not on everyone's CV
  →

WHY THIS ROLE — something specific about the team or the work
  →
`,
      solutionCode: '',
      specs: [
        'Runs under 45 seconds out loud',
        'Contains at least one number',
        'Ends pointing at the role, not at yourself',
        'Can be delivered without reading it',
      ],
    },
  },
  {
    id: 'hr-conflict',
    trackId: 'behavioural',
    trackName: 'Behavioural & HR',
    category: 'Working with People',
    title: 'Tell me about a disagreement with a teammate',
    level: 'Core',
    xp: 40,
    theory: {
      hook: 'They are not testing whether you were right. They are testing whether you can disagree without making it expensive for the team.',
      deepDive:
        'A strong answer names the disagreement precisely, shows you sought the other position before defending yours, and ends with a decision the team could live with — ideally one where you were overruled and executed well anyway. That last variant scores higher than winning, because it proves you are safe to disagree with.\n\nTraps: choosing a conflict where the other person is a villain; choosing one so trivial it reveals nothing; and ending on "we agreed to disagree", which is not a resolution.',
      interviewPitch:
        '"Name the technical substance of the disagreement, show you understood their case, then say what decided it — data, a spike, or a call by someone accountable. If you lost, say so, and say what you did next."',
    },
    why: 'Almost guaranteed in an Accenture HR round, and the most common place candidates accidentally describe themselves as difficult.',
    hints: [
      'Pick a disagreement about a decision, not about a person.',
      'Spend a full sentence on their argument, fairly stated. That sentence is what is actually being scored.',
      'A story where you were overruled and delivered anyway is stronger than one where you won.',
    ],
    practice: {
      type: 'js_snippet',
      task: 'Write one STAR story about a technical disagreement. Record it in 60 seconds.',
      starterCode: star(
        'Tell me about a disagreement with a teammate.',
        'What was being decided, and who was involved?',
        'What was your responsibility in it?',
        'How did you surface your position, and how did you take in theirs?',
        'What was decided, what happened after, and what would you do differently?',
      ),
      solutionCode: '',
      specs: [
        'The disagreement is about a decision, not a personality',
        'Their position is stated fairly, in their terms',
        'A concrete resolution mechanism is named',
        'Ends with what changed in how you work',
      ],
    },
  },
  {
    id: 'hr-failure',
    trackId: 'behavioural',
    trackName: 'Behavioural & HR',
    category: 'Ownership',
    title: 'Tell me about something that went wrong',
    level: 'Core',
    xp: 40,
    theory: {
      hook: 'The disguised-strength answer ("I care too much about quality") fails instantly. They have heard it, and it tells them you will not report a problem early.',
      deepDive:
        'Pick a real failure with a real cost, own your share without theatrical self-flagellation, and spend most of the answer on the mechanism you changed so it cannot recur. The ratio matters: roughly a quarter on what happened, three quarters on what you changed. A failure with no systemic fix is just a confession.',
      interviewPitch:
        '"State the failure and its cost in one sentence. Own your part in one more. Then spend the rest on the check, test, process or alert that now makes it impossible — that is the part they are hiring."',
    },
    why: 'This is the answer that separates people who improve systems from people who apologise.',
    hints: [
      'Real cost, honestly stated: time lost, a release pulled, a customer affected.',
      'No shared blame in the ACTION section — that is where you talk only about yourself.',
      'The RESULT is the mechanism, not the apology.',
    ],
    practice: {
      type: 'js_snippet',
      task: 'Write one STAR story about a genuine failure and the mechanism you changed. Record it.',
      starterCode: star(
        'Tell me about a time something went wrong.',
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
  {
    id: 'hr-project',
    trackId: 'behavioural',
    trackName: 'Behavioural & HR',
    category: 'Depth',
    title: 'Walk me through a project you are proud of',
    level: 'Core',
    xp: 40,
    theory: {
      hook: 'This is a technical question wearing behavioural clothes. They are looking for the decisions, the constraints and the trade-offs — not the feature list.',
      deepDive:
        'Structure it as: the problem and who had it · the constraint that made it hard · two decisions you made and what you gave up for each · how you knew it worked. The trade-off sentences are the whole answer; a project narrated without a single "we chose X over Y because" reads as work you were assigned rather than work you shaped.\n\nExpect a follow-up drilling into any technology you name. Never name one you cannot defend for three more questions.',
      interviewPitch:
        '"Problem, constraint, two trade-offs, evidence it worked. Then stop and let them pick which thread to pull."',
    },
    why: 'The longest answer you will give, and the one where interviewers form their technical opinion of you.',
    hints: [
      'Lead with the problem and the person who had it, never with the stack.',
      'Two trade-offs, each with what you gave up. That is the scored part.',
      'Have a number for "how you knew it worked".',
      'Do not name a technology you cannot survive three follow-ups on.',
    ],
    practice: {
      type: 'js_snippet',
      task: 'Draft the project narrative. Then record the 90-second version.',
      starterCode: `/* Walk me through a project you are proud of.
   Problem → constraint → two trade-offs → evidence. Record the 90s version. */

PROBLEM — who had it, and what it cost them
  →

CONSTRAINT — what made this hard (time, scale, legacy, team)
  →

TRADE-OFF 1 — chose ___ over ___ because ___ ; gave up ___
  →

TRADE-OFF 2 — chose ___ over ___ because ___ ; gave up ___
  →

EVIDENCE — the number that shows it worked
  →

FOLLOW-UPS I MUST SURVIVE — technologies I named, and my defence of each
  →
`,
      solutionCode: '',
      specs: [
        'Opens with the problem, not the stack',
        'Names a real constraint',
        'Contains two explicit trade-offs with what was given up',
        'Ends with a measurement',
      ],
    },
  },
  {
    id: 'hr-questions',
    trackId: 'behavioural',
    trackName: 'Behavioural & HR',
    category: 'The Close',
    title: 'Do you have any questions for us?',
    level: 'Warm-up',
    xp: 30,
    theory: {
      hook: '"No, I think you covered everything" is the single most expensive sentence in the interview. It is the last thing they hear, and it reads as indifference.',
      deepDive:
        'Prepare three, and ask two. Good questions reveal what you pay attention to: how work is decided, what failure looks like on this team, what the person answering wishes were different. Avoid anything answerable from the careers page, and avoid compensation in a technical round.\n\nThe strongest question is often the most specific: ask about something they said earlier in the conversation. It proves you were listening, which is the whole subtext of the round.',
      interviewPitch:
        '"What does a piece of work look like when it goes badly here — and what usually caused it?" It is disarming, specific, and the answer tells you whether to accept the offer.',
    },
    why: 'It is the last impression, it is entirely within your control, and it is the one nobody rehearses.',
    hints: [
      'Three prepared, two asked. Never zero.',
      'One question must reference something they said in this conversation.',
      'Nothing answerable from the careers page; no compensation in a technical round.',
    ],
    practice: {
      type: 'js_snippet',
      task: 'Write your three questions. Record yourself asking two of them.',
      starterCode: `/* Do you have any questions for us?
   Three prepared. Two asked. One must reference something they said. */

Q1 — about how work is decided
  →

Q2 — about what failure looks like here
  →

Q3 — for the person in front of me, about their own experience
  →
`,
      solutionCode: '',
      specs: [
        'Three questions written',
        'None answerable from the careers page',
        'At least one is about failure or difficulty, not perks',
        'One slot reserved to reference something said in the room',
      ],
    },
  },
  {
    id: 'hr-gap',
    trackId: 'behavioural',
    trackName: 'Behavioural & HR',
    category: 'Ownership',
    title: 'Handling a question you cannot answer',
    level: 'Advanced',
    xp: 40,
    theory: {
      hook: 'You will be asked something you do not know. The answer is not a guess, and it is not "I don\'t know" full stop. It is a bounded, honest reach.',
      deepDive:
        'The three-part move: say what you do know that is adjacent · say plainly where your knowledge stops · say how you would find out. That reads as calibrated, and calibration is what senior means. Bluffing is fatal — interviewers ask follow-ups precisely to find the edge, and finding it by watching you invent is much worse than being told.\n\nSecond-order benefit: it models how you will behave in a design review when you are out of your depth, which is the real thing being predicted.',
      interviewPitch:
        '"I have not used Server Components in production. What I know is the boundary — they run on the server, ship no JS, and cannot hold state, so interactivity has to cross into a client component. Where I would need to check is the data-fetching story around caching. I would start with the React docs and build a small route to see it fail."',
    },
    why: 'Every technical round contains at least one. How you handle it is worth more than the answer would have been.',
    hints: [
      'Adjacent knowledge first — it shows the shape of what you do have.',
      'Name the edge explicitly. "Where I would need to check is…" is a senior sentence.',
      'Finish with the method, not an apology.',
    ],
    practice: {
      type: 'js_snippet',
      task: 'Pick three topics you genuinely do not know well. Draft the bounded answer for each, then record one.',
      starterCode: `/* Handling "I don't know" without bluffing and without collapsing.
   Adjacent knowledge → the edge → the method. */

TOPIC 1 — the thing I do not know well
  ADJACENT →
  EDGE →
  METHOD →

TOPIC 2
  ADJACENT →
  EDGE →
  METHOD →

TOPIC 3
  ADJACENT →
  EDGE →
  METHOD →
`,
      solutionCode: '',
      specs: [
        'Adjacent knowledge stated before the gap',
        'The edge of knowledge is named explicitly',
        'A concrete method for finding out',
        'No bluffing, no apologising',
      ],
    },
  },
];
