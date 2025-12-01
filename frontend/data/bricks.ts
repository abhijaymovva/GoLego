import { BrickType } from '@/types/bricks';

export const BRICK_TYPES: BrickType[] = [
  { id: '2x4', name: '2x4 Brick', studWidth: 2, studDepth: 4, heightUnits: 3, color: '#FF0000' },
  { id: '2x2', name: '2x2 Brick', studWidth: 2, studDepth: 2, heightUnits: 3, color: '#00FF00' },
  { id: '1x4', name: '1x4 Brick', studWidth: 1, studDepth: 4, heightUnits: 3, color: '#0000FF' },
  { id: '1x2', name: '1x2 Brick', studWidth: 1, studDepth: 2, heightUnits: 3, color: '#FFFF00' },
  { id: '1x1', name: '1x1 Brick', studWidth: 1, studDepth: 1, heightUnits: 3, color: '#FFFFFF' },
];

export const BRICK_COLORS = [
  '#C91A09', // Red
  '#237841', // Green
  '#0055BF', // Blue
  '#F2CD37', // Yellow
  '#F2F3F2', // White
  '#1B2A34', // Black
];

