import React from 'react';
import { Canvas } from '@react-three/fiber';
import { ExhibitGraph } from './ExhibitGraph';
import { useMuseumStore } from '../../store/useMuseumStore';

export const MuseumCanvas: React.FC = () => {
  const clearSelection = useMuseumStore(s => s.clearSelection);

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 140, 65], fov: 45 }}
        gl={{ 
          antialias: false, // Turn off native AA, relying on postprocessing or nothing to save massive VRAM
          alpha: true,
          powerPreference: "high-performance", // Force discrete GPU if available
          preserveDrawingBuffer: true
        }}
        dpr={[1, 1.5]} // Cap device pixel ratio at 1.5. 2+ on 4K macbooks eats all VRAM causing Context Loss.
        onPointerMissed={() => clearSelection()}
      >
        <ExhibitGraph />
      </Canvas>
    </div>
  );
};
