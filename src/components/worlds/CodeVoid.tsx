'use client';

import { Float, Sparkles } from '@react-three/drei';
import { BillboardText } from '../canvas/BillboardText';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function CodeVoid() {
    const groupRef = useRef<THREE.Group>(null);

    const nodes = useMemo(() => [...Array(50)].map((_, i) => ({
        position: [
            (Math.random() - 0.5) * 20,
            Math.random() * 20,
            (Math.random() - 0.5) * 10
        ],
        speed: 0.05 + Math.random() * 0.1,
        char: String.fromCharCode(Math.floor(Math.random() * 128))
    })), []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.children.forEach((child, i) => {
                if (i < nodes.length) {
                    child.position.y -= nodes[i].speed;
                    if (child.position.y < -10) child.position.y = 10;
                }
            });
        }
    });

    return (
        <group ref={groupRef} position={[-20, 0, -20]}>
            <Sparkles count={100} scale={15} size={1} speed={0.2} color="#00ff00" />

            {nodes.map((node, i) => (
                <BillboardText
                    key={i}
                    position={node.position as [number, number, number]}
                    fontSize={0.2}
                    color="#00ff00"
                    fillOpacity={0.3}
                >
                    {node.char}
                </BillboardText>
            ))}

            {/* Central Interactive GitHub Node */}
            <Float speed={4} rotationIntensity={2} floatIntensity={2}>
                <group
                    onClick={() => window.open('https://github.com/eyadarshad', '_blank')}
                    onPointerOver={() => (document.body.style.cursor = 'pointer')}
                    onPointerOut={() => (document.body.style.cursor = 'none')}
                >
                    <mesh>
                        <sphereGeometry args={[1, 32, 32]} />
                        <meshBasicMaterial color="#ffffff" wireframe />
                    </mesh>
                    <BillboardText
                        position={[0, 2, 0]}
                        fontSize={0.6}
                        color="#ffffff"
                        anchorY="bottom"
                    >
                        CODE VOID
                    </BillboardText>
                    <BillboardText
                        position={[0, -1.8, 0]}
                        fontSize={0.2}
                        color="#00ff88"
                        fillOpacity={0.8}
                    >
                        CLICK TO EXPLORE REPOS
                    </BillboardText>
                </group>
                <BillboardText
                    position={[0, -2.5, 0]}
                    fontSize={0.25}
                    color="#00ff88"
                    maxWidth={5}
                    textAlign="center"
                >
                    MALWARE DETECTION | HELIX | FULLSTACK
                </BillboardText>
            </Float>

            {['PYTHON', 'REACT', 'NEXT.JS', 'TENSORFLOW', 'SHADERS'].map((tech, i) => (
                <Float key={i} position={[
                    Math.sin(i) * 5,
                    Math.cos(i) * 3,
                    Math.cos(i) * 5
                ]} speed={2}>
                    <BillboardText fontSize={0.2} color="#00ff88">
                        {tech}
                    </BillboardText>
                </Float>
            ))}
        </group>
    );
}
