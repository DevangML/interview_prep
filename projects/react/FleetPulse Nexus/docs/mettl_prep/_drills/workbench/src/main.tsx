import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './App';
import HomePage from './pages/HomePage';
import CSS100Page from './pages/CSS100Page';
import ArenaPage from './pages/ArenaPage';
import ChallengesPage from './pages/ChallengesPage';
import LadderPage from './pages/LadderPage';
import PlaygroundPage from './pages/PlaygroundPage';
import TargetsPage from './pages/TargetsPage';
import MatchPage from './pages/MatchPage';
import RapidPage from './pages/RapidPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="css100" element={<CSS100Page />} />
          <Route path="arena" element={<ArenaPage />} />
          <Route path="challenges" element={<ChallengesPage />} />
          <Route path="ladder" element={<LadderPage />} />
          <Route path="playground" element={<PlaygroundPage />} />
          <Route path="targets" element={<TargetsPage />} />
          <Route path="match" element={<MatchPage />} />
          <Route path="rapid" element={<RapidPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
