import { useEffect, useRef, useState, useCallback } from 'react';
import { Maximize2, Minimize2, ExternalLink, Download, RefreshCw, CheckCircle2 } from 'lucide-react';
import { buildDrawIoEmbedUrl } from '../../../lib/diagram/diagramUtils';

interface Props {
  xmlData: string;
  topicTitle: string;
  gdriveId?: string;
  onSaveXml: (updatedXml: string) => void;
  onResetTemplate?: () => void;
}

export default function DrawIoEmbedEditor({
  xmlData,
  topicTitle,
  gdriveId,
  onSaveXml,
  onResetTemplate
}: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSavedRecently, setIsSavedRecently] = useState(false);
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);

  const embedUrl = buildDrawIoEmbedUrl({
    xmlData,
    gdriveId,
    ui: 'min',
    darkMode: true
  });

  const sendToIframe = useCallback((message: object) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(JSON.stringify(message), '*');
    }
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== 'string') return;

      try {
        const msg = JSON.parse(event.data);
        if (msg.event === 'init') {
          setIsEditorLoaded(true);
          sendToIframe({ action: 'load', xml: xmlData, title: topicTitle });
        } else if (msg.event === 'save' || msg.event === 'autosave') {
          if (msg.xml) {
            onSaveXml(msg.xml);
            setIsSavedRecently(true);
            setTimeout(() => setIsSavedRecently(false), 2500);
          }
        }
      } catch {
        // Not a JSON draw.io message
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [xmlData, topicTitle, onSaveXml, sendToIframe]);

  // Export / Download local XML file
  const handleDownloadXml = () => {
    const blob = new Blob([xmlData], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${topicTitle.replace(/[^a-zA-Z0-9]/g, '_')}_diagram.drawio.xml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleOpenExternal = () => {
    window.open(`https://app.diagrams.net/`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`flex flex-col rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'fixed inset-4 z-50 shadow-2xl ring-2 ring-sky-500/50' : 'h-[540px] w-full'
      }`}
    >
      {/* Editor Header Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-200">Draw.io Embedded Canvas</span>
          {isSavedRecently && (
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/30">
              <CheckCircle2 size={12} /> Auto-Saved
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {onResetTemplate && (
            <button
              onClick={onResetTemplate}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium flex items-center gap-1 transition cursor-pointer"
              title="Reset to Starter Template"
            >
              <RefreshCw size={12} /> Reset
            </button>
          )}

          <button
            onClick={handleDownloadXml}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium flex items-center gap-1 transition cursor-pointer"
            title="Download XML"
          >
            <Download size={12} /> Export
          </button>

          <button
            onClick={handleOpenExternal}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium flex items-center gap-1 transition cursor-pointer"
            title="Open standalone draw.io"
          >
            <ExternalLink size={12} /> Pop Out
          </button>

          <button
            onClick={() => setIsFullscreen(prev => !prev)}
            className="px-2.5 py-1 rounded-lg bg-sky-950 hover:bg-sky-900 border border-sky-800/80 text-sky-300 text-[11px] font-medium flex items-center gap-1 transition cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>

      {/* Embedded IFrame */}
      <div className="relative flex-1 w-full bg-slate-950">
        {!isEditorLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950 text-slate-400 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
              <span>Initializing Embedded Draw.io Engine...</span>
            </div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title="Draw.io Embedded Diagram Editor"
          className="w-full h-full border-none bg-slate-950"
          allow="clipboard-read; clipboard-write"
        />
      </div>
    </div>
  );
}
