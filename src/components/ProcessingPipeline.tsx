import React, { useEffect, useState } from 'react';
import { 
  Bot, 
  SearchCheck, 
  AlertTriangle, 
  Tag, 
  Database, 
  GitFork, 
  Wrench, 
  CheckCircle2,
  Loader2
} from 'lucide-react';
import type { ProcessingStageId } from '../types/aegis';

interface StageConfig {
  id: ProcessingStageId;
  label: string;
  sublabel: string;
  icon: React.ElementType;
}

const STAGES: StageConfig[] = [
  { id: 'GENERATOR', label: 'GENERATOR', sublabel: 'Initial synthesis', icon: Bot },
  { id: 'EVALUATOR', label: 'EVALUATOR', sublabel: 'Validation sweep', icon: SearchCheck },
  { id: 'FAILURE_DETECTED', label: 'FAILURE DETECTED', sublabel: 'Anomaly signaled', icon: AlertTriangle },
  { id: 'CLASSIFY', label: 'CLASSIFY', sublabel: 'Error taxonomy', icon: Tag },
  { id: 'MEMORY', label: 'MEMORY', sublabel: 'Episodic search', icon: Database },
  { id: 'ADAPT', label: 'ADAPT', sublabel: 'Graph mutation', icon: GitFork },
  { id: 'REPAIR', label: 'REPAIR', sublabel: 'Targeted agent run', icon: Wrench },
  { id: 'VERIFY', label: 'VERIFY', sublabel: 'Consensus check', icon: CheckCircle2 },
];

interface ProcessingPipelineProps {
  task: string;
}

export const ProcessingPipeline: React.FC<ProcessingPipelineProps> = ({ task }) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStageIndex((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 flex flex-col items-center animate-fadeIn">
      {/* Target Task banner */}
      <div className="w-full lab-glass rounded-2xl p-5 mb-8 text-left relative overflow-hidden">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span>INFERENCE TARGET</span>
        </div>
        <p className="text-lg sm:text-xl font-medium text-white tracking-normal truncate">
          "{task}"
        </p>
      </div>

      {/* Main Flow Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 mb-2.5">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-400" />
          <span>AUTONOMOUS PIPELINE TRANSITION</span>
        </div>
        <h3 className="text-2xl font-display font-semibold text-white">
          Executing Adaptive Self-Repair Flow
        </h3>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Visual progression through AEGIS self-evolving stages
        </p>
      </div>

      {/* Modern Stage Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isPassed = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;
          const isPending = idx > currentStageIndex;

          let cardStyle = 'bg-white/[0.02] border-white/[0.06] text-slate-500';
          if (isCurrent) {
            cardStyle = 'bg-sky-500/[0.08] border-sky-400/40 text-sky-200 shadow-[0_8px_24px_rgba(56,189,248,0.15)] ring-1 ring-sky-400/30';
          } else if (isPassed) {
            cardStyle = 'bg-white/[0.04] border-white/10 text-slate-300';
          }

          return (
            <div
              key={stage.id}
              className={`relative rounded-xl p-4 border transition-all duration-300 flex flex-col justify-between ${cardStyle} ${
                isPending ? 'opacity-35' : 'opacity-100'
              }`}
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-3 text-[10px] font-mono tracking-wider">
                <span className="text-slate-500">0{idx + 1} / 08</span>
                {isPassed && <span className="text-emerald-400 font-medium">PASSED</span>}
                {isCurrent && (
                  <span className="text-sky-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                    RUNNING
                  </span>
                )}
                {isPending && <span className="text-slate-600">PENDING</span>}
              </div>

              {/* Icon & Label */}
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isCurrent ? 'bg-sky-400/20 text-sky-300' : 'bg-white/[0.04] text-slate-400'} border border-white/5`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-white">
                    {stage.label}
                  </h4>
                  <p className="text-[11px] font-mono text-slate-400">
                    {stage.sublabel}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Smooth Minimalist Progress Bar */}
      <div className="w-full max-w-sm mt-8 bg-white/[0.05] rounded-full h-1 border border-white/10 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sky-400 to-indigo-400 transition-all duration-300 ease-out"
          style={{ width: `${((currentStageIndex + 1) / STAGES.length) * 100}%` }}
        />
      </div>
    </div>
  );
};
