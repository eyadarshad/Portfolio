'use client';

import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

// World positions in the Dreamscape - Final Transcendence Mapping
const WORLDS = [
    { name: 'Hub', pos: [0, 5, 20], lookAt: [0, 0, 0] },
    { name: 'Traffic', pos: [0, -2, -10], lookAt: [0, -5, -5] },
    { name: 'Neural', pos: [25, 5, -25], lookAt: [20, 0, -20] },
    { name: 'Code', pos: [-25, 5, -25], lookAt: [-20, 0, -20] },
    { name: 'Failure', pos: [25, 5, 25], lookAt: [20, 0, 20] },
    { name: 'Future', pos: [-25, 5, 25], lookAt: [-20, 0, 20] },
    { name: 'Blackhole', pos: [0, -10, 60], lookAt: [0, -10, 50] },
    { name: 'Wormhole', pos: [0, -40, 10], lookAt: [0, -50, 0] },
];

export function CameraController() {
    const scroll = useScroll();
    const keysPressed = useRef<Set<string>>(new Set());
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => keysPressed.current.add(e.key);
        const handleKeyUp = (e: KeyboardEvent) => keysPressed.current.delete(e.key);
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useFrame((state, delta) => {
        // Arrow Key Navigation
        if (keysPressed.current.has('ArrowDown')) {
            scroll.el.scrollTop += 600 * delta;
        }
        if (keysPressed.current.has('ArrowUp')) {
            scroll.el.scrollTop -= 600 * delta;
        }

        const offset = scroll.offset; // 0 to 1
        const sectionCount = WORLDS.length - 1;

        // INFINITE JOURNEY LOGIC: Loop back to start when reaching the end
        if (offset > 0.995) {
            scroll.el.scrollTop = 1; // Seamless jump back to start
        }

        const index = Math.min(Math.floor(offset * sectionCount), sectionCount);
        const nextIndex = Math.min(index + 1, sectionCount);
        const progress = (offset * sectionCount) % 1;

        // Update custom UI scroll gauge
        const gauge = document.getElementById('scroll-bar-gauge');
        if (gauge) {
            gauge.style.height = `${offset * 100}%`;
        }

        // Interpolate position
        const start = WORLDS[index];

        // Loop interpolation: If near the end, target the singularity then jump back
        let end;
        if (offset > 0.98) {
            // Move TOWARDS the singularity [0, -50, 0] at the very end
            end = { pos: [0, -49.5, 0], lookAt: [0, -50, 0] };
        } else {
            end = WORLDS[nextIndex];
        }

        const basePos = new THREE.Vector3().fromArray(start.pos).lerp(new THREE.Vector3().fromArray(end.pos), progress);
        const baseLookAt = new THREE.Vector3().fromArray(start.lookAt).lerp(new THREE.Vector3().fromArray(end.lookAt), progress);

        // MOUSE PARALLAX
        const parallaxX = mouse.current.x * 2.5;
        const parallaxY = -mouse.current.y * 2.5;

        const targetPos = basePos.clone().add(new THREE.Vector3(parallaxX, parallaxY, 0));

        // Smoothly update camera
        state.camera.position.lerp(targetPos, 0.05);
        state.camera.lookAt(baseLookAt);

        // Subtle float based on time
        state.camera.position.y += Math.sin(state.clock.elapsedTime) * 0.01;
    });

    return null;
}
