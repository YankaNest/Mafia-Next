// 'use client';

// import React, { useState } from 'react';
// import GameCard from '@/components/ui/GameCard/GameCard';
// import styles from './GameSlider.module.css';
// import { Game } from '@/interfaces/game';
// import { Session } from 'next-auth';

// interface GameSliderProps {
//   allGames: Game[];
//   session: Session | null;
//   registredGame: Game[];
//   onUpdate?: () => void;
// }

// const GameSlider: React.FC<GameSliderProps> = ({ allGames, session, registredGame }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const cardsPerPage = 3;

//   const maxIndex = Math.max(0, allGames.length - cardsPerPage);

//   const handlePrev = () => {
//     setCurrentIndex((prev) => Math.max(0, prev - cardsPerPage));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => Math.min(maxIndex, prev + cardsPerPage));
//   };

//   const visibleGames = allGames.slice(currentIndex, currentIndex + cardsPerPage);

//   return (
//     <div className={styles.sliderContainer}>
//       <div className={styles.cardsWrapper}>
//         {visibleGames.map((game) => (
//           <GameCard key={game.id} game={game} session={session} registredGame={registredGame} />
//         ))}
//       </div>
//       <div className={styles.slider}>
//         <button onClick={handlePrev} disabled={currentIndex === 0} className={styles.arrow}>
//             ←
//         </button>
//         <button onClick={handleNext} disabled={currentIndex >= maxIndex} className={styles.arrow}>
//             →
//         </button>
//       </div>

//     </div>
//   );
// };

// export default GameSlider;

// 'use client';

// import React, { useState } from 'react';
// import GameCard from '@/components/ui/GameCard/GameCard';
// import styles from './GameSlider.module.css';
// import { Game } from '@/interfaces/game';
// import { Session } from 'next-auth';

// interface GameSliderProps {
//   allGames: Game[];
//   registredGames: Game[]; // Добавляем пропс для зарегистрированных игр
//   session: Session | null;
// }

// const GameSlider: React.FC<GameSliderProps> = ({ allGames, registredGames, session }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const cardsPerPage = 3;
//   const maxIndex = Math.max(0, allGames.length - cardsPerPage);

//   const handlePrev = () => {
//     setCurrentIndex((prev) => Math.max(0, prev - cardsPerPage));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => Math.min(maxIndex, prev + cardsPerPage));
//   };

//   const visibleGames = allGames.slice(currentIndex, currentIndex + cardsPerPage);

//   return (
//     <div className={styles.sliderContainer}>
//       <div className={styles.cardsWrapper}>
//         {visibleGames.map((game) => (
//           <GameCard 
//             key={game.id} 
//             game={game} 
//             session={session} 
//             registredGame={registredGames} // Передаем массив зарегистрированных игр
//           />
//         ))}
//       </div>
//       <div className={styles.slider}>
//         <button 
//           onClick={handlePrev} 
//           disabled={currentIndex === 0} 
//           className={styles.arrow}
//         >
//           ←
//         </button>
//         <button 
//           onClick={handleNext} 
//           disabled={currentIndex >= maxIndex} 
//           className={styles.arrow}
//         >
//           →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default GameSlider;

'use client';

import React, { useState, useEffect } from 'react';
import GameCard from '@/components/ui/GameCard/GameCard';
import styles from './GameSlider.module.css';
import { Game } from '@/interfaces/game';
import { Session } from 'next-auth';

interface GameSliderProps {
  allGames: Game[];
  registredGames: Game[];
  session: Session | null;
}

const GameSlider: React.FC<GameSliderProps> = ({ allGames, registredGames, session }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  // Функция для определения количества карточек в зависимости от ширины окна
  const updateCardsPerPage = () => {
    const width = window.innerWidth;
    if (width < 730) {
      setCardsPerPage(1);
    } else if (width < 1000) {
      setCardsPerPage(2);
    } else {
      setCardsPerPage(3);
    }
  };

  useEffect(() => {
    updateCardsPerPage(); // Установка при монтировании
    window.addEventListener('resize', updateCardsPerPage);
    return () => {
      window.removeEventListener('resize', updateCardsPerPage);
    };
  }, []);

  // Обновляем currentIndex, если он вышел за пределы после изменения cardsPerPage
  useEffect(() => {
    const maxIndex = Math.max(0, allGames.length - cardsPerPage);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [cardsPerPage, allGames.length, currentIndex]);

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
          <GameCard 
            key={game.id} 
            game={game} 
            session={session} 
            registredGame={registredGames} 
          />
        ))}
      </div>
      <div className={styles.slider}>
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0} 
          className={styles.arrow}
        >
          ←
        </button>
        <button 
          onClick={handleNext} 
          disabled={currentIndex >= maxIndex} 
          className={styles.arrow}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default GameSlider;
