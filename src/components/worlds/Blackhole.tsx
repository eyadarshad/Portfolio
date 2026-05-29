'use client';

import { Float, MeshDistortMaterial, Stars, Sparkles } from '@react-three/drei';
import { BillboardText } from '../canvas/BillboardText';
import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function Blackhole() {
    const groupRef = useRef<THREE.Group>(null);
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005;
        }
        if (ringRef.current) {
            ringRef.current.rotation.z += 0.02;
        }
    });

    const links = [
        { name: 'GITHUB', url: 'https://github.com/eyadarshad', color: '#ffffff' },
        { name: 'LINKEDIN', url: 'https://linkedin.com/in/eyadarshad', color: '#0077b5' },
        { name: 'RESUME', url: '/resume.pdf', color: '#8b5cf6' },
        { name: 'CV', url: '/cv.pdf', color: '#fbcfe8' },
    ];

    return (
        <group position={[0, -10, 50]}>
            {/* Blackhole Core */}
            <mesh>
                <sphereGeometry args={[2, 32, 32]} />
                <meshBasicMaterial color="#000000" />
            </mesh>

            {/* Accretion Disk */}
            <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
                <ringGeometry args={[2.5, 4.5, 64]} />
                <MeshDistortMaterial
                    color="#8b5cf6"
                    emissive="#8b5cf6"
                    emissiveIntensity={2}
                    distort={0.4}
                    speed={5}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            <Sparkles count={200} scale={15} size={2} speed={0.5} color="#8b5cf6" />
            <Stars radius={50} depth={20} count={3000} factor={4} saturation={1} fade speed={1} />

            {/* Orbiting Links */}
            <group ref={groupRef}>
                {links.map((link, i) => {
                    const angle = (i / links.length) * Math.PI * 2;
                    const radius = 6;
                    return (
                        <Float key={i} speed={3} rotationIntensity={1} floatIntensity={1} position={[
                            Math.cos(angle) * radius,
                            Math.sin(angle) * 0.5,
                            Math.sin(angle) * radius
                        ]}>
                            <group
                                onClick={() => window.open(link.url, '_blank')}
                                onPointerOver={() => (document.body.style.cursor = 'pointer')}
                                onPointerOut={() => (document.body.style.cursor = 'none')}
                            >
                                <mesh>
                                    <octahedronGeometry args={[0.4, 0]} />
                                    <meshStandardMaterial color={link.color} emissive={link.color} emissiveIntensity={1} />
                                </mesh>
                                <BillboardText
                                    position={[0, 0.8, 0]}
                                    fontSize={0.4}
                                    color={link.color}
                                    anchorY="bottom"
                                >
                                    {link.name}
                                </BillboardText>
                                <BillboardText
                                    position={[0, -0.6, 0]}
                                    fontSize={0.12}
                                    color="white"
                                    fillOpacity={0.5}
                                >
                                    CLICK TO ACTION
                                </BillboardText>
                            </group>
                        </Float>
                    );
                })}
            </group>

            <BillboardText
                position={[0, 8, 0]}
                fontSize={1.5}
                color="#ffffff"
                maxWidth={20}
                textAlign="center"
            >
                THE FINAL HUB
            </BillboardText>
            <BillboardText
                position={[0, 6, 0]}
                fontSize={0.4}
                color="#8b5cf6"
                fillOpacity={0.8}
            >
                GRAVITY PULLS ALL TALENT TO THE CORE
            </BillboardText>
        </group>
    );
}
