'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, RoundedBox, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

interface FlashCard {
  front: string;
  back: string;
  frontLang: string;
  backLang: string;
  category?: string;
}

interface Card3DProps {
  card: FlashCard;
  position: [number, number, number];
}

function Card3D({ card, position }: Card3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [targetRotation, setTargetRotation] = useState(0)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (targetRotation - groupRef.current.rotation.y) * 0.1
      // Subtle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  const handleClick = () => {
    setIsFlipped(!isFlipped)
    setTargetRotation(isFlipped ? 0 : Math.PI)
  }

  // Create gradient texture for front
  const frontTexture = new THREE.CanvasTexture(createGradientCanvas(
    '#6366f1', '#8b5cf6', '#d946ef'
  ))
  
  // Create gradient texture for back
  const backTexture = new THREE.CanvasTexture(createGradientCanvas(
    '#06b6d4', '#3b82f6', '#6366f1'
  ))

  return (
    <group ref={groupRef} position={position} onClick={handleClick}>
      {/* Front side main card */}
      <RoundedBox
        args={[12, 7, 0.2]}
        radius={0.4}
        smoothness={4}
        position={[0, 0, 0.1]}
      >
        <meshPhysicalMaterial
          map={frontTexture}
          metalness={0.4}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent={true}
          opacity={0.95}
        />
      </RoundedBox>
      
      {/* Front glow effect */}
      <RoundedBox
        args={[12.2, 7.2, 0.1]}
        radius={0.4}
        smoothness={4}
        position={[0, 0, 0.01]}
      >
        <meshStandardMaterial
          color="#8b5cf6"
          metalness={0.9}
          roughness={0.1}
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
          transparent={true}
          opacity={0.6}
        />
      </RoundedBox>

      {/* Front text elements */}
      <Text
        position={[-5, 3, 0.21]}
        fontSize={0.35}
        color="#e9d5ff"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.08}
        fontWeight={600}
      >
        {card.frontLang.toUpperCase()}
      </Text>

      <Text
        position={[5, 3, 0.21]}
        fontSize={0.35}
        color="#fbbf24"
        anchorX="right"
        anchorY="middle"
        letterSpacing={0.08}
        fontWeight={600}
      >
        {card.category?.toUpperCase() || 'FLASHCARD'}
      </Text>

      <Text
        position={[0, 0.3, 0.21]}
        fontSize={1.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={10}
        textAlign="center"
        fontWeight={700}
      >
        {card.front}
      </Text>

      <Text
        position={[0, -2.8, 0.21]}
        fontSize={0.28}
        color="#e9d5ff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        ✨ CLICK TO REVEAL ✨
      </Text>

      {/* Back side main card */}
      <RoundedBox
        args={[12, 7, 0.2]}
        radius={0.4}
        smoothness={4}
        position={[0, 0, -0.1]}
        rotation={[0, Math.PI, 0]}
      >
        <meshPhysicalMaterial
          map={backTexture}
          metalness={0.4}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent={true}
          opacity={0.95}
        />
      </RoundedBox>
      
      {/* Back glow effect */}
      <RoundedBox
        args={[12.2, 7.2, 0.1]}
        radius={0.4}
        smoothness={4}
        position={[0, 0, -0.01]}
        rotation={[0, Math.PI, 0]}
      >
        <meshStandardMaterial
          color="#3b82f6"
          metalness={0.9}
          roughness={0.1}
          emissive="#06b6d4"
          emissiveIntensity={0.5}
          transparent={true}
          opacity={0.6}
        />
      </RoundedBox>

      {/* Back text elements */}
      <Text
        position={[0, 3, -0.21]}
        fontSize={0.35}
        color="#bfdbfe"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI, 0]}
        letterSpacing={0.08}
        fontWeight={600}
      >
        {card.backLang.toUpperCase()}
      </Text>

      <Text
        position={[0, 0.3, -0.21]}
        fontSize={1.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI, 0]}
        maxWidth={10}
        textAlign="center"
        fontWeight={700}
      >
        {card.back}
      </Text>

      <Text
        position={[0, -2.8, -0.21]}
        fontSize={0.28}
        color="#bfdbfe"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI, 0]}
        letterSpacing={0.05}
      >
        ✨ CLICK TO FLIP BACK ✨
      </Text>
    </group>
  )
}

// Helper function to create gradient canvas
function createGradientCanvas(color1: string, color2: string, color3: string) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')!
  
  const gradient = ctx.createLinearGradient(0, 0, 512, 512)
  gradient.addColorStop(0, color1)
  gradient.addColorStop(0.5, color2)
  gradient.addColorStop(1, color3)
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 512, 512)
  
  return canvas
}

interface FlipCard3DProps {
  card: FlashCard;
}

export default function FlipCard3D({ card }: FlipCard3DProps) {
  const sampleCard: FlashCard = {
    front: 'Hello',
    back: 'Hola',
    frontLang: 'English',
    backLang: 'Spanish',
    category: 'Greetings'
  }

  const displayCard = card || sampleCard

  return (
    <div className="w-full h-[500px]">
      <Canvas
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 12]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[-15, 10, -10]} intensity={1.5} color="#8b5cf6" />
        <pointLight position={[15, -10, -10]} intensity={1.5} color="#06b6d4" />
        <pointLight position={[0, 0, 10]} intensity={0.8} color="#d946ef" />
        <Card3D card={displayCard} position={[0, 0, 0]} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={25}
          autoRotate={false}
        />
      </Canvas>
    </div>
  )
}