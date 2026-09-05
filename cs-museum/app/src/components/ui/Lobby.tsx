import React, { useEffect } from 'react';
import { useMuseumStore } from '../../store/useMuseumStore';
import { Database, Cpu, Network, Lock, Zap, FileJson } from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Database, Zap, Lock, Cpu, Network, default: FileJson
};

export const Lobby: React.FC = () => {
  const { manifest, fetchManifest, enterExhibit } = useMuseumStore();

  useEffect(() => {
    if (!manifest) fetchManifest();
  }, [manifest, fetchManifest]);

  if (!manifest) {
    return <div className="absolute inset-0 flex items-center justify-center text-white bg-[#050505]">Loading Manifest...</div>;
  }

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#050505]/95 backdrop-blur-sm p-8 overflow-y-auto">
      <div className="max-w-4xl w-full">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-light tracking-tighter text-white mb-4">
            Spatial <span className="font-medium text-cyan-400">Cognitive Engine</span>
          </h1>
          <p className="text-slate-400 text-lg font-light tracking-wide max-w-2xl mx-auto mb-2">
            A curated interactive ontology of computer science.
          </p>
          <div className="text-xs font-mono text-cyan-600/50">
            ONTOLOGY V{manifest.version} • {manifest.metrics.total_concepts} CONCEPTS • {manifest.metrics.total_edges} EDGES
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {manifest.clusters.map((cluster: any) => {
            const Icon = ICON_MAP[cluster.icon] || ICON_MAP.default;
            return (
              <button
                key={cluster.id}
                onClick={() => enterExhibit(cluster.id)}
                className="group relative flex flex-col items-start p-6 text-left border border-white/10 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
                <Icon className="w-8 h-8 text-cyan-400 mb-4 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                <h2 className="text-xl font-medium text-slate-200 mb-2">{cluster.name}</h2>
                <div className="flex items-center space-x-2 text-sm text-slate-500 font-mono">
                  <span>Explore Cluster</span>
                  <span>→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
