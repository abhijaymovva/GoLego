'use client';

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

interface SceneCanvasProps {
  children: React.ReactNode;
}

export default function SceneCanvas({ children }: SceneCanvasProps) {
  return (
    <div className="w-full h-full bg-gray-900">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[10, 10, 10]} />
        <OrbitControls makeDefault />
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={1.5} 
          castShadow 
        />
        {children}
      </Canvas>
    </div>
  );
}

