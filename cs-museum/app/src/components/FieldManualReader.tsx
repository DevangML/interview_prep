import { useEffect, useState } from 'react';
import { useMuseumStore } from '../store/useMuseumStore';
import { useMediaStore } from '../store/useMediaStore';
import { SiblingPivotLink } from './SiblingPivotLink';
import { EvidenceEnvelope } from './EvidenceEnvelope';
import { BedrockTrace } from './BedrockTrace';
import { UnverifiedState } from './UnverifiedState';
import { findCell, isReadable } from '../lib/langCells';
import { getLanguageDeepSpec } from '../lib/languageDeepSpecs';
import { TelemetryBar } from './TelemetryBar';
import { StageConceptNav } from './StageConceptNav';
import { ConceptAbstractView } from './ConceptAbstractView';
import { LanguageFieldManual } from './LanguageFieldManual';

export const FieldManualReader = () => {
  const {
    getActiveConcept,
    activeLanguage,
    selectLanguage,
    selectConcept,
    getStageTrack,
  } = useMuseumStore();

  const { activeVideo, setDocked } = useMediaStore();
  const concept = getActiveConcept();
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  useEffect(() => {
    setFadeState('out');
    const timer = setTimeout(() => setFadeState('in'), 120);
    return () => clearTimeout(timer);
  }, [activeLanguage, concept?.id]);

  useEffect(() => {
    // Auto-dock to PiP when user is studying a specific language implementation
    if (activeLanguage && activeVideo) {
      setDocked(true);
    }
  }, [activeLanguage, activeVideo, setDocked]);

  if (!concept || !concept.details) return null;

  const { details } = concept;
  const byLangList = details.byLanguage || [];
  const currentLangImpl = activeLanguage ? findCell(byLangList, activeLanguage) : undefined;
  const readable = isReadable(currentLangImpl);

  const track = getStageTrack();
  const currentIdx = track.findIndex((n) => n.id === concept.id);
  const prevConcept = currentIdx > 0 ? track[currentIdx - 1] : null;
  const nextConcept =
    currentIdx >= 0 && currentIdx < track.length - 1 ? track[currentIdx + 1] : null;

  const deepSpec =
    readable && currentLangImpl
      ? getLanguageDeepSpec(concept.id, currentLangImpl.lang, currentLangImpl)
      : null;

  return (
    <article
      className="max-w-[760px] mx-auto px-4 sm:px-6 py-6 font-chrome space-y-6"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* React 19 Document Metadata Hoisting */}
      <title>{activeLanguage ? `${concept.label} in ${activeLanguage}` : concept.label} | CS Museum</title>
      <meta name="description" content={details.motivation || details.definition || concept.label} />

      {deepSpec && (
        <TelemetryBar
          telemetry={deepSpec.telemetry}
          activeLanguage={activeLanguage}
        />
      )}

      <SiblingPivotLink
        cells={byLangList}
        activeLanguage={activeLanguage}
        onSelect={(lang) => selectLanguage(lang)}
      />

      <div
        className={`transition-opacity duration-150 space-y-6 ${
          fadeState === 'in' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Language-Agnostic Concept Abstract View */}
        {activeLanguage === null ? (
          <ConceptAbstractView
            concept={concept}
            onSelectLanguage={(lang) => selectLanguage(lang)}
          />
        ) : !readable || !currentLangImpl ? (
          <UnverifiedState concept={concept} requestedLanguage={activeLanguage} />
        ) : (
          <LanguageFieldManual
            concept={concept}
            currentLangImpl={currentLangImpl}
            deepSpec={deepSpec}
          />
        )}

        <StageConceptNav
          prevConcept={prevConcept}
          nextConcept={nextConcept}
          onSelect={(id) => selectConcept(id)}
        />

        <BedrockTrace
          empoweredBy={details.empowered_by}
          traceDown={details.traceDown}
          empowersNote={details.empowers_note || details.empowers}
        />

        <EvidenceEnvelope details={details} currentLangImpl={currentLangImpl} />
      </div>
    </article>
  );
};
