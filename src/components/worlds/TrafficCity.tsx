'use client';

import { Float, ContactShadows } from '@react-three/drei';
import { BillboardText } from '../canvas/BillboardText';
import { useRef } from 'react';
import * as THREE from 'three';

export function TrafficCity() {
    const groupRef = useRef<THREE.Group>(null);

    // Generate random buildings
    const buildings = [...Array(40)].map((_, i) => ({
        position: [
            (Math.random() - 0.5) * 20,
            0,
            (Math.random() - 0.5) * 20
        ],
        scale: [
            1 + Math.random() * 2,
            2 + Math.random() * 10,
            1 + Math.random() * 2
        ],
        color: Math.random() > 0.8 ? '#8b5cf6' : '#1a1a1a'
    }));

    return (
        <group ref={groupRef} position={[0, -5, 0]}>
            {/* City Base */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[40, 40]} />
                <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.8} />
            </mesh>

            {/* Grid Lines (The Traffic) */}
            <gridHelper args={[40, 40, '#8b5cf6', '#1a1a1a']} position={[0, 0.01, 0]} />

            {/* Buildings */}
            {buildings.map((b, i) => (
                <mesh key={i} position={[b.position[0], b.scale[1] / 2, b.position[2]]} castShadow receiveShadow>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial
                        color={b.color}
                        roughness={0.1}
                        metalness={0.5}
                        emissive={b.color === '#8b5cf6' ? '#8b5cf6' : '#000000'}
                        emissiveIntensity={0.2}
                    />
                </mesh>
            ))}

            {/* Floating Project Info (Holograph) */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={[0, 10, 0]}>
                <group
                    onClick={() => window.open('https://github.com/eyadarshad', '_blank')}
                    onPointerOver={() => (document.body.style.cursor = 'pointer')}
                    onPointerOut={() => (document.body.style.cursor = 'none')}
                >
                    <BillboardText
                        fontSize={1}
                        color="#8b5cf6"
                        anchorX="center"
                        anchorY="middle"
                        maxWidth={10}
                    >
                        AI TRAFFIC MANAGEMENT
                    </BillboardText>
                    <mesh position={[0, -1, 0]}>
                        <planeGeometry args={[8, 0.05]} />
                        <meshBasicMaterial color="#8b5cf6" opacity={0.6} transparent />
                    </mesh>

                    {/* Clickable Orb */}
                    <mesh position={[0, -1.8, 0]}>
                        <sphereGeometry args={[0.15, 32, 16]} />
                        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={4} />
                    </mesh>
                    <BillboardText
                        position={[0, -2.4, 0]}
                        fontSize={0.2}
                        color="white"
                        fillOpacity={0.5}
                    >
                        CLICK ORB TO VIEW PROJECT
                    </BillboardText>
                </group>

                <BillboardText
                    position={[0, -4, 0]}
                    fontSize={0.4}
                    color="white"
                    maxWidth={8}
                    textAlign="center"
                >
                    Optimizing urban flow through decentralized intelligence. Real-time YOLO detection & predictive routing.
                </BillboardText>
            </Float>

            <ContactShadows opacity={0.4} scale={40} blur={2.4} far={10} />
        </group>
    );
}
