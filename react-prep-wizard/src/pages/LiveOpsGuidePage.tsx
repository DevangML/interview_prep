import { useState, useMemo } from 'react';
import { 
  Zap, 
  Terminal, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  FileCode, 
  HelpCircle, 
  Mic, 
  Sparkles, 
  BookOpen, 
  ShieldAlert, 
  Cpu, 
  Activity,
  ArrowRight,
  ExternalLink,
  Code2
} from 'lucide-react';
import { LIVE_OPS_QUESTS, type LiveOpsChallengeData, type LiveOpsQuestData } from '../data/projects/liveOpsGuideData';
import UniversalAiAssistant from '../components/socratic/UniversalAiAssistant';

export default function LiveOpsGuidePage() {
  const [selectedQuestId, setSelectedQuestId] = useState<string>('F01');
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>('F01.1');
  const [activeTab, setActiveTab] = useState<'why' | 'topology' | 'contract' | 'broken' | 'edgecases' | 'defense'>('why');
  const [revealedTraps, setRevealedTraps] = useState<Record<number, boolean>>({});
  const [isAiMentorOpen, setIsAiMentorOpen] = useState(false);
  const [aiInitialCommand, setAiInitialCommand] = useState<string | null>(null);

  // Active Quest & Challenge Resolution
  const activeQuest = useMemo(() => {
    return LIVE_OPS_QUESTS.find(q => q.id === selectedQuestId) || LIVE_OPS_QUESTS[0];
  }, [selectedQuestId]);

  const activeChallenge = useMemo<LiveOpsChallengeData>(() => {
    return activeQuest.challenges.find(c => c.id === selectedChallengeId) || activeQuest.challenges[0];
  }, [activeQuest, selectedChallengeId]);

  // Select first challenge when switching quest
  const handleSelectQuest = (quest: LiveOpsQuestData) => {
    setSelectedQuestId(quest.id);
    setSelectedChallengeId(quest.challenges[0].id);
    setRevealedTraps({});
  };

  const handleSelectChallenge = (cId: string) => {
    setSelectedChallengeId(cId);
    setRevealedTraps({});
  };

  const toggleTrap = (idx: number) => {
    setRevealedTraps(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const triggerAiWithCommand = (cmd: string) => {
    setAiInitialCommand(cmd);
    setIsAiMentorOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-100 flex flex-col">
      {/* Top Banner & Crucible Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    Live Ops Console <span className="text-emerald-400">Crucible</span>
                  </h1>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 font-mono">
                    Staff Machine Coding
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Build <code className="text-amber-300">~/Desktop/live_feed_console</code> step-by-step with deep mechanical pedagogy & Socratic systems defense
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Sparring Bar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerAiWithCommand('/liveops-step')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Step Contract</span>
            </button>
            <button
              onClick={() => triggerAiWithCommand('/broken-first')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Broken-First Anti-Pattern</span>
            </button>
            <button
              onClick={() => {
                setAiInitialCommand(null);
                setIsAiMentorOpen(true);
              }}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
              <span>Ask Senku (AI Mentor)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col md:flex-row gap-6 p-6">
        {/* Left Navigation: Quest Pipeline & Challenges */}
        <aside className="w-full md:w-80 flex-shrink-0 space-y-4">
          <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Quests & Stages</span>
              </h2>
              <span className="text-xs text-amber-400 font-mono font-semibold">1,300 XP Total</span>
            </div>

            {/* Quest Selector Buttons */}
            <div className="space-y-2">
              {LIVE_OPS_QUESTS.map((quest) => {
                const isQuestActive = quest.id === selectedQuestId;
                return (
                  <button
                    key={quest.id}
                    onClick={() => handleSelectQuest(quest)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      isQuestActive
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-white shadow-md'
                        : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                        isQuestActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {quest.id}
                      </span>
                      <span className="text-xs text-amber-400/90 font-mono">+{quest.xp} XP</span>
                    </div>
                    <div className="text-sm font-semibold mt-1 text-slate-200">{quest.title}</div>
                    <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{quest.tagline}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Challenges List for Active Quest */}
          <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Step-by-Step Challenges</span>
            </h3>

            <div className="space-y-1.5">
              {activeQuest.challenges.map((c) => {
                const isSelected = c.id === selectedChallengeId;
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSelectChallenge(c.id)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start justify-between gap-2 border ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500/60 text-cyan-200 font-medium'
                        : 'bg-slate-800/30 border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-2 min-w-0">
                      <span className={`font-mono text-[11px] font-bold px-1 py-0.5 rounded flex-shrink-0 ${
                        isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-500'
                      }`}>
                        {c.id}
                      </span>
                      <span className="truncate leading-tight mt-0.5">{c.title}</span>
                    </div>
                    {isSelected && <ChevronRight className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>

            {/* Target Location Card */}
            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-amber-400" />
                <span>Target File:</span>
              </div>
              <div className="text-xs font-mono text-amber-300/90 break-all mt-0.5 bg-slate-950/60 p-1.5 rounded border border-slate-800">
                ~/Desktop/live_feed_console/{activeChallenge.targetFile}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Main Panel: 6 Pedagogical Pillars */}
        <main className="flex-1 min-w-0 space-y-4">
          {/* Header Card for Active Challenge */}
          <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono font-bold px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  Challenge {activeChallenge.id}
                </span>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {activeChallenge.title}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">Row Topics:</span>
                <div className="flex flex-wrap gap-1">
                  {activeChallenge.teachesRowIds.slice(0, 4).map(r => (
                    <span key={r} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                      {r}
                    </span>
                  ))}
                  {activeChallenge.teachesRowIds.length > 4 && (
                    <span className="text-[10px] font-mono px-1 py-0.5 rounded bg-slate-800 text-slate-400">
                      +{activeChallenge.teachesRowIds.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Pedagogical Tabs */}
            <div className="flex items-center gap-1.5 mt-4 overflow-x-auto pb-1 border-b border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('why')}
                className={`px-3 py-2 rounded-t-lg font-semibold flex items-center gap-1.5 transition-colors ${
                  activeTab === 'why'
                    ? 'bg-slate-800 text-emerald-300 border-b-2 border-emerald-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>1. Why It Exists</span>
              </button>

              <button
                onClick={() => setActiveTab('topology')}
                className={`px-3 py-2 rounded-t-lg font-semibold flex items-center gap-1.5 transition-colors ${
                  activeTab === 'topology'
                    ? 'bg-slate-800 text-cyan-300 border-b-2 border-cyan-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>2. Where It Fits (Topology)</span>
              </button>

              <button
                onClick={() => setActiveTab('contract')}
                className={`px-3 py-2 rounded-t-lg font-semibold flex items-center gap-1.5 transition-colors ${
                  activeTab === 'contract'
                    ? 'bg-slate-800 text-blue-300 border-b-2 border-blue-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>3. Strict Contract</span>
              </button>

              <button
                onClick={() => setActiveTab('broken')}
                className={`px-3 py-2 rounded-t-lg font-semibold flex items-center gap-1.5 transition-colors ${
                  activeTab === 'broken'
                    ? 'bg-slate-800 text-rose-300 border-b-2 border-rose-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>4. Broken-First Trap</span>
              </button>

              <button
                onClick={() => setActiveTab('edgecases')}
                className={`px-3 py-2 rounded-t-lg font-semibold flex items-center gap-1.5 transition-colors ${
                  activeTab === 'edgecases'
                    ? 'bg-slate-800 text-amber-300 border-b-2 border-amber-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span>5. Edge Case Checklist</span>
              </button>

              <button
                onClick={() => setActiveTab('defense')}
                className={`px-3 py-2 rounded-t-lg font-semibold flex items-center gap-1.5 transition-colors ${
                  activeTab === 'defense'
                    ? 'bg-slate-800 text-purple-300 border-b-2 border-purple-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Mic className="w-3.5 h-3.5 text-purple-400" />
                <span>6. A3 Spoken Defense</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="mt-5 space-y-4">
              {/* 1. WHY IT EXISTS */}
              {activeTab === 'why' && (
                <div className="space-y-4 text-sm leading-relaxed">
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Architectural Rationale</span>
                    </h4>
                    <p className="text-slate-200">{activeChallenge.why.summary}</p>
                  </div>

                  <div className="bg-rose-950/20 p-4 rounded-xl border border-rose-500/30">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Catastrophic Production Failure Mode If Omitted</span>
                    </h4>
                    <p className="text-rose-200/90">{activeChallenge.why.productionFailure}</p>
                  </div>

                  <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1">
                      Underlying Runtime Mechanism
                    </h4>
                    <p className="text-slate-300 font-mono text-xs">{activeChallenge.why.keyConcept}</p>
                  </div>
                </div>
              )}

              {/* 2. TOPOLOGY & DATA FLOW */}
              {activeTab === 'topology' && (
                <div className="space-y-4 text-sm leading-relaxed">
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1">
                      Layer Placement & System Flow
                    </h4>
                    <p className="text-slate-300 mb-3">{activeChallenge.whereItFits.flowDescription}</p>
                    
                    <div className="bg-[#0b0e14] p-4 rounded-lg border border-slate-800 font-mono text-xs text-emerald-300 whitespace-pre overflow-x-auto leading-tight">
                      {activeChallenge.whereItFits.diagramAscii}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. STRICT CONTRACT */}
              {activeTab === 'contract' && (
                <div className="space-y-4 text-sm">
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">
                      Signatures & Class Constructors
                    </h4>
                    <div className="space-y-1.5">
                      {activeChallenge.whatContract.signatures.map((sig, idx) => (
                        <div key={idx} className="bg-slate-900 p-2.5 rounded border border-slate-800 font-mono text-xs text-cyan-200">
                          {sig}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <div className="bg-slate-900/60 p-3 rounded border border-slate-800">
                        <div className="text-xs font-semibold text-slate-400 mb-1">Expected Inputs:</div>
                        <ul className="list-disc list-inside text-xs text-slate-300 space-y-0.5 font-mono">
                          {activeChallenge.whatContract.inputs.map((inp, i) => (
                            <li key={i}>{inp}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-slate-900/60 p-3 rounded border border-slate-800">
                        <div className="text-xs font-semibold text-slate-400 mb-1">Expected Outputs:</div>
                        <ul className="list-disc list-inside text-xs text-slate-300 space-y-0.5 font-mono">
                          {activeChallenge.whatContract.outputs.map((out, i) => (
                            <li key={i}>{out}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="text-xs font-semibold text-amber-400 mb-1.5">Non-Negotiable Invariants:</div>
                      <div className="space-y-1">
                        {activeChallenge.whatContract.invariants.map((inv, i) => (
                          <div key={i} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-900/40 p-2 rounded border border-slate-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{inv}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. BROKEN-FIRST TRAP */}
              {activeTab === 'broken' && (
                <div className="space-y-4 text-sm leading-relaxed">
                  <div className="bg-rose-950/20 p-4 rounded-xl border border-rose-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span>The Anti-Pattern: {activeChallenge.brokenFirstTrap.title}</span>
                      </h4>
                      <span className="text-[11px] font-mono text-rose-400/80">Write this first to see it fail!</span>
                    </div>

                    <div className="bg-[#0b0e14] p-3 rounded-lg border border-rose-950/80 font-mono text-xs text-rose-200 whitespace-pre overflow-x-auto">
                      {activeChallenge.brokenFirstTrap.badCodeSnippet}
                    </div>

                    <div className="bg-slate-900/80 p-3 rounded border border-rose-900/40 space-y-1.5">
                      <div className="text-xs font-semibold text-slate-300">Exact Runtime Error Thrown:</div>
                      <div className="text-xs font-mono text-rose-400 bg-rose-950/40 p-2 rounded border border-rose-900/50">
                        {activeChallenge.brokenFirstTrap.errorSignature}
                      </div>
                      <div className="text-xs text-slate-300 pt-1">
                        {activeChallenge.brokenFirstTrap.whatBreaks}
                      </div>
                    </div>

                    <div className="bg-emerald-950/30 p-3 rounded border border-emerald-500/40">
                      <div className="text-xs font-semibold text-emerald-400 mb-1">Mechanistic Fix & Insight:</div>
                      <div className="text-xs text-slate-200 leading-relaxed font-mono">
                        {activeChallenge.brokenFirstTrap.mechanisticFix}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. EDGE CASE CHECKLIST */}
              {activeTab === 'edgecases' && (
                <div className="space-y-3 text-sm">
                  <div className="text-xs text-slate-400 mb-2">
                    Test your mental model against these subtle edge cases before committing your code:
                  </div>

                  {activeChallenge.edgeCases.map((ec, idx) => {
                    const isRevealed = revealedTraps[idx];
                    return (
                      <div key={idx} className="bg-slate-950/60 rounded-xl border border-slate-800 p-4 transition-all">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5">
                            <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 flex-shrink-0 mt-0.5">
                              #{idx + 1}
                            </span>
                            <div className="text-xs font-semibold text-slate-200">
                              {ec.question}
                            </div>
                          </div>
                          <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded flex-shrink-0 ${
                            ec.trapSeverity === 'critical'
                              ? 'bg-rose-950/60 text-rose-300 border border-rose-700/50'
                              : 'bg-amber-950/60 text-amber-300 border border-amber-700/50'
                          }`}>
                            {ec.trapSeverity}
                          </span>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                          <button
                            onClick={() => toggleTrap(idx)}
                            className="text-xs font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                          >
                            <span>{isRevealed ? 'Hide Mechanistic Explanation' : 'Reveal Explanation'}</span>
                            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isRevealed ? 'rotate-90' : ''}`} />
                          </button>
                        </div>

                        {isRevealed && (
                          <div className="mt-3 p-3 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
                            {ec.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 6. A3 SPOKEN DEFENSE */}
              {activeTab === 'defense' && (
                <div className="space-y-4 text-sm leading-relaxed">
                  <div className="bg-purple-950/20 p-5 rounded-xl border border-purple-500/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
                        <Mic className="w-4 h-4 text-purple-400" />
                        <span>Staff/Principal Oral Interview Defense</span>
                      </h4>
                      <span className="text-xs font-mono text-purple-400 px-2 py-0.5 rounded bg-purple-900/40 border border-purple-700/50">
                        ⏱️ {activeChallenge.a3Defense.timeBudgetSeconds}s Budget
                      </span>
                    </div>

                    <div className="bg-slate-900/90 p-4 rounded-lg border border-purple-900/40">
                      <div className="text-xs font-semibold text-slate-400 mb-1">Interviewer Prompt:</div>
                      <div className="text-sm font-medium text-slate-100 italic">
                        "{activeChallenge.a3Defense.prompt}"
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-purple-300 mb-2">Must-Mention Key Invariants:</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {activeChallenge.a3Defense.mustMention.map((point, i) => (
                          <div key={i} className="text-xs text-slate-200 flex items-start gap-2 bg-slate-900/60 p-2 rounded border border-slate-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#0b0e14] p-4 rounded-lg border border-slate-800">
                      <div className="text-xs font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>High-Distinction Spoken Answer (Read Aloud):</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans mt-2">
                        "{activeChallenge.a3Defense.sampleScript}"
                      </p>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => triggerAiWithCommand('/defend-step')}
                        className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg transition-all"
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span>Practice Verbal Defense with AI Coach</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Embedded Socratic Systems Mentor Drawer */}
      <UniversalAiAssistant
        isOpen={isAiMentorOpen}
        onClose={() => setIsAiMentorOpen(false)}
        contextType="liveops"
        initialCommand={aiInitialCommand}
        liveOpsContext={{
          questId: activeQuest.id,
          questTitle: activeQuest.title,
          challengeId: activeChallenge.id,
          challengeTitle: activeChallenge.title,
          targetFile: activeChallenge.targetFile
        }}
      />
    </div>
  );
}
