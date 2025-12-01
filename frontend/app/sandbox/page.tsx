'use client';

import AppLayout from '@/components/layout/AppLayout';
import SceneCanvas from '@/components/three/SceneCanvas';
import GridScene from '@/components/three/GridScene';
import { useBrickStore } from '@/store/brickStore';

export default function SandboxPage() {
  const { availableBrickTypes, selectedBrickTypeId, setSelectedBrickType, selectedColor, setSelectedColor } = useBrickStore();

  return (
    <AppLayout>
      <div className="relative w-full h-full">
        {/* 3D Scene */}
        <SceneCanvas>
          <GridScene />
        </SceneCanvas>

        {/* HUD / Overlay Controls */}
        <div className="absolute top-4 right-4 bg-white/90 p-4 rounded-lg shadow-lg backdrop-blur-sm w-64">
          <h2 className="font-bold mb-2">Tools</h2>
          
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1">Brick Type</label>
            <div className="grid grid-cols-3 gap-2">
              {availableBrickTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedBrickType(type.id)}
                  className={`p-2 text-xs border rounded ${selectedBrickTypeId === type.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Color</label>
            <div className="flex gap-2">
              {['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FFFFFF', '#333333'].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 ${selectedColor === color ? 'border-gray-900' : 'border-transparent'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 p-2 rounded pointer-events-none">
          Click on grid to place brick. <br/>
          Orbit: Left Click Drag. Pan: Right Click Drag.
        </div>
      </div>
    </AppLayout>
  );
}

