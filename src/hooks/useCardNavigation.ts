import { useState, useEffect, useCallback } from 'react';

export function useCardNavigation(totalCards: number) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardVersion, setCardVersion] = useState(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => 
      prev === 0 ? totalCards - 1 : prev - 1
    );
  }, [totalCards]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => 
      prev === totalCards - 1 ? 0 : prev + 1
    );
  }, [totalCards]);

  const goToCard = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const incrementVersion = useCallback(() => {
    setCardVersion(prev => prev + 1);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToPrevious, goToNext]);

  // Adjust current index when cards are deleted
  useEffect(() => {
    if (currentIndex >= totalCards && totalCards > 0) {
      setCurrentIndex(totalCards - 1);
    } else if (totalCards === 0) {
      setCurrentIndex(0);
    }
  }, [currentIndex, totalCards]);

  return {
    currentIndex,
    cardVersion,
    goToPrevious,
    goToNext,
    goToCard,
    incrementVersion
  };
}
