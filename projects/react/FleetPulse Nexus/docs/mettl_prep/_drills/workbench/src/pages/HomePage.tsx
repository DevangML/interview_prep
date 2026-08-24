import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { LayoutGrid, Swords, Code2, GraduationCap, Play, Target, Puzzle, Zap, ArrowRight } from 'lucide-react';
import { fetchCampaign, fetchActivity } from '../hooks/useApi';
import type { CampaignState, ActivityEvent } from '../types';
import ProgressBar from '../components/shared/ProgressBar';

export default function HomePage() {
  const [state, setState] = useState<CampaignState | null>(null);
  const [activity, setActivity] = useState<ActivityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchCampaign().then(setState).catch(() => null),
      fetchActivity(10).then(setActivity).catch(() => []),
    ]).finally(() => setLoading(false));
  }, []);

  const p = state?.active_campaign?.progression;
  const quests = state?.active_campaign?.quests || [];
  const currentQuest = quests.find((q) => q.id === p?.current_quest) || quests[0];
  const nextOpenChallenge = currentQuest?.challenges?.find((c) => c.playable && !c.done);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 w-full overflow-y-auto">
      {/* Hero Header */}
      <div className="flex flex-wrap gap-6 items-end justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">React Workbench</h1>
          <p className="text-sm text-slate-500 max-w-xl">
            Everything for the Mettl assessment and technical rounds, running locally. Progress synchronizes directly with your campaign state.
          </p>
        </div>

        {/* Campaign XP Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 min-w-56 shadow-xs">
          <div className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">Campaign Rank</div>
          <div className="text-xl font-extrabold text-slate-900 my-0.5">{p?.rank || 'Novice'}</div>
          <ProgressBar label="" value={p?.xp || 0} max={p?.xp_total || 1000} className="my-1" />
          <div className="flex justify-between text-xs font-semibold text-slate-500">
            <span>{p?.xp || 0} / {p?.xp_total || 1000} XP</span>
            <span>{p?.challenges_cleared || 0} / {p?.challenges_total || 0} cleared</span>
          </div>
        </div>
      </div>

      {/* Next Move Callout */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl p-5 mb-8 flex flex-wrap gap-4 items-center justify-between shadow-lg">
        <div>
          <div className="text-[0.68rem] font-bold uppercase tracking-wider text-sky-400 mb-1">Next Objective</div>
          <h2 className="text-lg font-bold">{currentQuest ? `${currentQuest.id} · ${currentQuest.title}` : 'Ready to begin'}</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">{currentQuest?.why || 'Open the arena or CSS 100 to start practicing.'}</p>
        </div>
        <Link
          to="/arena"
          className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap"
        >
          {nextOpenChallenge ? `Start: ${nextOpenChallenge.name.slice(0, 30)}` : 'Open Arena'}
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Learn Grid */}
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Core Curriculums</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
        <NavCard
          to="/ladder"
          icon={GraduationCap}
          title="The Ladder"
          desc="66 progressive lessons across 9 stages: atoms, flexbox, grid, reactivity & polish."
          meta={`${p?.ladder_lessons_done || 0} / 66 lessons`}
        />
        <NavCard
          to="/css100"
          icon={LayoutGrid}
          title="CSS 100"
          desc="100 graded drills with live wireframe target overlay & automated spec validation."
          meta="100 Challenges"
        />
        <NavCard
          to="/playground"
          icon={Play}
          title="Playground"
          desc="Blank React 19 scratchpad with instant JSX & CSS hot reload."
          meta="Scratchpad"
        />
        <NavCard
          to="/targets"
          icon={Target}
          title="Targets"
          desc="10 UI skeleton layout archetypes with timed speed recall tests."
          meta="Rapid Recall"
        />
      </div>

      {/* Practice & Assessment Grid */}
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Practice & Arena</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
        <NavCard
          to="/arena"
          icon={Swords}
          title="Campaign Arena"
          desc="Quest-gated technical challenges with live test execution & hint logging."
          meta="Quest Mode"
        />
        <NavCard
          to="/challenges"
          icon={Code2}
          title="Practice Set"
          desc="6 ungated core drills: counter, todo, live search, debounce, form validation."
          meta="6 Standard Drills"
        />
        <NavCard
          to="/match"
          icon={Puzzle}
          title="Match the Target"
          desc="Pixel-accuracy canvas image diff scoring against target layouts."
          meta="Pixel Accuracy"
        />
        <NavCard
          to="/rapid"
          icon={Zap}
          title="Rapid Fire"
          desc="Speed drill testing JS closures, event loop, React hooks & CSS rules under timer."
          meta="Speed Quiz"
        />
      </div>

      {/* Recent Activity */}
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Recent Activity</h3>
      <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-4 text-xs text-slate-400">Loading campaign activity…</div>
        ) : activity.length === 0 ? (
          <div className="p-4 text-xs text-slate-400">No activity logged yet. Pick any challenge above to begin.</div>
        ) : (
          activity.map((ev, i) => (
            <div key={i} className="px-4 py-2.5 flex items-center gap-3 text-xs">
              <time className="font-mono text-slate-400 text-[0.7rem] shrink-0">{(ev.at || '').slice(11, 16) || '—'}</time>
              <span className="font-semibold text-slate-800 capitalize min-w-16 shrink-0">{ev.ev}</span>
              <span className="text-slate-500 truncate">{[ev.id, ev.quest, ev.title, ev.label, ev.page].filter(Boolean).join(' · ')}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function NavCard({ to, icon: Icon, title, desc, meta }: { to: string; icon: any; title: string; desc: string; meta: string }) {
  return (
    <Link
      to={to}
      className="bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all rounded-xl p-4 flex flex-col justify-between group"
    >
      <div>
        <div className="text-sky-600 mb-2 group-hover:scale-110 transition-transform origin-left">
          <Icon size={20} />
        </div>
        <div className="font-bold text-slate-900 text-sm mb-1">{title}</div>
        <div className="text-xs text-slate-500 leading-relaxed mb-3">{desc}</div>
      </div>
      <div className="text-[0.7rem] font-semibold text-sky-600 flex items-center justify-between pt-2 border-t border-slate-100">
        <span>{meta}</span>
        <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  );
}
