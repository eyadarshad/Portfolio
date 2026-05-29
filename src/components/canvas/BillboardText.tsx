'use client';

import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { ComponentProps } from 'react';

type BillboardTextProps = ComponentProps<typeof Text>;

export function BillboardText(props: BillboardTextProps) {
    const textRef = useRef<any>(null);

    useFrame((state) => {
        if (textRef.current) {
            // Make the text face the camera
            textRef.current.quaternion.copy(state.camera.quaternion);
        }
    });

    return <Text ref={textRef} {...props} />;
}
