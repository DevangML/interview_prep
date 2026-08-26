import React, { useState, useEffect } from 'react';
import {
  Network,
  Link as LinkIcon,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
  Layers,
  Edit3,
  Play,
  RotateCcw
} from 'lucide-react';
import type { LearnTopic } from '../../../data/learn';
import {
  loadTopicDiagram,
  saveTopicDiagram,
  attachDiagramLink,
  subscribeToDiagramSync
} from '../../../lib/diagram/diagramStorage';
import { getDefaultDiagramForTopic } from '../../../lib/diagram/diagramTemplates';
import type { TopicDiagramState } from '../../../lib/diagram/diagramTypes';
import DrawIoEmbedEditor from './DrawIoEmbedEditor';
import DrawAiAgentModal from './DrawAiAgentModal';
import RestingDiagramStudio from './RestingDiagramStudio';

interface Props {
  topic: LearnTopic;
  chatWithMentor?: (params: any) => Promise<string | null>;
  isAiReady?: boolean;
}

export default function TopicDiagramSection({
  topic,
  chatWithMentor,
  isAiReady
}: Props) {
  const [diagramState, setDiagramState] = useState<TopicDiagramState>(() =>
    loadTopicDiagram(topic.id, topic.title)
  );
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCanvasActive, setIsCanvasActive] = useState(false);
  const [inputUrl, setInputUrl] = useState(diagramState.rawUrl || '');
  const [isEditingLink, setIsEditingLink] = useState(false);
  const [isAiAgentOpen, setIsAiAgentOpen] = useState(false);

  // Reload state when topic changes
  useEffect(() => {
    const loaded = loadTopicDiagram(topic.id, topic.title);
    setDiagramState(loaded);
    setInputUrl(loaded.rawUrl || '');
    setIsCanvasActive(Boolean(loaded.rawUrl || loaded.isCustomized));
  }, [topic.id, topic.title]);

  // Sync across tabs
  useEffect(() => {
    return subscribeToDiagramSync((syncedTopicId) => {
      if (syncedTopicId === topic.id) {
        setDiagramState(loadTopicDiagram(topic.id, topic.title));
      }
    });
  }, [topic.id, topic.title]);

  const handleSaveXml = (newXml: string) => {
    const updated: TopicDiagramState = {
      ...diagramState,
      xmlData: newXml,
      lastUpdated: Date.now(),
      isCustomized: true
    };
    setDiagramState(updated);
    saveTopicDiagram(updated);
  };

  const handleAttachLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    const updated = attachDiagramLink(topic.id, topic.title, inputUrl.trim());
    setDiagramState(updated);
    setIsEditingLink(false);
    setIsCanvasActive(true);
  };

  const handleResetToTemplate = () => {
    const defaultXml = getDefaultDiagramForTopic(topic.id, topic.title);
    const resetState: TopicDiagramState = {
      topicId: topic.id,
      title: topic.title,
      sourceType: 'template',
      rawUrl: undefined,
      gdriveFileId: undefined,
      xmlData: defaultXml,
      lastUpdated: Date.now(),
      isCustomized: false
    };
    setDiagramState(resetState);
    setInputUrl('');
    setIsEditingLink(false);
    saveTopicDiagram(resetState);
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/80 overflow-hidden shadow-lg space-y-0 min-w-0 font-sans">
      {/* Section Header */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex-wrap gap-2.5 min-w-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-xl bg-sky-950 text-sky-400 border border-sky-800/80 shadow-sm shrink-0">
            <Network size={18} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <h2 className="text-sm font-bold text-slate-100 truncate">Architecture & Concept Diagram</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                {isCanvasActive ? 'Live Canvas' : 'Resting Studio'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate mt-0.5">
              Interactive draw.io editor with Google Drive attachment & Draw AI Agent
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isCanvasActive && (
            <button
              onClick={() => setIsCanvasActive(false)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
              title="Return to Studio View"
            >
              Resting Mode
            </button>
          )}

          <button
            onClick={() => setIsAiAgentOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:scale-105 transition cursor-pointer shrink-0"
          >
            <Sparkles size={14} />
            <span>Draw AI Agent</span>
          </button>

          <button
            onClick={() => setIsExpanded(prev => !prev)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-4">
          {!isCanvasActive ? (
            /* Animated Resting State Studio */
            <RestingDiagramStudio
              topic={topic}
              onLaunchCanvas={() => setIsCanvasActive(true)}
              onOpenLinkModal={() => {
                setIsCanvasActive(true);
                setIsEditingLink(true);
              }}
              onOpenAiAgent={() => setIsAiAgentOpen(true)}
            />
          ) : (
            /* Active Canvas & Link Toolbar */
            <div className="space-y-4 animate-in fade-in-50 duration-200">
              {/* Link Attachment Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-300 flex-1 min-w-[280px]">
                  <LinkIcon size={14} className="text-sky-400 shrink-0" />
                  {isEditingLink ? (
                    <form onSubmit={handleAttachLink} className="flex items-center gap-2 flex-1">
                      <input
                        type="text"
                        value={inputUrl}
                        onChange={e => setInputUrl(e.target.value)}
                        placeholder="Paste Google Drive link, Draw.io share URL, or raw XML..."
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-sky-400"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Check size={13} /> Save Link
                      </button>
                    </form>
                  ) : (
                    <div className="flex items-center gap-2 flex-1 truncate">
                      <span className="text-slate-400">Attached Diagram:</span>
                      <span className="font-mono text-sky-300 truncate max-w-md">
                        {diagramState.rawUrl || (diagramState.gdriveFileId ? `GDrive: ${diagramState.gdriveFileId}` : 'Topic Starter Architecture')}
                      </span>
                    </div>
                  )}
                </div>

                {!isEditingLink && (
                  <button
                    onClick={() => setIsEditingLink(true)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition cursor-pointer shrink-0"
                  >
                    {diagramState.rawUrl ? 'Edit Link' : 'Attach Link / GDrive'}
                  </button>
                )}
              </div>

              {/* Embedded Draw.io Editor */}
              <DrawIoEmbedEditor
                xmlData={diagramState.xmlData}
                topicTitle={topic.title}
                gdriveId={diagramState.gdriveFileId}
                onSaveXml={handleSaveXml}
                onResetTemplate={handleResetToTemplate}
              />
            </div>
          )}
        </div>
      )}

      {/* Draw AI Agent Modal */}
      <DrawAiAgentModal
        isOpen={isAiAgentOpen}
        onClose={() => setIsAiAgentOpen(false)}
        topic={topic}
        xmlData={diagramState.xmlData}
        onApplyXml={handleSaveXml}
        chatWithMentor={chatWithMentor}
        isAiReady={isAiReady}
      />
    </section>
  );
}
