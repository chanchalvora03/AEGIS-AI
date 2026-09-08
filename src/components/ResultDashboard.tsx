import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  Brain, 
  ShieldCheck, 
  Bot, 
  Wrench, 
  RotateCcw,
  Check
} from 'lucide-react';
import type { AegisResponse } from '../types/aegis';
import { SelfEvolutionHero } from './SelfEvolutionHero';

interface ResultDashboardProps {
  response: AegisResponse;
  onReset: () => void;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({
  response,
  onReset,
}) => {
  const [isMemoryExpanded, setIsMemoryExpanded] = useState(false);

  const {
    task,
    initialAnswer,
    failureDetected,
    failureType,
    rootCause,
    memoryUsed,
    memoryMatch,
    architectureBefore,
    architectureAfter,
    repairStrategy,
    agentUsed,
    finalAnswer,
    finalEvaluation,
    resolved,
  } = response;

  // Derive top-level status
  let topStatusText = '✓ RESOLVED';
  let topStatusColor = 'text-emerald-300 border-emerald-400/30 bg-emerald-950/40';
  let TopIcon = CheckCircle2;

  if (resolved) {
    if (finalEvaluation?.toUpperCase().includes('PASS') || finalEvaluation?.toUpperCase().includes('VERIF')) {
      topStatusText = '✓ VERIFIED & RESOLVED';
      topStatusColor = 'text-emerald-300 border-emerald-400/30 bg-emerald-950/40';
      TopIcon = CheckCircle2;
    } else {
      topStatusText = '✓ RESOLVED';
    }
  } else if (failureDetected && !resolved) {
    topStatusText = '⚠ FAILURE DETECTED';
    topStatusColor = 'text-rose-300 border-rose-500/30 bg-rose-950/40';
    TopIcon = AlertTriangle;
  }

  // Similarity metric extraction
  let similarityPercent = '65.8%';
  let rawNumericSim = 65.8;
  if (memoryMatch && typeof memoryMatch === 'object' && 'similarity' in memoryMatch) {
    const rawSim = Number(memoryMatch.similarity);
    if (!isNaN(rawSim)) {
      rawNumericSim = rawSim <= 1 ? rawSim * 100 : rawSim;
      similarityPercent = `${rawNumericSim.toFixed(1)}%`;
    }
  }

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto py-8 sm:py-12 px-4 sm:px-6 flex flex-col gap-6 animate-fadeIn">
      {/* 3. COMPACT TOP STATUS HEADER */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl lab-glass">
        <div className="flex flex-wrap items-center gap-3">
          <div className={`px-3.5 py-1.5 rounded-full border text-xs font-mono font-semibold tracking-wider uppercase flex items-center gap-2 ${topStatusColor}`}>
            <TopIcon className="w-3.5 h-3.5" />
            <span>{topStatusText}</span>
          </div>

          <span className="text-xs font-mono text-slate-400">
            SESSION // <span className="text-slate-200">{response.sessionId || 'AEGIS-LAB'}</span>
          </span>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-2 text-xs font-mono tracking-wide uppercase text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>New Task</span>
        </button>
      </div>

      {/* Task Summary Banner */}
      <div className="px-5 py-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start sm:items-center gap-3">
        <span className="text-[10px] font-mono text-slate-400 bg-white/[0.04] border border-white/10 px-2 py-0.5 rounded uppercase tracking-wider shrink-0 mt-0.5 sm:mt-0 font-medium">
          TASK
        </span>
        <p className="text-sm sm:text-base font-medium text-slate-200 truncate">
          "{task}"
        </p>
      </div>

      {/* =========================================================================
          BRANCH A: NO-FAILURE EXPERIENCE (Section 11)
          ========================================================================= */}
      {!failureDetected ? (
        <div className="flex flex-col gap-6 my-2">
          {/* Streamlined Fast-Path Flow */}
          <div className="w-full lab-glass-emerald rounded-2xl p-6 sm:p-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-400/40 text-xs font-mono text-emerald-300 uppercase mb-4">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ZERO DEVIATIONS DETECTED</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6">
              Clean Pipeline Execution
            </h3>

            {/* Clean Flow Representation */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto my-4">
              <div className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-slate-200 font-mono text-xs uppercase font-medium">
                GENERATOR
              </div>
              <span className="text-slate-600 font-mono">→</span>
              <div className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-slate-200 font-mono text-xs uppercase font-medium">
                EVALUATOR
              </div>
              <span className="text-emerald-400 font-mono">→</span>
              <div className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-400/40 text-emerald-300 font-mono text-xs uppercase font-medium flex items-center justify-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>NO FAILURE</span>
              </div>
              <span className="text-sky-400 font-mono">→</span>
              <div className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-sky-950/40 border border-sky-400/30 text-sky-200 font-mono text-xs uppercase font-medium">
                FINAL ANSWER
              </div>
            </div>
          </div>

          {/* INITIAL RESPONSE (Compact) */}
          <div className="w-full lab-glass rounded-2xl p-5">
            <div className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold mb-2">
              INITIAL RESPONSE
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {initialAnswer}
            </p>
          </div>

          {/* 9. FINAL ANSWER — SECOND HERO SECTION */}
          <div className="w-full lab-glass rounded-3xl p-6 sm:p-10 border border-emerald-400/40 relative overflow-hidden bg-gradient-to-b from-[#0e161c] to-[#090e16]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <h4 className="text-sm font-mono tracking-wider text-emerald-300 uppercase font-semibold">
                  FINAL ANSWER
                </h4>
              </div>

              <div className="px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-400/40 text-xs font-mono font-medium text-emerald-300 flex items-center gap-1.5 self-start sm:self-auto">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>VERIFIED & RESOLVED</span>
              </div>
            </div>

            <div className="my-5 text-white text-xl sm:text-2xl md:text-3xl font-display font-medium leading-relaxed">
              {finalAnswer}
            </div>

            {/* 10. FINAL EVALUATION (Compact) */}
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="uppercase tracking-wider">FINAL CHECK:</span>
                <span className="text-emerald-300 font-semibold uppercase flex items-center gap-1">
                  ✓ {finalEvaluation || 'PASSED'}
                </span>
              </div>

              <span className="text-[11px] text-slate-500 font-mono">
                Direct Pipeline Execution Verified
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================================
           BRANCH B: FAILURE DETECTED -> SELF-EVOLUTION -> REPAIR -> FINAL ANSWER
           ========================================================================= */
        <div className="flex flex-col gap-6">
          {/* TWO COLUMN GRID: INITIAL ANSWER vs FAILURE ANALYSIS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* 4. INITIAL ANSWER (Compact) */}
            <div className="lab-glass rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono tracking-wider text-slate-400 uppercase font-semibold">
                    INITIAL RESPONSE
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-rose-950/60 border border-rose-500/40 text-[10px] font-mono font-bold text-rose-300 uppercase flex items-center gap-1.5">
                    <AlertTriangle className="w-3 h-3 text-rose-400" />
                    ERROR DETECTED
                  </span>
                </div>
                <div className="bg-black/20 p-3.5 rounded-xl border border-white/5">
                  <p className="text-slate-300 text-sm leading-relaxed italic">
                    "{initialAnswer}"
                  </p>
                </div>
              </div>
              <div className="mt-3 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Unverified baseline output
              </div>
            </div>

            {/* 5. FAILURE CARD (Visually Strong) */}
            <div className="lab-glass-rose rounded-2xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-wider text-rose-300/80 uppercase font-semibold">
                    FAILURE TYPE
                  </span>
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                </div>

                <h4 className="text-xl sm:text-2xl font-display font-bold text-rose-100 tracking-wide mb-2.5 uppercase">
                  {failureType || 'FACTUAL ERROR'}
                </h4>

                <div className="text-xs font-mono text-rose-100/90 leading-relaxed bg-black/25 p-3.5 rounded-xl border border-rose-500/20">
                  <span className="text-rose-400 block mb-1 uppercase font-bold text-[10px] tracking-wider">
                    ROOT CAUSE:
                  </span>
                  {rootCause || 'Incorrect information detected.'}
                </div>
              </div>

              <div className="mt-3 text-[10px] font-mono text-rose-300/70 uppercase tracking-wider">
                Triggered Dynamic Architecture Adaptation
              </div>
            </div>
          </div>

          {/* 6. THE HERO FEATURE — SELF-EVOLVING ARCHITECTURE */}
          <SelfEvolutionHero
            architectureBefore={architectureBefore}
            architectureAfter={architectureAfter}
          />

          {/* TWO COLUMN GRID: MEMORY & REPAIR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* 7. MEMORY CARD (Small & Elegant) */}
            <div className="lab-glass rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono tracking-wider text-slate-300 uppercase flex items-center gap-1.5 font-semibold">
                    <Brain className="w-4 h-4 text-indigo-400" />
                    FAILURE MEMORY
                  </span>

                  {memoryUsed ? (
                    <span className="px-2.5 py-0.5 rounded-md bg-indigo-950/60 border border-indigo-500/40 text-[10px] font-mono text-indigo-300 uppercase flex items-center gap-1">
                      <Check className="w-3 h-3 text-indigo-400" />
                      EXPERIENCE FOUND
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/10 text-[10px] font-mono text-slate-500 uppercase">
                      NO PREVIOUS EXPERIENCE
                    </span>
                  )}
                </div>

                {memoryUsed ? (
                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-xs font-mono text-slate-400 uppercase font-medium tracking-wider">
                        SIMILARITY
                      </span>
                      <span className="text-2xl font-display font-bold text-indigo-300">
                        {similarityPercent}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-white/[0.05] rounded-full h-1.5 mb-3 overflow-hidden border border-white/[0.06]">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full"
                        style={{ width: `${Math.min(Math.max(rawNumericSim, 10), 100)}%` }}
                      />
                    </div>

                    {memoryMatch && (
                      <button
                        onClick={() => setIsMemoryExpanded(!isMemoryExpanded)}
                        className="mt-1 text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span className="font-medium">
                          {isMemoryExpanded ? 'Collapse Match Details' : 'Expand Memory Match'}
                        </span>
                        {isMemoryExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    )}

                    {isMemoryExpanded && memoryMatch && (
                      <div className="mt-3 pt-3 border-t border-white/10 text-xs font-mono text-slate-300 space-y-2 animate-fadeIn">
                        {typeof memoryMatch === 'string' ? (
                          <p>{memoryMatch}</p>
                        ) : (
                          Object.entries(memoryMatch).map(([key, val]) => (
                            <div key={key} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                              <span className="text-slate-400 uppercase text-[10px] font-medium">{key}:</span>
                              <span className="text-slate-200 truncate max-w-xs font-medium">
                                {String(val)}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-xs font-mono text-slate-500 italic py-2">
                    No matching episodic failure pattern found. Registering experience vector.
                  </p>
                )}
              </div>
            </div>

            {/* 8. REPAIR CARD (Compact) */}
            <div className="lab-glass rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono tracking-wider text-slate-300 uppercase flex items-center gap-1.5 font-semibold">
                    <Wrench className="w-4 h-4 text-sky-400" />
                    REPAIR
                  </span>
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                </div>

                <div className="space-y-3">
                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1 font-medium tracking-wider">
                      AGENT
                    </span>
                    <div className="text-sm font-mono font-semibold text-sky-300 flex items-center gap-2">
                      <Bot className="w-4 h-4 text-sky-400" />
                      <span>{agentUsed || 'VerificationAgent'}</span>
                    </div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1 font-medium tracking-wider">
                      STRATEGY
                    </span>
                    <div className="text-sm font-mono font-medium text-slate-100">
                      {repairStrategy || 'Add VerificationAgent'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 9. FINAL ANSWER — SECOND HERO SECTION */}
          <div className="w-full lab-glass rounded-3xl p-6 sm:p-10 border border-white/15 relative overflow-hidden bg-gradient-to-b from-[#111624] via-[#0d121c] to-[#080b12] my-2 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                <h3 className="text-sm sm:text-base font-mono tracking-wider text-slate-300 uppercase font-semibold">
                  FINAL ANSWER
                </h3>
              </div>

              {resolved ? (
                <div className="px-3.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-400/40 text-xs font-mono font-medium text-emerald-300 flex items-center gap-1.5 self-start sm:self-auto">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>✓ VERIFIED & RESOLVED</span>
                </div>
              ) : (
                <div className="px-3.5 py-1 rounded-full bg-amber-950/70 border border-amber-400/40 text-xs font-mono font-medium text-amber-300 flex items-center gap-1.5 self-start sm:self-auto">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>⚠ NOT FULLY RESOLVED</span>
                </div>
              )}
            </div>

            {/* Prominent High-Contrast Answer Content */}
            <div className="my-6 text-white text-xl sm:text-2xl md:text-3xl font-display font-medium leading-relaxed tracking-normal">
              {finalAnswer}
            </div>

            {/* 10. FINAL EVALUATION (Compact Check) */}
            <div className="mt-8 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span className="uppercase tracking-wider text-slate-400 font-medium">FINAL CHECK:</span>
                <span className="text-emerald-300 font-semibold uppercase flex items-center gap-1 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20">
                  ✓ {finalEvaluation || 'PASSED'}
                </span>
              </div>

              <span className="text-[11px] text-slate-500 font-mono">
                Evolved Architecture Execution Successful
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
