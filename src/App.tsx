import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CyberBackground } from './components/CyberBackground';
import { Header } from './components/Header';
import { LandingHero } from './components/LandingHero';
import { ProcessingPipeline } from './components/ProcessingPipeline';
import { ResultDashboard } from './components/ResultDashboard';
import type { AegisResponse } from './types/aegis';
import { processTaskApi } from './services/api';

export const App: React.FC = () => {
  const [viewState, setViewState] = useState<'idle' | 'processing' | 'result'>('idle');
  const [currentTask, setCurrentTask] = useState<string>('');
  const [resultData, setResultData] = useState<AegisResponse | null>(null);
  const [isMock, setIsMock] = useState<boolean>(false);

  const handleProcessTask = async (task: string) => {
    setCurrentTask(task);
    setViewState('processing');

    const startTime = Date.now();
    try {
      const { data, isMock: mockMode } = await processTaskApi({ task });
      setIsMock(mockMode);

      // Ensure minimum time in visualization for smooth presentation effect (at least 2.5s)
      const elapsed = Date.now() - startTime;
      const minDelay = 2600;
      if (elapsed < minDelay) {
        await new Promise((resolve) => setTimeout(resolve, minDelay - elapsed));
      }

      setResultData(data);
      setViewState('result');

      // Subtle celebration if resolved
      if (data.resolved) {
        confetti({
          particleCount: 36,
          spread: 55,
          origin: { y: 0.8 },
          colors: ['#38bdf8', '#818cf8', '#34d399'],
          disableForReducedMotion: true,
        });
      }
    } catch (err) {
      console.error('Task processing failure:', err);
      setViewState('idle');
    }
  };

  const handleReset = () => {
    setViewState('idle');
    setResultData(null);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#05070f] text-slate-100 flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* High-tech Canvas Cyber Background */}
      <CyberBackground />

      {/* Top Header HUD */}
      <Header
        onReset={handleReset}
        isProcessing={viewState === 'processing'}
        hasResult={viewState === 'result'}
        isMock={isMock}
      />

      {/* Main Dynamic Viewport */}
      <main className="flex-1 flex flex-col justify-center relative z-10 w-full">
        {viewState === 'idle' && (
          <LandingHero
            onProcess={handleProcessTask}
            isLoading={false}
          />
        )}

        {viewState === 'processing' && (
          <ProcessingPipeline task={currentTask} />
        )}

        {viewState === 'result' && resultData && (
          <ResultDashboard
            response={resultData}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Bottom Minimal HUD Status Bar */}
      <footer className="relative z-10 w-full border-t border-white/[0.06] bg-[#08090e]/80 backdrop-blur-2xl px-6 sm:px-10 py-3 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            AEGIS CORE
          </span>
          <span className="hidden md:inline text-slate-700">|</span>
          <span className="hidden md:inline text-slate-400">AUTONOMOUS FAILURE MITIGATION GRAPH</span>
        </div>

        <div className="flex items-center gap-3 text-slate-400">
          <span>DETECT</span>
          <span className="text-slate-600">•</span>
          <span>ADAPT</span>
          <span className="text-slate-600">•</span>
          <span>REPAIR</span>
          <span className="text-slate-600">•</span>
          <span>LEARN</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
