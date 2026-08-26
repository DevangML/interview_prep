import type { ProjectCoverage } from './types';
import { profileCardCoverage } from './profileCard';
import { pricingGridCoverage } from './pricingGrid';
import { overlayStackCoverage } from './overlayStack';
import { domTodoCoverage } from './domTodo';
import { equalityLabCoverage } from './equalityLab';
import { reactCounterCoverage } from './reactCounter';
import { controlledFormCoverage } from './controlledForm';
import { fetchListCoverage } from './fetchList';
import { classMuseumCoverage } from './classMuseum';
import { routedAppCoverage } from './routedApp';
import { fluxToReduxCoverage } from './fluxToRedux';
import { utilityBeltCoverage } from './utilityBelt';
import { testedLibraryCoverage } from './testedLibrary';
import { designedDashboardCoverage } from './designedDashboard';
import { perfAuditCoverage } from './perfAudit';
import { pulseUICoverage } from './pulseUI';
import { chronosGraphCoverage } from './chronosGraph';
import { hyperCanvasCoverage } from './hyperCanvas';
import { quantumTradeCoverage } from './quantumTrade';
import { sandboxRuntimeCoverage } from './sandboxRuntime';
import { reactFromScratchCoverage } from './reactFromScratch';

export * from './types';

/**
 * One manifest per project. `scripts/checkProjectCoverage.ts` fails when any
 * (project, concept) pair is neither used nor deliberately exempted.
 */
export const PROJECT_COVERAGE: ProjectCoverage[] = [
  profileCardCoverage,
  pricingGridCoverage,
  overlayStackCoverage,
  domTodoCoverage,
  equalityLabCoverage,
  reactCounterCoverage,
  controlledFormCoverage,
  fetchListCoverage,
  classMuseumCoverage,
  routedAppCoverage,
  fluxToReduxCoverage,
  utilityBeltCoverage,
  testedLibraryCoverage,
  designedDashboardCoverage,
  perfAuditCoverage,
  pulseUICoverage,
  chronosGraphCoverage,
  hyperCanvasCoverage,
  quantumTradeCoverage,
  sandboxRuntimeCoverage,
  reactFromScratchCoverage,
];

export const COVERAGE_BY_PROJECT = new Map<string, ProjectCoverage>(
  PROJECT_COVERAGE.map((c) => [c.projectId, c]),
);
