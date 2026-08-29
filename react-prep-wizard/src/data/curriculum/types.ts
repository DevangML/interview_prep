/**
 * Role-gated curriculum phases.
 *
 * The mastery stream is ordered by topic, not by consequence: 178 of its 216
 * units are CSS layout drills, so working it linearly spends most of a year on
 * the material a 3-YOE React loop asks about least. A phase answers the only
 * question that actually sequences study — *which rooms does this get me into*
 * — and each one ends at a gate you can fail.
 *
 * Every id referenced here must resolve against real content; the phase check
 * script fails the build otherwise. A curriculum that points at nothing is a
 * wish list.
 */
import type { LearnArea } from '../learn/types';

/** A hiring lane, described concretely enough to be falsifiable. */
export interface RoleTarget {
  /** Titles as they are actually posted. */
  band: string;
  /** Real employers who hire this lane in India / remote. Examples, not a promise. */
  employers: string[];
  /** The rounds you will actually sit, in order. */
  loop: string[];
  /** Typical total comp band at 3 YOE, INR lakhs per annum, as of 2026. */
  compLpa: [number, number];
  /** What is genuinely hard about this lane, stated plainly. */
  realism: string;
}

/** A pass/fail check. Vague gates are how a plan quietly stops being true. */
export interface PhaseGate {
  id: string;
  claim: string;
  proof: string;
}

export interface CurriculumPhase {
  id: string;
  order: number;
  name: string;
  /** One sentence: what changes about you when this phase is done. */
  promise: string;
  /** How to tell you are standing in this phase right now. */
  youAreHereWhen: string;
  unlocks: RoleTarget[];
  /** Content this phase draws from. Ids are validated against the real data. */
  draws: {
    masteryTrackIds?: string[];
    masteryUnitIds?: string[];
    learnAreas?: LearnArea[];
    learnTopicIds?: string[];
    projectIds?: string[];
  };
  gates: PhaseGate[];
  /** Focused hours, assuming the prior phase is genuinely done. */
  estimatedHours: number;
  /** When this phase is a waste of time for a given candidate. */
  skipIf?: string;
}
