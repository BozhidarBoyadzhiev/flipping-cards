import * as THREE from 'three';
import { getCardTextures } from './textures';

// Cache for materials to avoid recreating them
const materialCache = new Map<string, THREE.Material>();

export function createCardMaterial(type: 'front' | 'back'): THREE.MeshPhysicalMaterial {
  const cacheKey = `card-${type}`;
  
  if (materialCache.has(cacheKey)) {
    return materialCache.get(cacheKey) as THREE.MeshPhysicalMaterial;
  }

  const textures = getCardTextures();
  const texture = type === 'front' ? textures.front : textures.back;
  
  const material = new THREE.MeshPhysicalMaterial({
    map: texture,
    metalness: 0.4,
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    transparent: true,
    opacity: 0.95
  });

  materialCache.set(cacheKey, material);
  return material;
}

export function createGlowMaterial(color: string, emissiveColor: string): THREE.MeshStandardMaterial {
  const cacheKey = `glow-${color}-${emissiveColor}`;
  
  if (materialCache.has(cacheKey)) {
    return materialCache.get(cacheKey) as THREE.MeshStandardMaterial;
  }

  const material = new THREE.MeshStandardMaterial({
    color,
    metalness: 0.9,
    roughness: 0.1,
    emissive: emissiveColor,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.6
  });

  materialCache.set(cacheKey, material);
  return material;
}
