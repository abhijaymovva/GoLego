import { create } from 'zustand';
import { BrickInstance, BrickType, Build } from '@/types/bricks';
import { BRICK_TYPES, BRICK_COLORS } from '@/data/bricks';
import * as api from '@/services/api';

interface BrickState {
  // State
  availableBrickTypes: BrickType[];
  availableColors: string[];
  currentBuild: Build;
  selectedBrickTypeId: string | null;
  selectedColor: string;
  selectedInstanceId: string | null; // For Step 4

  // Actions
  setSelectedBrickType: (typeId: string | null) => void;
  setSelectedColor: (color: string) => void;
  setSelectedInstanceId: (instanceId: string | null) => void; // For Step 4
  
  addBrick: (brick: BrickInstance) => void;
  updateBrick: (brick: BrickInstance) => void;
  removeBrick: (brickId: string) => void;
  
  loadBuild: (build: Build) => void;
  resetBuild: () => void;
  
  // Storage (Step 5 & 6)
  saveLocal: () => void;
  loadLocal: () => void;
  saveToServer: () => Promise<void>;
  loadFromServer: (id: string) => Promise<void>;
}

export const useBrickStore = create<BrickState>((set, get) => ({
  availableBrickTypes: BRICK_TYPES,
  availableColors: BRICK_COLORS,
  currentBuild: {
    id: 'draft',
    name: 'New Build',
    bricks: [],
  },
  selectedBrickTypeId: BRICK_TYPES[0].id,
  selectedColor: BRICK_COLORS[0],
  selectedInstanceId: null,

  setSelectedBrickType: (typeId) => set({ selectedBrickTypeId: typeId, selectedInstanceId: null }),
  setSelectedColor: (color) => set({ selectedColor: color }),
  setSelectedInstanceId: (instanceId) => set({ selectedInstanceId: instanceId, selectedBrickTypeId: null }), // Deselect type when selecting instance

  addBrick: (brick) => set((state) => ({
    currentBuild: {
      ...state.currentBuild,
      bricks: [...state.currentBuild.bricks, brick],
    },
  })),

  updateBrick: (updatedBrick) => set((state) => ({
    currentBuild: {
      ...state.currentBuild,
      bricks: state.currentBuild.bricks.map((b) => 
        b.id === updatedBrick.id ? updatedBrick : b
      ),
    },
  })),

  removeBrick: (brickId) => set((state) => ({
    selectedInstanceId: state.selectedInstanceId === brickId ? null : state.selectedInstanceId,
    currentBuild: {
      ...state.currentBuild,
      bricks: state.currentBuild.bricks.filter((b) => b.id !== brickId),
    },
  })),

  loadBuild: (build) => set({ currentBuild: build }),
  
  resetBuild: () => set({ 
    currentBuild: { id: 'draft', name: 'New Build', bricks: [] },
    selectedInstanceId: null
  }),

  // Step 5: Local Storage
  saveLocal: () => {
    const { currentBuild } = get();
    localStorage.setItem('golego_build', JSON.stringify(currentBuild));
    alert('Saved locally!');
  },

  loadLocal: () => {
    const data = localStorage.getItem('golego_build');
    if (data) {
      try {
        const build = JSON.parse(data);
        set({ currentBuild: build });
      } catch (e) {
        console.error('Failed to load build', e);
      }
    }
  },

  // Step 6: Server Storage
  saveToServer: async () => {
    const { currentBuild } = get();
    try {
      const saved = await api.saveBuild(currentBuild);
      set({ currentBuild: saved }); // Update with ID if new
      alert(`Saved to server! ID: ${saved.id}`);
    } catch (e) {
      console.error(e);
      alert('Failed to save to server');
    }
  },

  loadFromServer: async (id: string) => {
    try {
      const build = await api.getBuild(id);
      set({ currentBuild: build });
    } catch (e) {
      console.error(e);
      alert('Failed to load from server');
    }
  }
}));
