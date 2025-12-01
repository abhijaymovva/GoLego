'use client';

import React, { useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useBrickStore } from '@/store/brickStore';
import * as THREE from 'three';

// Simple brick component
const BrickMesh = ({ 
  data, 
  size, 
  isSelected,
  onClick 
}: { 
  data: any, 
  size: [number, number, number], 
  isSelected: boolean,
  onClick: (e: any) => void 
}) => {
  return (
    <mesh 
      position={new THREE.Vector3(...data.position)} 
      rotation={new THREE.Euler(...data.rotation)}
      onClick={onClick}
      castShadow 
      receiveShadow
    >
      <boxGeometry args={[size[0], size[1], size[2]]} />
      <meshStandardMaterial 
        color={data.colorId} 
        emissive={isSelected ? '#444444' : '#000000'}
      />
      {/* Selection Highlight */}
      {isSelected && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(size[0], size[1], size[2])]} />
          <lineBasicMaterial color="white" />
        </lineSegments>
      )}
    </mesh>
  );
};

export default function GridScene() {
  const { 
    currentBuild, 
    addBrick, 
    updateBrick,
    removeBrick,
    selectedBrickTypeId, 
    selectedColor, 
    availableBrickTypes,
    selectedInstanceId,
    setSelectedInstanceId
  } = useBrickStore();
  
  const [hoverPos, setHoverPos] = useState<[number, number, number] | null>(null);

  // Helper to get size
  const getTypeSize = (typeId: string): [number, number, number] => {
    const t = availableBrickTypes.find(x => x.id === typeId);
    if (!t) return [1, 1, 1];
    return [t.studWidth, t.heightUnits * 0.32, t.studDepth]; // 0.32 approx unit height
  };

  const selectedType = availableBrickTypes.find(t => t.id === selectedBrickTypeId);

  const handlePointerMove = (e: any) => {
    e.stopPropagation();
    // Snap to grid
    const x = Math.round(e.point.x);
    const z = Math.round(e.point.z);
    const y = 0.5 * 0.32; // Base height (half of unit height roughly)
    setHoverPos([x, y, z]);
  };

  const handleGridClick = (e: any) => {
    e.stopPropagation();
    if (!hoverPos) return;

    if (selectedInstanceId) {
      // Move Mode
      const instance = currentBuild.bricks.find(b => b.id === selectedInstanceId);
      if (instance) {
        // We keep rotation, just update position
        // Need to adjust Y based on height of brick? For now keep flat on ground.
        const type = availableBrickTypes.find(t => t.id === instance.typeId);
        const y = (type?.heightUnits || 3) * 0.32 * 0.5;
        
        updateBrick({
          ...instance,
          position: [hoverPos[0], y, hoverPos[2]]
        });
      }
    } else if (selectedType) {
      // Place Mode
      const newId = Math.random().toString(36).substr(2, 9);
      const y = selectedType.heightUnits * 0.32 * 0.5;
      
      addBrick({
        id: newId,
        typeId: selectedType.id,
        colorId: selectedColor,
        position: [hoverPos[0], y, hoverPos[2]],
        rotation: [0, 0, 0]
      });
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedInstanceId) return;

      if (e.key === 'Backspace' || e.key === 'Delete') {
        removeBrick(selectedInstanceId);
      } else if (e.key.toLowerCase() === 'r') {
        const instance = currentBuild.bricks.find(b => b.id === selectedInstanceId);
        if (instance) {
          const currentRot = instance.rotation[1];
          updateBrick({
            ...instance,
            rotation: [0, currentRot + Math.PI / 2, 0]
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedInstanceId, currentBuild.bricks, removeBrick, updateBrick]);

  return (
    <group>
      {/* Step 1: Origin Marker */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshBasicMaterial color="red" />
      </mesh>

      {/* Ground Grid */}
      <gridHelper args={[40, 40]} />
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.01, 0]} 
        receiveShadow
        onPointerMove={handlePointerMove}
        onClick={handleGridClick}
      >
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {/* Render existing bricks */}
      {currentBuild.bricks.map((brick) => {
        const size = getTypeSize(brick.typeId);
        return (
          <BrickMesh 
            key={brick.id}
            data={brick}
            size={size}
            isSelected={selectedInstanceId === brick.id}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedInstanceId(brick.id);
            }}
          />
        );
      })}

      {/* Ghost Brick (Placement Preview) */}
      {!selectedInstanceId && hoverPos && selectedType && (
        <mesh position={[hoverPos[0], selectedType.heightUnits * 0.32 * 0.5, hoverPos[2]]}>
           <boxGeometry args={getTypeSize(selectedType.id)} />
           <meshStandardMaterial color={selectedColor} transparent opacity={0.5} />
        </mesh>
      )}
      
      {/* Ghost Brick (Move Preview) */}
      {selectedInstanceId && hoverPos && (
         <mesh position={[hoverPos[0], 0.5, hoverPos[2]]}>
           <boxGeometry args={[1, 1, 1]} /> {/* Generic cursor for move */}
           <meshStandardMaterial color="white" wireframe />
        </mesh>
      )}
    </group>
  );
}
