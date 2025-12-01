'use client';

import React, { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SceneCanvas from '@/components/three/SceneCanvas';
import GridScene from '@/components/three/GridScene';
import BrickPalette from '@/components/ui/BrickPalette';
import { useBrickStore } from '@/store/brickStore';
import { getChallenge } from '@/services/api';
import { BrickInstance } from '@/types/bricks';

export default function ChallengePage() {
  const { resetBuild, currentBuild } = useBrickStore();
  const [challenge, setChallenge] = useState<any>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'failure'>('idle');

  useEffect(() => {
    resetBuild();
    // Fetch challenge 1 hardcoded
    getChallenge('1').then(setChallenge).catch(console.error);
  }, [resetBuild]);

  const checkBuild = () => {
    if (!challenge) return;
    
    const targetBricks: BrickInstance[] = challenge.targetBuild.bricks;
    const userBricks = currentBuild.bricks;

    if (userBricks.length !== targetBricks.length) {
      setStatus('failure');
      return;
    }

    // Simple check: for every target brick, is there a matching user brick?
    // We need to be loose on ID, but strict on Type, Color, Position, Rotation
    const matched = targetBricks.every(t => {
      return userBricks.some(u => 
        u.typeId === t.typeId &&
        u.colorId === t.colorId &&
        Math.abs(u.position[0] - t.position[0]) < 0.1 &&
        Math.abs(u.position[1] - t.position[1]) < 0.1 &&
        Math.abs(u.position[2] - t.position[2]) < 0.1
        // Ignore rotation exact match for now if symmetric, but let's assume loose check
      );
    });

    setStatus(matched ? 'success' : 'failure');
  };

  if (!challenge) return <AppLayout><div className="p-8">Loading...</div></AppLayout>;

  return (
    <AppLayout>
      <div className="relative w-full h-full">
        <SceneCanvas>
          <GridScene />
          {/* Render Ghost Target? Optional, maybe just show instructions */}
        </SceneCanvas>

        <BrickPalette />

        <div className="absolute top-4 left-4 w-80 bg-white/90 p-4 rounded-lg shadow-lg backdrop-blur-sm">
          <h1 className="font-bold text-lg">{challenge.title}</h1>
          <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>
          
          <div className="mb-4">
            <h3 className="font-semibold text-xs uppercase text-gray-500">Allowed Parts</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {challenge.allowed_parts.map((p: any) => (
                <span key={p.part_id} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {p.part_id} (x{p.max_quantity})
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={checkBuild}
              className="flex-1 bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700"
            >
              Check Build
            </button>
          </div>

          {status === 'success' && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded text-center font-bold">
              Challenge Complete! 🎉
            </div>
          )}
          {status === 'failure' && (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded text-center">
              Not quite right. Try again!
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
