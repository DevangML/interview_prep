import type { MasteryUnit } from '../masteryStream';

export const behaviouralStoriesUnits: MasteryUnit[] = [
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
        'Structure it as: the problem and who had it · the constraint that made it hard · two decisions you made and what you gave up for each · how you knew it worked. The trade-off sentences are the whole answer.',
      interviewPitch:
        '"Problem, constraint, two trade-offs, evidence it worked. Then stop and let them pick which thread to pull."',
    },
    why: 'The longest answer you will give, and the one where interviewers form their technical opinion of you.',
    hints: [
      'Lead with the problem and the person who had it, never with the stack.',
      'Two trade-offs, each with what you gave up. That is the scored part.',
      'Have a number for "how you knew it worked".',
    ],
    practice: {
      type: 'js_snippet',
      task: 'Draft the project narrative. Then record the 90-second version.',
      starterCode: `/* Walk me through a project you are proud of.\n   Problem → constraint → two trade-offs → evidence. Record the 90s version. */\n\nPROBLEM — who had it, and what it cost them\n  →\n\nCONSTRAINT — what made this hard (time, scale, legacy, team)\n  →\n\nTRADE-OFF 1 — chose ___ over ___ because ___ ; gave up ___\n  →\n\nTRADE-OFF 2 — chose ___ over ___ because ___ ; gave up ___\n  →\n\nEVIDENCE — the number that shows it worked\n  →\n`,
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
        'Prepare three, and ask two. Good questions reveal what you pay attention to: how work is decided, what failure looks like on this team, what the person answering wishes were different.',
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
      starterCode: `/* Do you have any questions for us?\n   Three prepared. Two asked. One must reference something they said. */\n\nQ1 — about how work is decided\n  →\n\nQ2 — about what failure looks like here\n  →\n\nQ3 — for the person in front of me, about their own experience\n  →\n`,
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
        'The three-part move: say what you do know that is adjacent · say plainly where your knowledge stops · say how you would find out. That reads as calibrated, and calibration is what senior means.',
      interviewPitch:
        '"I have not used Server Components in production. What I know is the boundary — they run on the server, ship no JS, and cannot hold state. Where I would need to check is caching. I would start with the React docs and build a small route."',
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
      starterCode: `/* Handling "I don't know" without bluffing and without collapsing.\n   Adjacent knowledge → the edge → the method. */\n\nTOPIC 1 — the thing I do not know well\n  ADJACENT →\n  EDGE →\n  METHOD →\n\nTOPIC 2\n  ADJACENT →\n  EDGE →\n  METHOD →\n\nTOPIC 3\n  ADJACENT →\n  EDGE →\n  METHOD →\n`,
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
