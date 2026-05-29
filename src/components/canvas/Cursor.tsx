'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export function Cursor() {
    const groupRef = useRef<THREE.Group>(null);
    const ringRef = useRef<THREE.Mesh>(null);
    const orbitersRef = useRef<THREE.Group>(null);
    const { camera } = useThree();

    // Create three orbiting "electrons" with larger, more visible context
    const orbiters = useMemo(() => [
        { radius: 0.15, speed: 2.5, offset: 0 },
        { radius: 0.20, speed: -1.8, offset: Math.PI / 3 },
        { radius: 0.25, speed: 3.5, offset: Math.PI / 1.5 },
    ], []);

    useFrame((state) => {
        if (!groupRef.current || !ringRef.current || !orbitersRef.current) return;

        // MATHEMATICALLY BULLETPROOF: 
        // Project mouse coordinates into active main camera frustum
        const vector = new THREE.Vector3(state.mouse.x, state.mouse.y, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();

        // Position exactly 5 units in front of the active camera
        const distance = 5;
        const targetPos = camera.position.clone().add(dir.multiplyScalar(distance));

        groupRef.current.position.copy(targetPos);
        groupRef.current.lookAt(camera.position); // Always face the camera (Billboard effect)

        // Ring breathing & rotation
        const scale = 1.2 + Math.sin(state.clock.elapsedTime * 4) * 0.15;
        ringRef.current.scale.set(scale, scale, scale);
        ringRef.current.rotation.z -= 0.08;

        // Animate orbiters (electrons)
        const children = orbitersRef.current.children;
        for (let i = 0; i < orbiters.length; i++) {
            const child = children[i];
            if (!child) continue;

            const orb = orbiters[i];
            const angle = state.clock.elapsedTime * orb.speed + orb.offset;
            child.position.x = Math.cos(angle) * orb.radius;
            child.position.y = Math.sin(angle) * orb.radius;
            child.position.z = Math.sin(angle * 0.5) * 0.1; // 3D orbit depth

            const pulse = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.3;
            child.scale.set(pulse, pulse, pulse);
        }
    });

    return (
        <group ref={groupRef} renderOrder={999}>
            {/* Main Ring */}
            <mesh ref={ringRef} frustumCulled={false}>
                <ringGeometry args={[0.08, 0.1, 64]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.6} depthTest={false} />
            </mesh>

            {/* Inner point */}
            <mesh position={[0, 0, 0.01]} frustumCulled={false}>
                <circleGeometry args={[0.015, 32]} />
                <meshBasicMaterial color="#a78bfa" depthTest={false} />
            </mesh>

            {/* Orbiting Electrons / Spirals */}
            <group ref={orbitersRef}>
                {orbiters.map((_, i) => (
                    <mesh key={`electron-${i}`} frustumCulled={false}>
                        <sphereGeometry args={[0.008, 16, 16]} />
                        <meshBasicMaterial color="#8b5cf6" depthTest={false} />
                    </mesh>
                ))}
                {/* Shells */}
                {orbiters.map((orb, i) => (
                    <mesh key={`shell-${i}`} frustumCulled={false}>
                        <ringGeometry args={[orb.radius, orb.radius + 0.002, 64]} />
                        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} depthTest={false} />
                    </mesh>
                ))}
            </group>
        </group>
    );
}
