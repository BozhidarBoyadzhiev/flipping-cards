'use client'

import { useRef, useState, useEffect, useMemo, memo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, RoundedBox, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { UpdateCardModal } from './'
import { FlashCard } from '@/data/cards'
import { createCardMaterial, createGlowMaterial } from '@/three'

interface Card3DProps {
  card: FlashCard;
  position: [number, number, number];
  onOpenModal: () => void;
}

const Card3D = memo(function Card3D({ card, position, onOpenModal }: Card3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [targetRotation, setTargetRotation] = useState(0)

  // Memoize materials to prevent recreation on every render
  const frontMaterial = useMemo(() => createCardMaterial('front'), [])
  const backMaterial = useMemo(() => createCardMaterial('back'), [])
  const frontGlowMaterial = useMemo(() => createGlowMaterial('#8b5cf6', '#8b5cf6'), [])
  const backGlowMaterial = useMemo(() => createGlowMaterial('#3b82f6', '#06b6d4'), [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (targetRotation - groupRef.current.rotation.y) * 0.1
      // Subtle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  const handleLeftClick = () => {
    setIsFlipped(!isFlipped)
    setTargetRotation(isFlipped ? 0 : Math.PI)
  }

  const handleRightClick = (e: any) => {
    onOpenModal()
  }

  return (
    <group ref={groupRef} position={position} onClick={handleLeftClick} onContextMenu={handleRightClick}>
      {/* Front side main card */}
      <RoundedBox
        args={[12, 7, 0.2]}
        radius={0.4}
        smoothness={4}
        position={[0, 0, 0.1]}
      >
        <primitive object={frontMaterial} />
      </RoundedBox>
      
      {/* Front glow effect */}
      <RoundedBox
        args={[12.2, 7.2, 0.1]}
        radius={0.4}
        smoothness={4}
        position={[0, 0, 0.01]}
      >
        <primitive object={frontGlowMaterial} />
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
        <primitive object={backMaterial} />
      </RoundedBox>
      
      {/* Back glow effect */}
      <RoundedBox
        args={[12.2, 7.2, 0.1]}
        radius={0.4}
        smoothness={4}
        position={[0, 0, -0.01]}
        rotation={[0, Math.PI, 0]}
      >
        <primitive object={backGlowMaterial} />
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
})

interface FlipCard3DProps {
  card: FlashCard;
  onCardUpdated?: (updatedCard: FlashCard) => void;
}

const FlipCard3D = memo(function FlipCard3D({ card, onCardUpdated }: FlipCard3DProps) {
  // Create internal state that holds the card data
  const [displayCard, setDisplayCard] = useState(card); // Initially set to the prop
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    setDisplayCard(card);
  }, [card]);

  const handleCardUpdated = (updatedCard: FlashCard) => {
    if (onCardUpdated) {
      onCardUpdated(updatedCard);
    }

    setDisplayCard(updatedCard);
    closeModal();
  };

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
        {/* Use displayCard instead of card */}
        <Card3D card={displayCard} position={[0, 0, 0]} onOpenModal={openModal} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={25}
          autoRotate={false}
        />
      </Canvas>
      <UpdateCardModal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        card={displayCard}
        onCardUpdated={handleCardUpdated}
      />
    </div>
  );
})

export default FlipCard3D