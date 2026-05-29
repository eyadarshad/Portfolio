'use client';

import { Float, MeshDistortMaterial, Stars, Sparkles } from '@react-three/drei';
import { BillboardText } from '../canvas/BillboardText';
import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function FashionConstellation() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
        }
    });

    return (
        <group ref={groupRef} position={[20, 0, -20]}>
            <Stars radius={50} depth={20} count={2000} factor={2} saturation={1} fade speed={2} />
            <Sparkles count={50} scale={10} size={2} speed={0.4} color="#fbcfe8" />

            {[...Array(12)].map((_, i) => (
                <Float key={i} speed={2} rotationIntensity={2} floatIntensity={2} position={[
                    Math.sin(i * 1.5) * 6,
                    Math.cos(i * 2) * 5,
                    Math.cos(i * 1.5) * 6
                ]}>
                    <mesh castShadow>
                        <sphereGeometry args={[0.2, 16, 16]} />
                        <meshStandardMaterial
                            color={i % 3 === 0 ? '#00f2ff' : '#8b5cf6'}
                            emissive={i % 3 === 0 ? '#00f2ff' : '#8b5cf6'}
                            emissiveIntensity={1}
                        />
                    </mesh>
                    {/* Connecting strings could be added here for more detail */}
                </Float>
            ))}

            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 8, 32]} />
                <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} />
            </mesh>
            <Float speed={1} rotationIntensity={1} floatIntensity={1}>
                <mesh position={[0, 3, 0]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} />
                </mesh>
            </Float>

            {/* Interactive Info */}
            <Float speed={3} rotationIntensity={0.5} floatIntensity={1} position={[0, -4, 0]}>
                <group
                    onClick={() => window.open('https://github.com/eyadarshad', '_blank')}
                    onPointerOver={() => (document.body.style.cursor = 'pointer')}
                    onPointerOut={() => (document.body.style.cursor = 'none')}
                >
                    <BillboardText
                        fontSize={0.8}
                        color="#00f2ff"
                        anchorX="center"
                        anchorY="middle"
                        maxWidth={10}
                    >
                        NEURAL CLOUD
                    </BillboardText>
                    <mesh position={[0, -1, 0]}>
                        <sphereGeometry args={[0.1, 16, 16]} />
                        <meshBasicMaterial color="#00f2ff" />
                    </mesh>
                    <BillboardText
                        position={[0, -1.5, 0]}
                        fontSize={0.2}
                        color="white"
                        fillOpacity={0.5}
                    >
                        CLICK TO VIEW ARCHITECTURE
                    </BillboardText>
                </group>
                <BillboardText
                    position={[0, -3, 0]}
                    fontSize={0.3}
                    color="white"
                    maxWidth={6}
                    textAlign="center"
                    fillOpacity={0.8}
                >
                    Neural Cloud: Decentralized AI frameworks and deep learning models for complex decision landscapes.
                </BillboardText>
            </Float>
        </group>
    );
}
