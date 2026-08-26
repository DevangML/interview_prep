import { useState, useMemo, useEffect } from 'react';
import TopicNav from '../components/learn/TopicNav';
import TopicReader from '../components/learn/TopicReader';
import { SkillTreeHUD } from '../components/learn/SkillTreeHUD';
import { VisualSkillTreeCanvas } from '../components/learn/VisualSkillTreeCanvas';
import { TrackSelectorBar } from '../components/learn/TrackSelectorBar';
import PaneBoundary from '../components/layout/PaneBoundary';
import { LEARN_TOPICS, learnCoverage } from '../data/learn';
import { getTopicsForTrack, ROADMAP_TRACKS } from '../data/learn/extended/trackRegistry';
import type { RoadmapTrackId } from '../data/learn/extended/types';
import type { LearnTopic } from '../data/learn';
import UniversalAiAssistant from '../components/socratic/UniversalAiAssistant';
import { useSocraticAi } from '../hooks/useSocraticAi';
import { Bot } from 'lucide-react';

const READ_KEY = 'learn:read';
const DUELS_KEY = 'learn:duels';

function loadStorage(key: string): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch { return {}; }
}

export default function LearnPage() {
  const [activeTrackId, setActiveTrackId] = useState<RoadmapTrackId>('core');
  const [activeId, setActiveId] = useState<string>(LEARN_TOPICS[0]?.id ?? '');
  const [read, setRead] = useState<Record<string, boolean>>(() => loadStorage(READ_KEY));
  const [duels, setDuels] = useState<Record<string, boolean>>(() => loadStorage(DUELS_KEY));
  const [viewMode, setViewMode] = useState<'reader' | 'graph'>('reader');
  const [comboStreak, setComboStreak] = useState(0);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [pendingCommand, setPendingCommand] = useState<string | null>(null);

  const { isReady, chatWithMentor } = useSocraticAi();

  const handleOpenAi = (cmd?: string) => {
    setPendingCommand(cmd || null);
    setIsAiAssistantOpen(true);
  };

  useEffect(() => {
    const handleToggle = () => setIsAiAssistantOpen(prev => !prev);
    window.addEventListener('toggle-universal-ai', handleToggle);
    return () => window.removeEventListener('toggle-universal-ai', handleToggle);
  }, []);

  const { topics: currentTrackTopics } = useMemo(() => getTopicsForTrack(activeTrackId), [activeTrackId]);

  const topic = useMemo(() => {
    return currentTrackTopics.find(t => t.id === activeId) || currentTrackTopics[0] || LEARN_TOPICS[0];
  }, [currentTrackTopics, activeId]);

  const index = currentTrackTopics.findIndex((t) => t.id === topic.id);
  const prev = index > 0 ? currentTrackTopics[index - 1] : null;
  const next = index >= 0 && index < currentTrackTopics.length - 1 ? currentTrackTopics[index + 1] : null;

  const stats = useMemo(() => learnCoverage(), []);
  const readCount = useMemo(() => Object.values(read).filter(Boolean).length, [read]);
  const duelsCount = useMemo(() => Object.values(duels).filter(Boolean).length, [duels]);
  const totalKnowledgeXp = useMemo(() => (readCount * 25) + (duelsCount * 50), [readCount, duelsCount]);
  const comboMultiplier = Math.min(4, Math.floor(comboStreak / 2) + 1);

  const select = (t: LearnTopic) => {
    setActiveId(t.id);
    document.getElementById('learn-reader')?.scrollTo({ top: 0 });
  };

  const toggleRead = () => {
    const updated = { ...read, [topic.id]: !read[topic.id] };
    setRead(updated);
    try { localStorage.setItem(READ_KEY, JSON.stringify(updated)); } catch { /* full */ }
  };

  const passDuel = (topicId: string, _earnedXp: number, wasCorrect: boolean) => {
    if (wasCorrect) {
      setComboStreak((s) => s + 1);
      const updated = { ...duels, [topicId]: true };
      setDuels(updated);
      try { localStorage.setItem(DUELS_KEY, JSON.stringify(updated)); } catch { /* full */ }
    } else {
      setComboStreak(0);
    }
  };

  const activeTrackObj = useMemo(() => ROADMAP_TRACKS.find(t => t.id === activeTrackId), [activeTrackId]);

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-slate-950 relative">
      <SkillTreeHUD
        totalTopics={currentTrackTopics.length}
        readCount={readCount}
        duelsPassedCount={duelsCount}
        totalKnowledgeXp={totalKnowledgeXp}
        missingInSyllabusCount={stats.missing}
        comboStreak={comboStreak}
        comboMultiplier={comboMultiplier}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
      />

      <TrackSelectorBar
        activeTrackId={activeTrackId}
        onSelectTrack={(trackId) => {
          setActiveTrackId(trackId);
          const { topics } = getTopicsForTrack(trackId);
          if (topics.length > 0) setActiveId(topics[0].id);
        }}
      />

      <main className="grid grid-cols-1 lg:grid-cols-[20rem_1fr] gap-2 p-2 flex-1 min-h-0">
        <PaneBoundary name="The topic navigator">
          <TopicNav activeId={topic.id} read={read} topics={currentTrackTopics} onSelect={select} />
        </PaneBoundary>

        <PaneBoundary name="The interactive reader or skill graph">
          {viewMode === 'graph' ? (
            <VisualSkillTreeCanvas
              topics={currentTrackTopics}
              activeId={topic.id}
              read={read}
              duels={duels}
              onSelect={select}
              onReadLesson={() => setViewMode('reader')}
            />
          ) : (
            <div id="learn-reader" className="h-full overflow-y-auto rounded-xl border border-slate-800 bg-slate-900 text-slate-100 custom-scrollbar">
              {topic && (
                <TopicReader
                  topic={topic}
                  isRead={Boolean(read[topic.id])}
                  isDuelPassed={Boolean(duels[topic.id])}
                  comboStreak={comboStreak}
                  onToggleRead={toggleRead}
                  onPassDuel={passDuel}
                  prev={prev}
                  next={next}
                  onGo={select}
                  onOpenAi={handleOpenAi}
                  chatWithMentor={chatWithMentor}
                  isAiReady={isReady}
                />
              )}
            </div>
          )}
        </PaneBoundary>
      </main>

      {/* Floating AI Assistant Trigger Button */}
      <button
        onClick={() => handleOpenAi('/breakdown')}
        className="fixed bottom-5 right-5 z-40 px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-2xl hover:scale-105 transition-all cursor-pointer border border-sky-400/40"
        title="Open AI Socratic Mentor"
      >
        <Bot size={16} />
        <span>Ask AI Oracle</span>
      </button>

      {/* Universal AI Assistant Drawer */}
      <UniversalAiAssistant
        isOpen={isAiAssistantOpen}
        onClose={() => {
          setIsAiAssistantOpen(false);
          setPendingCommand(null);
        }}
        initialCommand={pendingCommand}
        contextType="roadmap"
        roadmapContext={{
          trackId: activeTrackId,
          trackName: activeTrackObj?.name,
          topicId: topic.id,
          topicTitle: topic.title,
          topicSummary: topic.summary,
          area: topic.area,
          keyPoints: topic.keyPoints
        }}
        chatWithMentor={chatWithMentor}
        isAiReady={isReady}
      />
    </div>
  );
}

