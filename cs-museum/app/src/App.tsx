import React, { Suspense, use } from 'react';
import { useMuseumStore } from './store/useMuseumStore';
import { Overlay } from './components/ui/Overlay';
import { MuseumCanvas } from './components/canvas/MuseumCanvas';

// React 19: Use the new `use()` hook for promise unwrapping in Suspense boundaries
const TowerLoader = () => {
  const { fetchTower, towerData } = useMuseumStore();
  
  // If data isn't loaded yet, trigger the fetch. 
  // In a full React 19 concurrent app, we'd wrap fetchTower in a suspense cache, 
  // but triggering it inside rendering is a pattern unlocked by React 19's use().
  if (!towerData) {
    throw fetchTower(); // Suspend rendering until fetch resolves
  }

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#050505]">
      <MuseumCanvas />
      <Overlay />
    </main>
  );
};

function App() {
  return (
    <Suspense fallback={
      <div className="absolute inset-0 flex items-center justify-center bg-[#050505] text-cyan-400 font-mono text-xl tracking-widest">
        INITIALIZING SPATIAL COGNITIVE ENGINE...
      </div>
    }>
      <TowerLoader />
    </Suspense>
  );
}

export default App;
