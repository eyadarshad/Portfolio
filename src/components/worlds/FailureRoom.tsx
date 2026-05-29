'use client';

import { Float, MeshDistortMaterial } from '@react-three/drei';
import { BillboardText } from '../canvas/BillboardText';
import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function FailureRoom() {
    const groupRef = useRef<THREE.Group>(null);

    const fragments = [...Array(15)].map((_, i) => ({
        position: [
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        speed: 0.2 + Math.random() * 0.5
    }));

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.children.forEach((child, i) => {
                if (i < fragments.length) {
                    child.rotation.x += fragments[i].speed * 0.01;
                    child.rotation.y += fragments[i].speed * 0.01;
                }
            });
        }
    });

    return (
        <group ref={groupRef} position={[20, 0, 20]}>
            {fragments.map((f, i) => (
                <mesh key={i} position={f.position as [number, number, number]} rotation={f.rotation as [number, number, number]}>
                    <boxGeometry args={[1 + Math.random(), 0.1, 1 + Math.random()]} />
                    <meshStandardMaterial
                        color="#2d2d2d"
                        metalness={0.5}
                        roughness={0.8}
                        transparent
                        opacity={0.6}
                    />
                </mesh>
            ))}

            <Float speed={5} rotationIntensity={3} floatIntensity={3}>
                <group
                    onPointerOver={() => (document.body.style.cursor = 'help')}
                    onPointerOut={() => (document.body.style.cursor = 'none')}
                >
                    <mesh>
                        <icosahedronGeometry args={[1.5, 0]} />
                        <MeshDistortMaterial
                            color="#ff0000"
                            speed={10}
                            distort={0.8}
                            radius={1}
                            emissive="#330000"
                            emissiveIntensity={2}
                        />
                    </mesh>
                    <BillboardText
                        position={[0, 3, 0]}
                        fontSize={0.8}
                        color="#ff3333"
                        anchorY="bottom"
                    >
                        FAILURE BUILT THIS
                    </BillboardText>
                </group>
            </Float>

            {['ABANDONED PROTOTYPES', 'UNDEFINED BUGS', 'LESSONS LEARNED', 'REFACTOR #42', 'STALE PROMISES'].map((lesson, i) => (
                <Float key={i} position={[
                    (Math.random() - 0.5) * 8,
                    (Math.random() - 0.5) * 8,
                    (Math.random() - 0.5) * 8
                ]} speed={4}>
                    <BillboardText fontSize={0.2} color="#ff3333" fillOpacity={0.4}>
                        {lesson}
                    </BillboardText>
                </Float>
            ))}
        </group>
    );
}
