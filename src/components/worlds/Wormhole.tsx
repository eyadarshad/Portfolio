'use client';

import { Float, ContactShadows } from '@react-three/drei';
import { BillboardText } from '../canvas/BillboardText';
import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const PROJECTS = [
    { name: 'FITFOLIO', url: 'https://github.com/eyadarshad/Fitfolio/', color: '#00f2ff', desc: 'AI Wardrobe Matching' },
    { name: 'HELIX', url: 'https://github.com/eyadarshad/HELIX', color: '#00f2ff', desc: 'Malware Detection' },
    { name: 'DEATH REALM', url: 'https://github.com/eyadarshad/DEATH-REALM', color: '#00f2ff', desc: 'Atmospheric Gaming' },
    { name: 'ATMS', url: 'https://github.com/eyadarshad/Advanced-Traffic-Management-System', color: '#00f2ff', desc: 'Urban Intelligence' },
    { name: 'UTILISOFT', url: 'https://github.com/eyadarshad/UtiliSOFT-DB-ManagementSystem', color: '#00f2ff', desc: 'Database Engineering' },
];

export function Wormhole() {
    const groupRef = useRef<THREE.Group>(null);
    const tubeRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (tubeRef.current) {
            tubeRef.current.rotation.z += 0.05;
            tubeRef.current.rotation.y += 0.01;
        }
    });

    return (
        <group position={[0, -50, 0]}>
            {/* 🌀 REFERENCE MATCH: THE CYAN GRID WORMHOLE */}

            {/* The Central Hub / Singularity */}
            <mesh>
                <sphereGeometry args={[2, 32, 32]} />
                <meshBasicMaterial color="#00f2ff" />
            </mesh>

            {/* The Grid Tube (Dual Torus for the hourglass look) */}
            <mesh ref={tubeRef} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[8, 3, 32, 100]} />
                <meshBasicMaterial
                    color="#00f2ff"
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Outer shell glow */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[8.1, 3.1, 16, 64]} />
                <meshBasicMaterial
                    color="#00f2ff"
                    wireframe
                    transparent
                    opacity={0.05}
                />
            </mesh>

            {/* Floating Project Portals */}
            <group ref={groupRef}>
                {PROJECTS.map((p, i) => {
                    const angle = (i / PROJECTS.length) * Math.PI * 2;
                    const radius = 12;
                    return (
                        <Float key={i} speed={4} rotationIntensity={1} floatIntensity={1} position={[
                            Math.cos(angle) * radius,
                            Math.sin(angle) * radius,
                            Math.sin(i * 0.5) * 8
                        ]}>
                            <group
                                onClick={() => window.open(p.url, '_blank')}
                                onPointerOver={() => (document.body.style.cursor = 'pointer')}
                                onPointerOut={() => (document.body.style.cursor = 'none')}
                            >
                                {/* Modern clean project card */}
                                <mesh castShadow>
                                    <boxGeometry args={[2, 1.2, 0.05]} />
                                    <meshStandardMaterial
                                        color="#050505"
                                        emissive="#00f2ff"
                                        emissiveIntensity={0.2}
                                        roughness={0}
                                        metalness={1}
                                    />
                                </mesh>

                                {/* Glowing border */}
                                <mesh position={[0, 0, -0.01]}>
                                    <boxGeometry args={[2.05, 1.25, 0.02]} />
                                    <meshBasicMaterial color="#00f2ff" />
                                </mesh>

                                <BillboardText
                                    position={[0, 0, 0.06]}
                                    fontSize={0.22}
                                    color="white"
                                    anchorY="middle"
                                    letterSpacing={0.1}
                                >
                                    {p.name}
                                </BillboardText>

                                <BillboardText
                                    position={[0, -1, 0]}
                                    fontSize={0.15}
                                    color="#00f2ff"
                                    fillOpacity={0.6}
                                    maxWidth={2.5}
                                    textAlign="center"
                                    letterSpacing={0.05}
                                >
                                    {p.desc}
                                </BillboardText>
                            </group>
                        </Float>
                    );
                })}
            </group>

            <BillboardText
                position={[0, 18, 0]}
                fontSize={2}
                color="#ffffff"
                maxWidth={20}
                textAlign="center"
                letterSpacing={0.3}
            >
                THE TRANSCENDENCE
            </BillboardText>
            <BillboardText
                position={[0, 15, 0]}
                fontSize={0.4}
                color="#00f2ff"
                fillOpacity={0.4}
                letterSpacing={1.2}
            >
                ALL PROJECTS CONVERGE IN THE SINGULARITY
            </BillboardText>

            <ContactShadows position={[0, -20, 0]} opacity={0.4} scale={50} blur={2.4} far={10} color="#00f2ff" />
        </group>
    );
}
