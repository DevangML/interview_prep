import React from 'react';
import { useMuseumStore } from '../../store/useMuseumStore';
import { Box, MousePointer2 } from 'lucide-react';

export const Overlay: React.FC = () => {
  const { activeConceptId, activeEdgeId, towerData, currentView, toggleView, cameraMode, toggleCameraMode } = useMuseumStore();

  const activeNodeData = React.useMemo(() => {
    if (!towerData || !activeConceptId) return null;
    return towerData.nodes.find(n => n.id === activeConceptId);
  }, [towerData, activeConceptId]);

  const activeEdgeData = React.useMemo(() => {
    if (!towerData || !activeEdgeId) return null;
    return towerData.edges.find((e: any) => e.id === activeEdgeId);
  }, [towerData, activeEdgeId]);

  const edgeSourceNode = activeEdgeData ? towerData?.nodes.find(n => n.id === activeEdgeData.source) : null;
  const edgeTargetNode = activeEdgeData ? towerData?.nodes.find(n => n.id === activeEdgeData.target) : null;

  const themeColor = activeNodeData?.color || activeEdgeData?.color || '#38bdf8';
  
  return (
    <div className="absolute inset-0 z-10 pointer-events-none p-6 md:p-8 flex flex-col justify-between font-sans">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between pointer-events-auto">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-3xl shadow-xl">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center space-x-3">
            <span className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 animate-pulse" />
            <span>Spatial Cognitive Engine</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium mt-1 ml-7 uppercase tracking-widest">
            {currentView === 'bedrock' ? 'The Bedrock-to-Top Architecture' : 'Programming Layer Deep-Dive'}
          </p>
        </div>
        
        {/* The View Switchers */}
        <div className="flex space-x-4">
          <button 
            onClick={toggleCameraMode}
            className={`backdrop-blur-md border border-white/20 px-6 py-3 rounded-full font-bold tracking-wide transition-all duration-300 shadow-xl flex items-center space-x-2 ${
              cameraMode === 'scroll' 
                ? 'bg-fuchsia-900/20 hover:bg-fuchsia-900/40 text-fuchsia-100' 
                : 'bg-emerald-900/20 hover:bg-emerald-900/40 text-emerald-100 border-emerald-500/30'
            }`}
          >
            {cameraMode === 'scroll' ? <Box className="w-5 h-5" /> : <MousePointer2 className="w-5 h-5" />}
            <span>{cameraMode === 'scroll' ? 'Enter Free 3D Orbit' : 'Lock to 2D Scroll'}</span>
          </button>

          <button 
            onClick={toggleView}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-bold tracking-wide transition-all duration-300 shadow-xl"
          >
            {currentView === 'bedrock' ? 'Switch to Programming Deep-Dive \u2192' : '\u2190 Back to Full Architecture'}
          </button>
        </div>
      </div>

      {/* Main HUD */}
      <div className="max-w-xl pointer-events-auto max-h-[80vh] overflow-y-auto no-scrollbar pb-10 pr-4">
        {activeEdgeData && edgeSourceNode && edgeTargetNode ? (
          <div 
            className="backdrop-blur-3xl p-8 rounded-[2rem] shadow-2xl transition-all duration-500 ease-out"
            style={{ backgroundColor: `${themeColor}15`, border: `1px solid ${themeColor}40` }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <span 
                className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm"
                style={{ backgroundColor: themeColor, color: '#000' }}
              >
                Deep Dependency
              </span>
            </div>
            
            <h3 className="text-3xl font-semibold text-white mb-2 tracking-tight flex items-center flex-wrap gap-2">
              <span>{edgeSourceNode.label}</span>
              <span style={{ color: themeColor }} className="mx-2">&rarr;</span>
              <span>{edgeTargetNode.label}</span>
            </h3>
            
            <div 
              className="inline-block px-4 py-2 rounded-xl text-sm font-medium mb-6"
              style={{ backgroundColor: `${themeColor}20`, color: themeColor }}
            >
              &darr; {activeEdgeData.label}
            </div>
            
            <div className="space-y-4">
              {activeEdgeData.details?.map((point: string, idx: number) => (
                <div key={idx} className="flex items-start space-x-4 bg-white/5 p-4 rounded-2xl">
                  <div className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: themeColor }} />
                  <p className="text-slate-200 text-base leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        ) : activeNodeData ? (
          <div 
            className="backdrop-blur-3xl p-8 rounded-[2.5rem] shadow-2xl transition-all duration-500 ease-out"
            style={{ backgroundColor: `${themeColor}15`, border: `1px solid ${themeColor}40` }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <span 
                className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm"
                style={{ backgroundColor: themeColor, color: '#000' }}
              >
                {activeNodeData.layerId || 'Macro Layer'}
              </span>
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/10 uppercase">
                {activeNodeData.shape}
              </span>
            </div>
            
            <h3 className="text-4xl font-bold text-white mb-8 tracking-tight">{activeNodeData.label}</h3>
            
            {activeNodeData.details && (
              <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                  <h4 className="text-sm font-bold mb-2 uppercase tracking-widest" style={{ color: themeColor }}>What is it?</h4>
                  <p className="text-slate-100 text-base leading-relaxed">{activeNodeData.details.definition}</p>
                </div>
                
                <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                  <h4 className="text-sm font-bold mb-2 uppercase tracking-widest" style={{ color: themeColor }}>Motivation / Why?</h4>
                  <p className="text-slate-100 text-base leading-relaxed">{activeNodeData.details.motivation}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                    <h4 className="text-xs font-bold mb-2 uppercase tracking-widest text-slate-400">Origin / Concept</h4>
                    <p className="text-slate-200 text-sm leading-relaxed">{activeNodeData.details.origin}</p>
                  </div>
                  <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                    <h4 className="text-xs font-bold mb-2 uppercase tracking-widest text-slate-400">First Principles</h4>
                    <p className="text-slate-200 text-sm leading-relaxed">{activeNodeData.details.first_principles}</p>
                  </div>
                </div>

                <div 
                  className="p-6 rounded-3xl border"
                  style={{ backgroundColor: `${themeColor}10`, borderColor: `${themeColor}30` }}
                >
                  <h4 className="text-sm font-bold mb-2 uppercase tracking-widest" style={{ color: themeColor }}>Empowers / Implementations</h4>
                  <p className="text-white text-base font-medium leading-relaxed">{activeNodeData.details.empowers}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-5 rounded-[2rem] shadow-xl inline-flex items-center space-x-4 transition-all duration-300">
            <div className="w-10 h-10 rounded-full border-2 border-slate-500/50 border-t-cyan-400 animate-spin" />
            <span className="text-slate-300 text-sm font-medium tracking-wide">
              {cameraMode === 'scroll' ? 'Select a 3D construct to inspect...' : 'Orbit mode active. Click any construct to inspect...'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
