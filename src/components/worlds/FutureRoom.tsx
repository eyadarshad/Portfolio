'use client';

import { Float, Stars } from '@react-three/drei';
import { BillboardText } from '../canvas/BillboardText';
import { useRef } from 'react';
import * as THREE from 'three';

export function FutureRoom() {
    return (
        <group position={[-20, 0, 20]}>
            <gridHelper args={[20, 20, '#ffffff', '#1a1a1a']} rotation={[Math.PI / 2, 0, 0]} material-transparent material-opacity={0.2} />
            <Stars radius={30} depth={10} count={1000} factor={1} saturation={0} fade speed={1} />

            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <group
                    onClick={() => window.open('https://github.com/eyadarshad', '_blank')}
                    onPointerOver={() => (document.body.style.cursor = 'pointer')}
                    onPointerOut={() => (document.body.style.cursor = 'none')}
                >
                    <mesh>
                        <sphereGeometry args={[2, 32, 32]} />
                        <meshStandardMaterial color="#0088ff" wireframe opacity={0.3} transparent />
                    </mesh>
                    <BillboardText
                        position={[0, 4, 0]}
                        fontSize={1}
                        color="#0088ff"
                        anchorY="bottom"
                    >
                        THE FUTURE
                    </BillboardText>
                    <BillboardText
                        position={[0, -2.5, 0]}
                        fontSize={0.2}
                        color="#0088ff"
                        fillOpacity={0.8}
                    >
                        CLICK TO VIEW AMBITIONS
                    </BillboardText>
                </group>
                <BillboardText
                    position={[0, -2, 0]}
                    fontSize={0.3}
                    color="white"
                    maxWidth={6}
                    textAlign="center"
                    fillOpacity={0.8}
                >
                    Half-built dreams and blueprints for the next era of decentralized AI.
                </BillboardText>
            </Float>

            {['STARTUPS', 'AI AGENTS', '3D WEB', 'NEURAL INTERFACE', 'CREATIVE FREEDOM'].map((dream, i) => (
                <Float key={i} position={[
                    Math.sin(i * 1.3) * 6,
                    Math.cos(i * 1.1) * 4,
                    Math.cos(i * 1.3) * 6
                ]} speed={3}>
                    <mesh>
                        <octahedronGeometry args={[0.3, 0]} />
                        <meshBasicMaterial color="#0088ff" wireframe />
                    </mesh>
                    <BillboardText position={[0, 0.5, 0]} fontSize={0.15} color="#0088ff">
                        {dream}
                    </BillboardText>
                </Float>
            ))}

            <mesh position={[10, 15, -10]}>
                <circleGeometry args={[5, 64]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
            </mesh>
        </group>
    );
}
