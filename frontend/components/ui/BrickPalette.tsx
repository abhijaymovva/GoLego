'use client';

import React from 'react';
import { useBrickStore } from '@/store/brickStore';

export default function BrickPalette() {
  const { 
    availableBrickTypes, 
    availableColors, 
    selectedBrickTypeId, 
    setSelectedBrickType, 
    selectedColor, 
    setSelectedColor,
    selectedInstanceId
  } = useBrickStore();

  return (
    <div className="absolute top-4 right-4 bg-white/90 p-4 rounded-lg shadow-lg backdrop-blur-sm w-64 max-h-[90vh] overflow-y-auto">
      <h2 className="font-bold mb-2">Brick Palette</h2>
      
      {selectedInstanceId ? (
        <div className="mb-4 p-2 bg-blue-100 rounded text-sm">
          <p className="font-semibold">Brick Selected</p>
          <p>Click grid to move.</p>
          <p>Press 'R' to rotate.</p>
          <p>Press 'Delete' to remove.</p>
          <button 
            onClick={() => setSelectedBrickType(availableBrickTypes[0].id)}
            className="mt-2 text-blue-600 underline"
          >
            Cancel Selection
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1">Type</label>
            <div className="grid grid-cols-2 gap-2">
              {availableBrickTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedBrickType(type.id)}
                  className={`p-2 text-xs border rounded flex flex-col items-center gap-1 ${selectedBrickTypeId === type.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <span className="font-bold">{type.name}</span>
                  <span className="text-[10px] text-gray-400">{type.studWidth}x{type.studDepth}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1">Color</label>
            <div className="flex flex-wrap gap-2">
              {availableColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 shadow-sm ${selectedColor === color ? 'border-gray-900 scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

