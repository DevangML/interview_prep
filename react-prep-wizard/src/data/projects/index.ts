import { profileCardProject } from './basic/profileCard';
import { pricingGridProject } from './basic/pricingGrid';
import { overlayStackProject } from './basic/overlayStack';
import { domTodoProject } from './basic/domTodo';
import { equalityLabProject } from './basic/equalityLab';
import { reactCounterProject } from './basic/reactCounter';
import { controlledFormProject } from './basic/controlledForm';
import { fetchListProject } from './basic/fetchList';
import { classMuseumProject } from './basic/classMuseum';
import { routedAppProject } from './basic/routedApp';

import { fluxToReduxProject } from './intermediate/fluxToRedux';
import { utilityBeltProject } from './intermediate/utilityBelt';
import { testedLibraryProject } from './intermediate/testedLibrary';
import { designedDashboardProject } from './intermediate/designedDashboard';
import { perfAuditProject } from './intermediate/perfAudit';

import { hyperCanvasProject } from './advanced/hyperCanvas';
import { quantumTradeProject } from './advanced/quantumTrade';
import { chronosGraphProject } from './advanced/chronosGraph';
import { pulseUIProject } from './advanced/pulseUI';
import { sandboxRuntimeProject } from './advanced/sandboxRuntime';
import { reactFromScratchProject } from './advanced/reactFromScratch';

import type { ProjectBlueprint, ProjectTier } from './types';

export * from './types';

/** Ordered so the list reads as a path: foundations first, the dare last. */
export const PROJECT_BLUEPRINTS: ProjectBlueprint[] = [
  profileCardProject,
  pricingGridProject,
  overlayStackProject,
  domTodoProject,
  equalityLabProject,
  reactCounterProject,
  controlledFormProject,
  fetchListProject,
  classMuseumProject,
  routedAppProject,

  fluxToReduxProject,
  utilityBeltProject,
  testedLibraryProject,
  designedDashboardProject,
  perfAuditProject,

  pulseUIProject,
  chronosGraphProject,
  hyperCanvasProject,
  quantumTradeProject,
  sandboxRuntimeProject,
  reactFromScratchProject,
];

export const PROJECT_BY_ID = new Map<string, ProjectBlueprint>(
  PROJECT_BLUEPRINTS.map((p) => [p.id, p]),
);

export const PROJECTS_BY_TIER = (tier: ProjectTier): ProjectBlueprint[] =>
  PROJECT_BLUEPRINTS.filter((p) => p.tier === tier);

/** Every concept id any project claims to teach — the input to the coverage check. */
export const coveredConceptIds = (projects = PROJECT_BLUEPRINTS): Set<string> =>
  new Set(
    projects.flatMap((p) => [
      ...p.explicitTopics.flatMap((t) => t.conceptIds),
      ...p.implicitFoundations.flatMap((f) => f.conceptIds ?? []),
    ]),
  );
