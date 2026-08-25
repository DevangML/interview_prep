import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import './index.css';
import App from './App';
import PaneBoundary from './components/layout/PaneBoundary';
import { AuthProvider } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage';

/**
 * Routes are split because they do not share a working set. The Mastery stream
 * pulls in every drill, every lesson and the whole editor; Rapid Fire needs a
 * question bank and nothing else. Loading one should not pay for the other —
 * before this, opening Rapid Fire parsed all 108 CSS drills.
 */
const MasteryPage = lazy(() => import('./pages/MasteryPage'));
const PlaygroundPage = lazy(() => import('./pages/PlaygroundPage'));
const RapidFirePage = lazy(() => import('./pages/RapidFirePage'));

function RouteFallback() {
  return (
    <div className="h-full w-full flex items-center justify-center p-10 text-slate-400 text-xs">
      loading…
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route
              element={
                <PaneBoundary name="The page">
                  <Suspense fallback={<RouteFallback />}>
                    <App />
                  </Suspense>
                </PaneBoundary>
              }
            >
              {/* The single unified stream is the home page now */}
              <Route index element={<MasteryPage />} />
              <Route path="mastery" element={<Navigate to="/" replace />} />
              
              {/* The freeform lab */}
              <Route path="playground" element={<PlaygroundPage />} />

              {/* Redirect all legacy fragmented routes back to the unified stream */}
              <Route path="css100" element={<Navigate to="/" replace />} />
              <Route path="arena" element={<Navigate to="/" replace />} />
              <Route path="challenges" element={<Navigate to="/" replace />} />
              <Route path="ladder" element={<Navigate to="/" replace />} />
              <Route path="targets" element={<Navigate to="/" replace />} />
              <Route path="match" element={<Navigate to="/" replace />} />
              <Route path="rapid" element={<RapidFirePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
