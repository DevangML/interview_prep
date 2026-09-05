import { useCallback, useEffect, useState } from 'react';
import { Canvas, extend, useThree, type GLProps, type ThreeToJSXElements } from '@react-three/fiber';
import * as THREE from 'three/webgpu';
import { ExhibitGraph } from './ExhibitGraph';
import { useMuseumStore } from '../../store/useMuseumStore';

declare module '@react-three/fiber' {
  interface ThreeElements extends ThreeToJSXElements<typeof THREE> {}
}

extend(THREE as never);

function isWebGpuBackend(gl: unknown): boolean {
  const backend = (gl as { backend?: { isWebGPUBackend?: boolean } }).backend;
  return Boolean(backend?.isWebGPUBackend);
}

const BackendReporter = ({ onReady }: { onReady: (webgpu: boolean) => void }) => {
  const gl = useThree((s) => s.gl);

  useEffect(() => {
    onReady(isWebGpuBackend(gl));
  }, [gl, onReady]);

  return null;
};

export const MuseumCanvas: React.FC = () => {
  const clearSelection = useMuseumStore((s) => s.clearSelection);
  const [webgpu, setWebgpu] = useState<boolean | null>(null);

  const createRenderer = useCallback(async (props: { canvas: HTMLCanvasElement }) => {
    const renderer = new THREE.WebGPURenderer({
      canvas: props.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    await renderer.init();
    return renderer as never;
  }, []);

  const onBackendReady = useCallback((next: boolean) => {
    setWebgpu(next);
  }, []);

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 140, 65], fov: 45 }}
        gl={createRenderer as GLProps}
        dpr={[1, 1.5]}
        onPointerMissed={() => clearSelection()}
      >
        <BackendReporter onReady={onBackendReady} />
        <ExhibitGraph />
      </Canvas>

      {webgpu !== null && (
        <div className="absolute bottom-4 left-4 z-50 pointer-events-none">
          <div
            className={`px-3 py-1.5 rounded-full border backdrop-blur-md text-xs font-bold tracking-widest uppercase shadow-lg flex items-center space-x-2 ${
              webgpu
                ? 'bg-emerald-900/40 border-emerald-500/30 text-emerald-300'
                : 'bg-amber-900/40 border-amber-500/30 text-amber-200'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${webgpu ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`} />
            <span>{webgpu ? 'WebGPU' : 'WebGL 2 fallback'}</span>
          </div>
        </div>
      )}
    </div>
  );
};
