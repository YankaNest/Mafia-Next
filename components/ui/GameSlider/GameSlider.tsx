'use client';

import React, { useState } from 'react';
import GameCard from '@/components/ui/GameCard/GameCard';
import styles from './GameSlider.module.css';
import { Game } from '@/interfaces/game';
import { Session } from 'next-auth';

interface GameSliderProps {
  allGames: Game[];
  session: Session | null;
}

const GameSlider: React.FC<GameSliderProps> = ({ allGames, session }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 3;

  const maxIndex = Math.max(0, allGames.length - cardsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - cardsPerPage));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + cardsPerPage));
  };

  const visibleGames = allGames.slice(currentIndex, currentIndex + cardsPerPage);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.cardsWrapper}>
        {visibleGames.map((game) => (
          <GameCard key={game.id} game={game} session={session} />
        ))}
      </div>
      <div className={styles.slider}>
        <button onClick={handlePrev} disabled={currentIndex === 0} className={styles.arrow}>
            ←
        </button>
        <button onClick={handleNext} disabled={currentIndex >= maxIndex} className={styles.arrow}>
            →
        </button>
      </div>

    </div>
  );
};

export default GameSlider;
