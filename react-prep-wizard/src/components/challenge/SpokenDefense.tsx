import { useEffect, useRef, useState } from 'react';
import { Mic, Square, Play, RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  /** The model answer to defend against. */
  pitch: string;
  /** Resets the take when the unit changes. */
  unitId: string;
  /** Seconds. An interview answer that runs long is a worse answer. */
  limit?: number;
}

/**
 * The Spoken Defense was a paragraph on a page. Reading a pitch is not
 * rehearsing it — the round it prepares you for is performed out loud, once,
 * under a clock, with someone watching.
 *
 * So: record a take, hear it back, compare it to the model answer. Audio never
 * leaves the browser — it is an object URL, discarded on unmount.
 */
export default function SpokenDefense({ pitch, unitId, limit = 60 }: Props) {
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [takeUrl, setTakeUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  // A take belongs to the unit it was recorded for.
  useEffect(() => {
    setTakeUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return null; });
    setElapsed(0);
    setRevealed(false);
    setError(null);
  }, [unitId]);

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    if (takeUrl) URL.revokeObjectURL(takeUrl);
  }, [takeUrl]);

  useEffect(() => {
    if (!recording) return;
    const t = setInterval(() => setElapsed((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, [recording]);

  // Hard stop at the limit — rambling past a minute is the failure mode.
  useEffect(() => {
    if (recording && elapsed >= limit) stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsed, recording, limit]);

  const start = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => { if (e.data.size) chunksRef.current.push(e.data); };
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setTakeUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return URL.createObjectURL(blob); });
        stream.getTracks().forEach((t) => t.stop());
      };
      recorderRef.current = rec;
      rec.start();
      setElapsed(0);
      setRecording(true);
    } catch {
      setError('Microphone unavailable — allow access, or rehearse out loud without recording. Saying it aloud is the part that matters.');
    }
  };

  const stop = () => {
    recorderRef.current?.stop();
    recorderRef.current = null;
    setRecording(false);
  };

  const over = elapsed > limit * 0.8;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        {!recording ? (
          <button
            onClick={start}
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 shadow-sm"
          >
            <Mic size={13} /> {takeUrl ? 'Record again' : `Record your answer · ${limit}s`}
          </button>
        ) : (
          <button
            onClick={stop}
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-500 text-white flex items-center gap-1.5 animate-pulse"
          >
            <Square size={13} /> Stop
          </button>
        )}

        {(recording || elapsed > 0) && (
          <span className={`font-mono text-xs tabular-nums px-2 py-1 rounded border ${
            over ? 'bg-red-50 border-red-200 text-red-700' : 'bg-slate-100 border-slate-200 text-slate-600'
          }`}>
            {String(Math.floor(elapsed / 60)).padStart(2, '0')}:{String(elapsed % 60).padStart(2, '0')} / {limit}s
          </span>
        )}

        {takeUrl && (
          <>
            <audio src={takeUrl} controls className="h-8" />
            <button
              onClick={() => { URL.revokeObjectURL(takeUrl); setTakeUrl(null); setElapsed(0); }}
              title="Discard this take"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <RotateCcw size={13} />
            </button>
          </>
        )}
      </div>

      {error && (
        <p className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-2 flex items-start gap-1.5">
          <AlertTriangle size={13} className="mt-0.5 shrink-0" /> {error}
        </p>
      )}

      {/* The model answer stays hidden until a take exists. Reading it first is
          recognition; producing it first is recall, and only one of them is
          what the room asks for. */}
      {revealed || takeUrl ? (
        <div className="text-[14px] text-purple-900 bg-purple-50/50 border border-purple-100/80 p-4 rounded-xl italic leading-relaxed shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-purple-400" />
          "{pitch}"
        </div>
      ) : (
        <button
          onClick={() => setRevealed(true)}
          className="w-full text-left text-[12px] text-slate-500 bg-slate-50 border border-dashed border-slate-300 p-3 rounded-xl hover:border-slate-400 flex items-center gap-2"
        >
          <Play size={12} /> Answer out loud first — then reveal the model pitch to compare.
        </button>
      )}
    </div>
  );
}
