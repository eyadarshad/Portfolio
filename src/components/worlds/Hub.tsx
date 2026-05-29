'use client';

import { Float, MeshDistortMaterial } from '@react-three/drei';
import { BillboardText } from '../canvas/BillboardText';
import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function Hub() {
    const crystalRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (crystalRef.current) {
            crystalRef.current.rotation.y += 0.005;
            crystalRef.current.rotation.z += 0.002;
        }
    });

    return (
        <group position={[0, 0, 0]}>
            {/* Central Floating Crystal / Hub Object */}
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <mesh ref={crystalRef} castShadow receiveShadow>
                    <octahedronGeometry args={[2, 0]} />
                    <MeshDistortMaterial
                        color="#8b5cf6"
                        speed={3}
                        distort={0.4}
                        radius={1}
                        emissive="#4c1d95"
                        emissiveIntensity={0.5}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>
            </Float>

            {/* Floating Platforms / Islands */}
            {[...Array(5)].map((_, i) => (
                <Float key={i} speed={1.5} rotationIntensity={0.5} floatIntensity={1} position={[
                    Math.sin(i * 1.5) * 8,
                    Math.cos(i * 0.5) * 2,
                    Math.cos(i * 1.5) * 8
                ]}>
                    <mesh castShadow receiveShadow>
                        <boxGeometry args={[2, 0.2, 2]} />
                        <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.5} />
                    </mesh>
                    <BillboardText
                        position={[0, 0.5, 0]}
                        fontSize={0.3}
                        color="white"
                    >
                        {['Traffic', 'Neural', 'Code', 'Failure', 'Future'][i]}
                    </BillboardText>
                </Float>
            ))}

            {/* Atmospheric Particles - Simplified to fix build errors */}
            <points>
                <sphereGeometry args={[20, 32, 32]} />
                <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} sizeAttenuation />
            </points>
        </group>
    );
}
