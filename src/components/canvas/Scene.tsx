'use client';

import { Canvas } from '@react-three/fiber';
import { Stars, Environment, ContactShadows, ScrollControls } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Suspense } from 'react';
import { Cursor } from './Cursor';
import { CameraController } from './CameraController';
import { Blackhole } from '../worlds/Blackhole';
import { Wormhole } from '../worlds/Wormhole';

export function Scene({ children }: { children: React.ReactNode }) {
    return (
        <div className="fixed top-0 left-0 w-full h-full z-0 bg-black">
            <Canvas shadows dpr={[1, 2]}>
                {/* Lights */}
                <ambientLight intensity={0.2} />
                <spotLight position={[20, 20, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-20, -20, -10]} intensity={0.5} color="#8b5cf6" />
                <directionalLight position={[0, 10, 0]} intensity={0.5} />

                {/* Ambient surreal elements */}
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <fog attach="fog" args={['#050505', 10, 80]} />

                <Suspense fallback={null}>
                    <Environment preset="city" />

                    <ScrollControls pages={8} damping={0.2}>
                        {/* CameraController MUST be inside ScrollControls to access scroll data */}
                        <CameraController />
                        <Cursor />
                        {children}
                        <Blackhole />
                        <Wormhole />
                    </ScrollControls>

                    {/* Post Processing */}
                    <EffectComposer>
                        <Bloom
                            luminanceThreshold={0.1}
                            mipmapBlur
                            intensity={1.2}
                            radius={0.3}
                        />
                    </EffectComposer>
                </Suspense>

                {/* Global floor for shadows */}
                <ContactShadows
                    position={[0, -5, 0]}
                    opacity={0.4}
                    scale={100}
                    blur={2.4}
                    far={20}
                    color="#000000"
                />
            </Canvas>
        </div>
    );
}
