import { profileCardProject } from './service/profileCard';
import { pricingGridProject } from './service/pricingGrid';
import { overlayStackProject } from './service/overlayStack';
import { domTodoProject } from './service/domTodo';
import { equalityLabProject } from './service/equalityLab';
import { reactCounterProject } from './service/reactCounter';
import { controlledFormProject } from './service/controlledForm';
import { fetchListProject } from './service/fetchList';
import { classMuseumProject } from './service/classMuseum';
import { routedAppProject } from './service/routedApp';

import { fluxToReduxProject } from './service/fluxToRedux';
import { utilityBeltProject } from './service/utilityBelt';
import { testedLibraryProject } from './product/testedLibrary';
import { designedDashboardProject } from './service/designedDashboard';
import { perfAuditProject } from './product/perfAudit';

import { hyperCanvasProject } from './product/hyperCanvas';
import { quantumTradeProject } from './product/quantumTrade';
import { chronosGraphProject } from './product/chronosGraph';
import { pulseUIProject } from './product/pulseUI';
import { sandboxRuntimeProject } from './product/sandboxRuntime';
import { reactFromScratchProject } from './product/reactFromScratch';
import { relayProject } from './product/relay';
import { typeaheadProject } from './service/typeahead';
import { infiniteFeedProject } from './service/infiniteFeed';
import { kanbanProject } from './service/kanban';
import { formWizardProject } from './service/formWizard';
import { dataGridProject } from './service/dataGrid';

import type { ProjectBlueprint, ProjectTier, ProjectTrack } from './types';

export * from './types';

/** Ordered by bucket: service foundations, service flagships, then product. */
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

  relayProject,
  typeaheadProject,
  infiniteFeedProject,
  kanbanProject,
  formWizardProject,
  dataGridProject,
];

export const PROJECT_BY_ID = new Map<string, ProjectBlueprint>(
  PROJECT_BLUEPRINTS.map((p) => [p.id, p]),
);

/** Projects in one bucket. Both axes are optional, so this also filters by one. */
export const PROJECTS_IN = (track?: ProjectTrack, tier?: ProjectTier): ProjectBlueprint[] =>
  PROJECT_BLUEPRINTS.filter((p) => (!track || p.track === track) && (!tier || p.tier === tier));

export const PROJECTS_BY_TIER = (tier: ProjectTier): ProjectBlueprint[] => PROJECTS_IN(undefined, tier);

/** Every concept id any project claims to teach — the input to the coverage check. */
export const coveredConceptIds = (projects = PROJECT_BLUEPRINTS): Set<string> =>
  new Set(
    projects.flatMap((p) => [
      ...p.explicitTopics.flatMap((t) => t.conceptIds),
      ...p.implicitFoundations.flatMap((f) => f.conceptIds ?? []),
    ]),
  );
