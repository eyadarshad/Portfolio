'use client';

import { useEffect, useRef } from 'react';

export function useAmbientSound() {
    const audioCtx = useRef<AudioContext | null>(null);
    const mainGain = useRef<GainNode | null>(null);

    const startSound = () => {
        if (typeof window === 'undefined' || audioCtx.current) return;

        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;

        audioCtx.current = new AudioContextClass();
        mainGain.current = audioCtx.current.createGain();
        mainGain.current.connect(audioCtx.current.destination);
        mainGain.current.gain.setValueAtTime(0, audioCtx.current.currentTime);
        mainGain.current.gain.linearRampToValueAtTime(0.4, audioCtx.current.currentTime + 3);

        // 1. Deep Ethereal Pad (Low Sine)
        const lowOsc = audioCtx.current.createOscillator();
        const lowGain = audioCtx.current.createGain();
        lowOsc.type = 'sine';
        lowOsc.frequency.setValueAtTime(55, audioCtx.current.currentTime); // A1
        lowGain.gain.value = 0.2;
        lowOsc.connect(lowGain);
        lowGain.connect(mainGain.current);
        lowOsc.start();

        // 2. Shimmering Synth (Triangle with LFO)
        const highOsc = audioCtx.current.createOscillator();
        const highGain = audioCtx.current.createGain();
        highOsc.type = 'triangle';
        highOsc.frequency.setValueAtTime(220, audioCtx.current.currentTime); // A3
        highGain.gain.value = 0.05;

        // LFO for pitch drift
        const lfo = audioCtx.current.createOscillator();
        const lfoGain = audioCtx.current.createGain();
        lfo.frequency.value = 0.2;
        lfoGain.gain.value = 2;
        lfo.connect(lfoGain);
        lfoGain.connect(highOsc.frequency);
        lfo.start();

        highOsc.connect(highGain);
        highGain.connect(mainGain.current);
        highOsc.start();

        // 3. Ambient Noise Floor (Soft brown noise)
        const bufferSize = 2 * audioCtx.current.sampleRate;
        const noiseBuffer = audioCtx.current.createBuffer(1, bufferSize, audioCtx.current.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5; // boost
        }
        const noise = audioCtx.current.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;
        const noiseGain = audioCtx.current.createGain();
        noiseGain.gain.value = 0.02;
        noise.connect(noiseGain);
        noiseGain.connect(mainGain.current);
        noise.start();
    };

    const playClick = () => {
        if (!audioCtx.current) return;

        // High-tech short blip
        const osc = audioCtx.current.createOscillator();
        const gain = audioCtx.current.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, audioCtx.current.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, audioCtx.current.currentTime + 0.1);

        gain.gain.setValueAtTime(0.1, audioCtx.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(audioCtx.current.destination);

        osc.start();
        osc.stop(audioCtx.current.currentTime + 0.1);
    };

    return { startSound, playClick };
}
