import { useEffect, useRef, useState, useCallback } from 'react';
import { Maximize2, Minimize2, ExternalLink, Download, RefreshCw, CheckCircle2, Eye, Edit3 } from 'lucide-react';
import { buildDrawIoEmbedUrl, buildGoogleDrivePreviewUrl, buildDrawIoGoogleDriveUrl } from '../../../lib/diagram/diagramUtils';

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
  const [activeViewMode, setActiveViewMode] = useState<'editor' | 'gdrive_preview'>('editor');

  const embedUrl = buildDrawIoEmbedUrl({
    xmlData,
    gdriveId,
    ui: 'min',
    darkMode: true
  });

  const gdrivePreviewUrl = gdriveId ? buildGoogleDrivePreviewUrl(gdriveId) : null;

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
        if (msg.event === 'configure') {
          setIsEditorLoaded(true);
          sendToIframe({
            action: 'configure',
            config: {
              defaultFonts: ['system-ui', 'sans-serif'],
              darkMode: true
            }
          });
        } else if (msg.event === 'init') {
          setIsEditorLoaded(true);
          // Only send custom XML load if NOT loading directly from Google Drive anchor (#G)
          if (!gdriveId) {
            sendToIframe({
              action: 'load',
              xml: xmlData,
              title: topicTitle,
              autosave: 1
            });
          }
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

    // Timeout safety fallback: Never leave user stuck on loading spinner
    const safetyTimer = setTimeout(() => {
      setIsEditorLoaded(true);
      if (!gdriveId) {
        sendToIframe({
          action: 'load',
          xml: xmlData,
          title: topicTitle,
          autosave: 1
        });
      }
    }, 1200);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(safetyTimer);
    };
  }, [xmlData, topicTitle, gdriveId, onSaveXml, sendToIframe]);

  const handleIframeLoad = () => {
    setTimeout(() => {
      setIsEditorLoaded(true);
      if (!gdriveId) {
        sendToIframe({
          action: 'load',
          xml: xmlData,
          title: topicTitle,
          autosave: 1
        });
      }
    }, 400);
  };

  const handleReset = () => {
    if (onResetTemplate) {
      onResetTemplate();
    }
  };

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
    if (gdriveId) {
      window.open(buildDrawIoGoogleDriveUrl(gdriveId), '_blank', 'noopener,noreferrer');
    } else {
      window.open(`https://app.diagrams.net/`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`flex flex-col rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'fixed inset-4 z-50 shadow-2xl ring-2 ring-sky-500/50' : 'h-[460px] lg:h-[500px] max-h-[55vh] w-full'
      }`}
    >
      {/* Editor Header Toolbar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900 border-b border-slate-800 text-xs flex-wrap gap-2 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="font-bold text-slate-200 truncate">
            {activeViewMode === 'gdrive_preview' ? 'Google Drive Viewer' : gdriveId ? 'GDrive Draw.io Canvas' : 'Draw.io Embedded Canvas'}
          </span>
          {isSavedRecently && (
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/30 shrink-0">
              <CheckCircle2 size={12} /> Auto-Saved
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {gdrivePreviewUrl && (
            <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 shrink-0">
              <button
                onClick={() => setActiveViewMode('editor')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition flex items-center gap-1 cursor-pointer ${
                  activeViewMode === 'editor' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Edit3 size={11} /> Editor
              </button>
              <button
                onClick={() => setActiveViewMode('gdrive_preview')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition flex items-center gap-1 cursor-pointer ${
                  activeViewMode === 'gdrive_preview' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye size={11} /> Drive View
              </button>
            </div>
          )}

          {onResetTemplate && (
            <button
              onClick={handleReset}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium flex items-center gap-1 transition cursor-pointer"
              title="Reset to Starter Template / Start Over"
            >
              <RefreshCw size={12} /> Start Over
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
            title={gdriveId ? 'Open connected diagram in diagrams.net' : 'Open standalone draw.io'}
          >
            <ExternalLink size={12} /> {gdriveId ? 'Open in Diagrams.net' : 'Pop Out'}
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

      {/* Embedded Viewport */}
      <div className="relative flex-1 w-full bg-slate-950">
        {activeViewMode === 'gdrive_preview' && gdrivePreviewUrl ? (
          <iframe
            src={gdrivePreviewUrl}
            title="Google Drive Document Preview"
            className="w-full h-full border-none bg-slate-950"
            allow="autoplay"
          />
        ) : (
          <>
            {!isEditorLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/95 text-slate-400 text-xs z-10">
                <div className="flex items-center gap-2.5 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
                  <div className="w-4 h-4 border-2 border-sky-400 border-t-transparent rounded-full animate-spin shrink-0" />
                  <span className="font-mono text-slate-200">
                    {gdriveId ? 'Loading Google Drive Drawing...' : 'Connecting Embedded Draw.io Engine...'}
                  </span>
                </div>
              </div>
            )}
            <iframe
              key={embedUrl}
              ref={iframeRef}
              src={embedUrl}
              onLoad={handleIframeLoad}
              title="Draw.io Embedded Diagram Editor"
              className="w-full h-full border-none bg-slate-950"
              allow="clipboard-read; clipboard-write"
            />
          </>
        )}
      </div>
    </div>
  );
}
