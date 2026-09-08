import React from 'react';
import { 
  ArrowRight, 
  ArrowDown, 
  Sparkles, 
  Cpu, 
  Layers,
  CheckCircle
} from 'lucide-react';
import { parseArchitecture } from '../services/api';

interface SelfEvolutionHeroProps {
  architectureBefore: string[] | string;
  architectureAfter: string[] | string;
  failureDetected?: boolean;
}

export const SelfEvolutionHero: React.FC<SelfEvolutionHeroProps> = ({
  architectureBefore,
  architectureAfter,
}) => {
  const beforeNodes = parseArchitecture(architectureBefore);
  const afterNodes = parseArchitecture(architectureAfter);

  // Identify newly introduced agents in architectureAfter
  const beforeSet = new Set(beforeNodes.map((n) => n.trim().toLowerCase()));
  const isModified = JSON.stringify(beforeNodes) !== JSON.stringify(afterNodes);

  return (
    <section className="w-full lab-glass rounded-3xl p-6 sm:p-10 relative overflow-hidden my-6">
      {/* Diffuse Lighting Highlight */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-widest text-slate-300 uppercase mb-2">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>HERO FEATURE</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white">
            SELF-EVOLUTION
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            Dynamic computational graph re-wiring upon failure detection
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-xs">
          {isModified ? (
            <span className="px-3.5 py-1.5 rounded-xl bg-sky-500/10 border border-sky-400/40 text-sky-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              TOPOLOGY RE-COMPOSED
            </span>
          ) : (
            <span className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              STABLE TOPOLOGY
            </span>
          )}
        </div>
      </div>

      {/* Evolution Flow Canvas */}
      <div className="flex flex-col items-center gap-5 w-full max-w-4xl mx-auto">
        {/* BEFORE ARCHITECTURE */}
        <div className="w-full bg-black/20 rounded-2xl p-5 sm:p-6 border border-white/[0.06]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              BEFORE [ INITIAL TOPOLOGY ]
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              {beforeNodes.length} NODES
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {beforeNodes.map((node, index) => (
              <React.Fragment key={`before-${node}-${index}`}>
                <div className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-300 font-mono text-sm font-medium tracking-wide uppercase flex items-center justify-center gap-2.5 shadow-sm">
                  <Cpu className="w-4 h-4 text-slate-500" />
                  <span>{node}</span>
                </div>

                {index < beforeNodes.length - 1 && (
                  <>
                    <ArrowRight className="hidden sm:block w-4 h-4 text-slate-600 shrink-0" />
                    <ArrowDown className="sm:hidden w-4 h-4 text-slate-600 shrink-0 my-1" />
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* TRANSFORMATION TRANSITION STEP */}
        <div className="flex flex-col items-center my-1 select-none">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/15 text-xs font-mono tracking-wider text-slate-200 uppercase backdrop-blur-xl shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-semibold">ADAPTING...</span>
            <ArrowDown className="w-3.5 h-3.5 text-sky-400 animate-bounce ml-1" />
          </div>
          <div className="w-px h-5 bg-gradient-to-b from-white/20 to-transparent my-1" />
        </div>

        {/* AFTER ARCHITECTURE */}
        <div className="w-full bg-white/[0.02] rounded-2xl p-5 sm:p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-semibold tracking-wider text-sky-300 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              AFTER [ EVOLVED TOPOLOGY ]
            </span>
            <span className="text-[11px] font-mono text-sky-400/90 font-medium">
              {afterNodes.length} NODES
            </span>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
            {afterNodes.map((node, index) => {
              const isNewlyAdded = !beforeSet.has(node.trim().toLowerCase());

              return (
                <React.Fragment key={`after-${node}-${index}`}>
                  <div
                    className={`w-full sm:w-auto relative px-5 py-3.5 rounded-xl font-mono text-sm font-medium tracking-wide uppercase flex items-center justify-center gap-2.5 transition-all duration-300 ${
                      isNewlyAdded
                        ? 'bg-sky-500/[0.12] border-2 border-sky-400/80 text-sky-200 shadow-[0_0_25px_rgba(56,189,248,0.25),inset_0_1px_0_0_rgba(255,255,255,0.2)] scale-105'
                        : 'bg-white/[0.03] border border-white/[0.08] text-slate-300'
                    }`}
                  >
                    {isNewlyAdded ? (
                      <CheckCircle className="w-4 h-4 text-sky-300 shrink-0" />
                    ) : (
                      <Cpu className="w-4 h-4 text-slate-400 shrink-0" />
                    )}

                    <span>{node}</span>

                    {isNewlyAdded && (
                      <span className="absolute -top-2.5 -right-2 bg-sky-400 text-slate-950 text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase shadow-md flex items-center gap-1">
                        + INJECTED
                      </span>
                    )}
                  </div>

                  {index < afterNodes.length - 1 && (
                    <>
                      <ArrowRight
                        className={`hidden sm:block w-4 h-4 shrink-0 ${
                          isNewlyAdded ? 'text-sky-400' : 'text-slate-600'
                        }`}
                      />
                      <ArrowDown
                        className={`sm:hidden w-4 h-4 shrink-0 my-1 ${
                          isNewlyAdded ? 'text-sky-400' : 'text-slate-600'
                        }`}
                      />
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quote Banner */}
      <div className="mt-8 pt-6 border-t border-white/[0.08] text-center">
        <p className="text-base sm:text-lg font-display text-slate-200 font-medium tracking-normal">
          « AEGIS changes its architecture when it fails. »
        </p>
        <p className="text-[11px] font-mono text-slate-500 mt-1 uppercase tracking-wider">
          Autonomous Reinforcement • Dynamic Node Synthesis • Zero Human Intervention
        </p>
      </div>
    </section>
  );
};
