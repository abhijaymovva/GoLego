'use client';

import AppLayout from '@/components/layout/AppLayout';
import SceneCanvas from '@/components/three/SceneCanvas';
import GridScene from '@/components/three/GridScene';
import BrickPalette from '@/components/ui/BrickPalette';
import { useBrickStore } from '@/store/brickStore';

export default function SandboxPage() {
  const { saveLocal, loadLocal, saveToServer, loadFromServer, resetBuild } = useBrickStore();

  return (
    <AppLayout>
      <div className="relative w-full h-full">
        {/* 3D Scene */}
        <SceneCanvas>
          <GridScene />
        </SceneCanvas>

        {/* Palette & Tools */}
        <BrickPalette />

        {/* Toolbar */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
           <div className="bg-white/90 p-2 rounded-lg shadow-lg backdrop-blur-sm flex gap-2">
             <button onClick={saveLocal} className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300">Save Local</button>
             <button onClick={loadLocal} className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300">Load Local</button>
             <button onClick={resetBuild} className="px-3 py-1 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200">Clear</button>
           </div>
           
           <div className="bg-white/90 p-2 rounded-lg shadow-lg backdrop-blur-sm flex gap-2">
             <button onClick={saveToServer} className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">Save to Cloud</button>
             <button onClick={() => {
               const id = prompt("Enter Build ID");
               if(id) loadFromServer(id);
             }} className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">Load from Cloud</button>
           </div>
        </div>

        <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 p-2 rounded pointer-events-none">
          Left Click: Place/Select <br/>
          Right Click: Pan <br/>
          Scroll: Zoom <br/>
          R: Rotate Selected <br/>
          Del: Delete Selected
        </div>
      </div>
    </AppLayout>
  );
}
