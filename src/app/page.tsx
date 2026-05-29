'use client';

import dynamic from 'next/dynamic';
import { useAmbientSound } from '@/hooks/useAmbientSound';
import { useState, useEffect } from 'react';

// Dynamic imports
const Scene = dynamic(() => import('@/components/canvas/Scene').then(mod => mod.Scene), { ssr: false });
const Hub = dynamic(() => import('@/components/worlds/Hub').then(mod => mod.Hub), { ssr: false });
const TrafficCity = dynamic(() => import('@/components/worlds/TrafficCity').then(mod => mod.TrafficCity), { ssr: false });
const FashionConstellation = dynamic(() => import('@/components/worlds/FashionConstellation').then(mod => mod.FashionConstellation), { ssr: false });
const CodeVoid = dynamic(() => import('@/components/worlds/CodeVoid').then(mod => mod.CodeVoid), { ssr: false });
const FailureRoom = dynamic(() => import('@/components/worlds/FailureRoom').then(mod => mod.FailureRoom), { ssr: false });
const FutureRoom = dynamic(() => import('@/components/worlds/FutureRoom').then(mod => mod.FutureRoom), { ssr: false });

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { startSound, playClick } = useAmbientSound();
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStart = () => {
    setIsStarted(true);
    startSound();
    playClick();
  };

  if (!mounted) {
    return <main className="fixed inset-0 bg-black" />;
  }

  return (
    <main
      className="relative w-full h-screen bg-black select-none overflow-hidden"
      onClick={() => isStarted && playClick()}
    >
      {/* Customs Scroll Gauge */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 w-[2px] h-48 bg-white/5 z-50 overflow-hidden rounded-full">
        <div id="scroll-bar-gauge" className="w-full bg-accent glow-accent shadow-[0_0_20px_var(--accent)] transition-all duration-300 pointer-events-none" style={{ height: '0%' }}></div>
      </div>

      {/* Opening Overlay */}
      {!isStarted && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-1000 cursor-pointer"
          onClick={handleStart}
        >
          <div className="text-center space-y-8">
            <span className="text-[10px] uppercase tracking-[2em] opacity-30 animate-pulse">Every project begins as a thought</span>
            <div className="h-[1px] w-48 bg-white/10 mx-auto" />
            <div className="space-y-4">
              <h1 className="text-5xl font-sans font-extrabold text-white tracking-[0.2em] uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]">The Dreamspace</h1>
              <p className="text-[9px] uppercase tracking-[0.8em] text-white/40">Travel with Arrows or Scroll</p>
            </div>
          </div>
        </div>
      )}

      {/* 3D Scene Layer */}
      <div className="w-full h-full">
        <Scene>
          <Hub />
          <TrafficCity />
          <FashionConstellation />
          <CodeVoid />
          <FailureRoom />
          <FutureRoom />
        </Scene>
      </div>

      {/* 2D HUD Layer */}
      <div className={`fixed inset-0 z-10 w-full h-full pointer-events-none flex flex-col justify-between pt-16 pb-10 px-10 sm:pt-20 sm:pb-14 sm:px-14 transition-opacity duration-2000 ${isStarted ? 'opacity-100' : 'opacity-0'}`}>
        {/* Top Header */}
        {/* Top Header - Fixed positioning for ultimate margin control */}
        <div className="fixed top-6 left-10 right-10 sm:top-8 sm:left-14 sm:right-14 z-50 flex justify-between items-start pointer-events-auto">
          <div className="dream-text group">
            <h1 className="text-4xl font-sans font-black tracking-[0.25em] uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_40px_rgba(255,255,255,0.7)] transition-all duration-700 select-none">
              Eyad Arshad
            </h1>
            <div className="flex items-center gap-3 mt-4">
              <div className="h-[1px] w-12 bg-white/20" />
              <p className="text-[10px] opacity-40 uppercase tracking-[1em]">The Dreamspace</p>
            </div>
          </div>

          <nav className="flex gap-8">
            <a href="https://github.com/eyadarshad" target="_blank" onMouseEnter={() => playClick()} className="hud-pill text-[10px] uppercase tracking-widest font-bold hover:text-accent transition-colors">Github</a>
            <a href="mailto:eyadyr1967@gmail.com" onMouseEnter={() => playClick()} className="hud-pill text-[10px] uppercase tracking-widest font-bold hover:text-accent transition-colors">Contact</a>
          </nav>
        </div>

        {/* Dynamic Navigation Hints */}
        <div className="flex-1 flex flex-col items-center justify-center pointer-events-none space-y-4">
          <div className="flex flex-col items-center opacity-10 space-y-2 translate-y-32">
            <div className="flex gap-4">
              <div className="px-3 py-1 border border-white/40 rounded text-[9px] uppercase tracking-widest font-bold">Arrow Up</div>
              <div className="px-3 py-1 border border-white/40 rounded text-[9px] uppercase tracking-widest font-bold">Arrow Down</div>
            </div>
            <div className="text-[9px] uppercase tracking-[1.5em]">Infinite Journey</div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex justify-between items-end pointer-events-auto">
          <div className="max-w-[350px] space-y-6">
            <div className="h-[1px] w-16 bg-accent opacity-50" />
            <p className="text-[11px] leading-relaxed opacity-40 uppercase tracking-[0.5em] font-medium">
              AI STUDENT & DEVELOPER <br />
              SCULPTING DIGITAL <br />
              FABRIC FROM DREAMS
            </p>
          </div>

          <div className="text-right flex flex-col items-end">
            <div className="flex gap-6 mb-4 opacity-10">
              <div className="w-[1px] h-6 bg-white" />
              <div className="w-[1px] h-6 bg-white/40" />
              <div className="w-[1px] h-6 bg-white/40" />
            </div>
            <div className="text-8xl font-sans font-black opacity-[0.03] tracking-tighter hover:opacity-80 transition-opacity duration-1000 cursor-help select-none">2026</div>
          </div>
        </div>
      </div>
    </main>
  );
}
