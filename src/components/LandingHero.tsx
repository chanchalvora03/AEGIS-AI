import React, { useState } from 'react';
import { ArrowRight, Sparkles, Search, CornerDownLeft } from 'lucide-react';

interface LandingHeroProps {
  onProcess: (task: string) => void;
  isLoading: boolean;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onProcess,
  isLoading,
}) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim() || isLoading) return;
    onProcess(task.trim());
  };

  const handleExampleClick = (example: string) => {
    setTask(example);
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(84vh-70px)] px-4 sm:px-6 max-w-4xl mx-auto text-center py-12 sm:py-20 animate-fadeIn">
      {/* Top telemetry badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-8 backdrop-blur-xl shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-sky-400" />
        <span className="text-[11px] font-mono tracking-widest text-slate-300 uppercase">
          Self-Evolving Architecture Engine
        </span>
      </div>

      {/* Main Title: AEGIS */}
      <h1 className="text-7xl sm:text-8xl md:text-9xl font-display font-bold tracking-tight text-white mb-3 select-none">
        <span className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          AEGIS
        </span>
      </h1>

      {/* Subtitle */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-slate-200 tracking-normal mb-3">
        Failure-Driven Self-Evolving AI
      </h2>

      {/* Clean Tagline: Detect • Adapt • Repair • Learn */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-mono tracking-[0.2em] text-slate-400 uppercase mb-12 select-none">
        <span className="text-slate-300">Detect</span>
        <span className="text-slate-600">•</span>
        <span className="text-slate-300">Adapt</span>
        <span className="text-slate-600">•</span>
        <span className="text-slate-300">Repair</span>
        <span className="text-slate-600">•</span>
        <span className="text-slate-300">Learn</span>
      </div>

      {/* Large Task Input Box */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
        <div className="relative group">
          {/* Subtle Ambient Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 via-indigo-500/15 to-violet-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500" />

          <div className="relative flex flex-col sm:flex-row items-center bg-[#10131f]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 sm:p-2.5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all duration-300 focus-within:border-sky-400/50 focus-within:ring-2 focus-within:ring-sky-400/20">
            <div className="flex items-center w-full pl-3.5 pr-2 py-2 sm:py-0">
              <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Ask AEGIS anything..."
                disabled={isLoading}
                autoFocus
                className="w-full bg-transparent text-slate-100 placeholder-slate-500 font-sans text-base sm:text-lg focus:outline-none tracking-normal"
              />
            </div>

            <button
              type="submit"
              disabled={!task.trim() || isLoading}
              className="w-full sm:w-auto mt-2 sm:mt-0 flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-950 font-display font-semibold text-sm tracking-wide uppercase px-6 py-3.5 rounded-xl shadow-[0_2px_10px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_16px_rgba(255,255,255,0.25)] transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shrink-0"
            >
              <span>PROCESS TASK</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </form>

      {/* Suggested Questions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 text-xs font-mono text-slate-400">
        <span className="text-slate-500 text-[11px]">EXAMPLES:</span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => handleExampleClick('Who discovered penicillin?')}
            className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/20 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer shadow-sm text-xs flex items-center gap-1.5"
          >
            <span>"Who discovered penicillin?"</span>
            <CornerDownLeft className="w-3 h-3 text-slate-500" />
          </button>

          <button
            type="button"
            onClick={() => handleExampleClick('Calculate 25% of $20.')}
            className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/20 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer shadow-sm text-xs flex items-center gap-1.5"
          >
            <span>"Calculate 25% of $20."</span>
            <CornerDownLeft className="w-3 h-3 text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
};
