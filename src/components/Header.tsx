import React from 'react';
import { RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  isProcessing: boolean;
  hasResult: boolean;
  isMock: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  isProcessing,
  hasResult,
  isMock,
}) => {
  return (
    <header className="relative z-20 w-full border-b border-white/[0.08] bg-[#08090e]/75 backdrop-blur-2xl px-6 sm:px-10 py-3.5 flex items-center justify-between transition-colors">
      {/* Brand & System Node */}
      <div 
        className="flex items-center gap-3 cursor-pointer select-none group" 
        onClick={onReset}
      >
        <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-b from-white/10 to-white/5 border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] group-hover:border-white/30 transition-all duration-300">
          <Sparkles className="w-4 h-4 text-sky-400 group-hover:rotate-12 transition-transform duration-300" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-base tracking-tight text-white group-hover:text-sky-200 transition-colors">
              AEGIS
            </span>
            <span className="text-[10px] font-mono tracking-wider text-slate-400 border border-white/10 rounded-md px-1.5 py-0.2 bg-white/[0.03]">
              RESEARCH LAB
            </span>
          </div>
        </div>
      </div>

      {/* Center Status Telemetry */}
      <div className="hidden md:flex items-center gap-6 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
          <span>SELF-EVOLUTION: <strong className="text-slate-200 font-medium">ACTIVE</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
          <span>REPAIR ENGINE: <strong className="text-slate-200 font-medium">READY</strong></span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {isMock && (
          <div className="text-[10px] font-mono tracking-wider text-sky-300/80 bg-sky-950/30 border border-sky-500/20 rounded-full px-2.5 py-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>DEMO MODE</span>
          </div>
        )}

        {(hasResult || isProcessing) && (
          <button
            onClick={onReset}
            disabled={isProcessing}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 px-3.5 py-1.5 rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-40 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>New Task</span>
          </button>
        )}
      </div>
    </header>
  );
};
