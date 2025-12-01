import { create } from 'zustand';
import { BrickInstance, BrickType, Build } from '@/types/bricks';

interface BrickState {
  // State
  availableBrickTypes: BrickType[];
  currentBuild: Build;
  selectedBrickTypeId: string | null;
  selectedColor: string;
  
  // Actions
  setAvailableBrickTypes: (types: BrickType[]) => void;
  setSelectedBrickType: (typeId: string | null) => void;
  setSelectedColor: (color: string) => void;
  addBrick: (brick: BrickInstance) => void;
  updateBrick: (brick: BrickInstance) => void;
  removeBrick: (brickId: string) => void;
  loadBuild: (build: Build) => void;
  resetBuild: () => void;
}

// Placeholder data
const DEFAULT_BRICK_TYPES: BrickType[] = [
  { id: '2x4', name: '2x4 Brick', studWidth: 2, studDepth: 4, heightUnits: 3, color: '#FF0000' },
  { id: '2x2', name: '2x2 Brick', studWidth: 2, studDepth: 2, heightUnits: 3, color: '#00FF00' },
  { id: '1x2', name: '1x2 Brick', studWidth: 1, studDepth: 2, heightUnits: 3, color: '#0000FF' },
];

export const useBrickStore = create<BrickState>((set) => ({
  availableBrickTypes: DEFAULT_BRICK_TYPES,
  currentBuild: {
    id: 'draft',
    name: 'New Build',
    bricks: [],
  },
  selectedBrickTypeId: '2x4',
  selectedColor: '#FF0000',

  setAvailableBrickTypes: (types) => set({ availableBrickTypes: types }),
  setSelectedBrickType: (typeId) => set({ selectedBrickTypeId: typeId }),
  setSelectedColor: (color) => set({ selectedColor: color }),
  
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
    currentBuild: {
      ...state.currentBuild,
      bricks: state.currentBuild.bricks.filter((b) => b.id !== brickId),
    },
  })),

  loadBuild: (build) => set({ currentBuild: build }),
  
  resetBuild: () => set({ 
    currentBuild: { id: 'draft', name: 'New Build', bricks: [] } 
  }),
}));

