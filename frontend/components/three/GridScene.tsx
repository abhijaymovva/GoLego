'use client';

import React, { useState } from 'react';
import { useThree } from '@react-three/fiber';
import { useBrickStore } from '@/store/brickStore';
import * as THREE from 'three';
import { v4 as uuidv4 } from 'uuid'; // You'll need to add uuid if you want real uuids, or use simple random for now

// Simple brick component placeholder
const BrickMesh = ({ position, color, size }: { position: [number, number, number], color: string, size: [number, number, number] }) => {
  return (
    <mesh position={new THREE.Vector3(...position)} castShadow receiveShadow>
      <boxGeometry args={[size[0], size[1], size[2]]} />
      <meshStandardMaterial color={color} />
      {/* Studs could go here */}
    </mesh>
  );
};

export default function GridScene() {
  const { currentBuild, addBrick, selectedBrickTypeId, selectedColor, availableBrickTypes } = useBrickStore();
  const [hoverPos, setHoverPos] = useState<[number, number, number] | null>(null);

  const selectedType = availableBrickTypes.find(t => t.id === selectedBrickTypeId);

  const handlePointerMove = (e: any) => {
    // Basic snap to grid logic
    // Assuming 1 unit = 1 stud width for simplicity in this skeleton
    // In real LEGO, vertical is different ratio. 
    e.stopPropagation();
    const x = Math.round(e.point.x);
    const z = Math.round(e.point.z);
    const y = 0.5; // Base height
    setHoverPos([x, y, z]);
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (hoverPos && selectedType) {
      // Mock ID generation
      const newId = Math.random().toString(36).substr(2, 9);
      
      addBrick({
        id: newId,
        typeId: selectedType.id,
        colorId: selectedColor,
        position: hoverPos,
        rotation: [0, 0, 0]
      });
    }
  };

  return (
    <group>
      {/* Ground Grid */}
      <gridHelper args={[20, 20]} />
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.01, 0]} 
        receiveShadow
        onPointerMove={handlePointerMove}
        onClick={handleClick}
      >
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {/* Render existing bricks */}
      {currentBuild.bricks.map((brick) => {
        const type = availableBrickTypes.find(t => t.id === brick.typeId);
        if (!type) return null;
        // Size mapping: Width * 1, Height * 0.33 (approx), Depth * 1
        // Just using 1,1,1 for skeleton simplicity unless defined
        const width = type.studWidth;
        const depth = type.studDepth;
        const height = type.heightUnits * 0.33; 
        
        return (
          <BrickMesh 
            key={brick.id}
            position={brick.position}
            color={brick.colorId}
            size={[width, height, depth]}
          />
        );
      })}

      {/* Ghost Brick (Placement Preview) */}
      {hoverPos && selectedType && (
        <mesh position={new THREE.Vector3(...hoverPos)}>
           <boxGeometry args={[selectedType.studWidth, selectedType.heightUnits * 0.33, selectedType.studDepth]} />
           <meshStandardMaterial color={selectedColor} transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  );
}

