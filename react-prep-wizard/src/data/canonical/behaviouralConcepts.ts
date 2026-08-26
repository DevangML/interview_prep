import type { CanonicalConcept } from './types';

export const behaviouralConcepts: CanonicalConcept[] = [
  {
    id: 'cc-hr-elevator-pitch',
    pillar: 'Behavioural & Leadership Engineering',
    title: 'The 30-45s 3-Beat Elevator Pitch Framework',
    subtopics: ['1. Current Scope & Production Metrics', '2. Architectural Differentiator / Non-Obvious Skill', '3. Explicit Reason for Targeting This Specific Role'],
    mechanismSummary: 'Delivers a crisp, high-impact introductory narrative avoiding chronological resume recitation.',
    interviewSignificance: 'Sets the technical tone and authority in initial interview minutes.'
  },
  {
    id: 'cc-hr-star-conflict',
    pillar: 'Behavioural & Leadership Engineering',
    title: 'STAR Method: Technical Disagreements & Disagree-and-Commit',
    subtopics: ['Situation & Competing Tradeoffs', 'Task Objective', 'Action: Proof-of-Concept Spikes & Data-Driven Decision', 'Result & Disagree-and-Commit Execution'],
    mechanismSummary: 'Resolves technical debates with quantifiable metrics and benchmarks rather than dogmatic personal taste.',
    interviewSignificance: 'Evaluates senior leadership maturity, conflict resolution, and execution alignment.'
  },
  {
    id: 'cc-hr-star-failure',
    pillar: 'Behavioural & Leadership Engineering',
    title: 'STAR Method: Production Outages, Root Cause & Systemic Fixes',
    subtopics: ['Failure Ownership & Blast Radius', 'Immediate Containment', 'Root Cause Analysis (5 Whys)', 'Systemic Engineering Prevention (Linters, Gates, Runbooks)'],
    mechanismSummary: 'Focuses 80% of the failure narrative on systemic engineering mechanisms rather than personal fault.',
    interviewSignificance: 'Differentiates junior defensiveness from Staff-level systemic incident ownership.'
  },
  {
    id: 'cc-hr-star-project',
    pillar: 'Behavioural & Leadership Engineering',
    title: 'Deep Technical Project Walkthrough Narrative Architecture',
    subtopics: ['Problem & Financial/Latency Cost', 'Real-World Technical Constraints', '2 Explicit Rejected Alternatives & Tradeoffs', 'Quantitative Proof of Outcome'],
    mechanismSummary: 'Structures technical stories around hard constraints, explicit architectural trade-offs, and measurable outcomes.',
    interviewSignificance: 'The core framework for passing Senior and Staff project deep-dive interviews.'
  },
  {
    id: 'cc-hr-reverse-questions',
    pillar: 'Behavioural & Leadership Engineering',
    title: 'Reverse Interview Interrogation Strategy',
    subtopics: ['Decision Velocity Assessment', 'Failure Mode & On-Call Culture Probing', 'Engineering Roadmap Autonomy'],
    mechanismSummary: 'Prepares strategic questions to diagnose team health, architectural autonomy, and organizational maturity.',
    interviewSignificance: 'Demonstrates senior critical thinking and cultural alignment evaluation.'
  },
  {
    id: 'cc-hr-calibrated-gap',
    pillar: 'Behavioural & Leadership Engineering',
    title: 'Calibrated Response to Unknowns ("I Don\'t Know")',
    subtopics: ['1. State Adjacent Knowledge Boundary', '2. Explicitly Acknowledge Knowledge Limit', '3. Concrete Verification & Discovery Methodology'],
    mechanismSummary: 'Transforms lack of specific knowledge into a demonstration of structured problem-solving methodology.',
    interviewSignificance: 'Eliminates candidate bluffing and showcases intellectual honesty and debug velocity.'
  }
];
