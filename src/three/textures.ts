import * as THREE from 'three';

// Cache for textures to avoid recreating them
const textureCache = new Map<string, THREE.CanvasTexture>();

export function createGradientTexture(color1: string, color2: string, color3: string): THREE.CanvasTexture {
  const cacheKey = `${color1}-${color2}-${color3}`;
  
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  
  const gradient = ctx.createLinearGradient(0, 0, 512, 512);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(0.5, color2);
  gradient.addColorStop(1, color3);
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);
  
  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(cacheKey, texture);
  
  return texture;
}

// Predefined gradient combinations
export const CARD_GRADIENTS = {
  front: ['#6366f1', '#8b5cf6', '#d946ef'] as const,
  back: ['#06b6d4', '#3b82f6', '#6366f1'] as const
} as const;

export function getCardTextures() {
  return {
    front: createGradientTexture(...CARD_GRADIENTS.front),
    back: createGradientTexture(...CARD_GRADIENTS.back)
  };
}
