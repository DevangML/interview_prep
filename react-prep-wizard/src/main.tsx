import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import './index.css';
import App from './App';
import MasteryPage from './pages/MasteryPage';
import PlaygroundPage from './pages/PlaygroundPage';
import RapidFirePage from './pages/RapidFirePage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
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
    </QueryClientProvider>
  </StrictMode>,
);
