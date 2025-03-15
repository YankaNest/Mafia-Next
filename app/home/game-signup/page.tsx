// import React, { useState } from 'react';

// const GameSignupPage = () => {
//   const [isSignedUp, setIsSignedUp] = useState(false);

//   const handleSignup = () => {
//     // Проверка авторизации и запись на игру
//     const isLoggedIn = localStorage.getItem('isLoggedIn');
//     if (isLoggedIn === 'true') {
//       setIsSignedUp(true);
//       // Обновление статистики
//     }
//   };

//   return (
//     <div>
//       <h1>Запись на игру</h1>
//       <p>Ближайшие игры</p>
//       <button onClick={handleSignup}>Записаться</button>
//       {isSignedUp && <p>Вы записаны!</p>}
//     </div>
//   );
// };

// export default GameSignupPage;
'use client';
import React from 'react';
import styles from './GameSignupPage.module.css'
import GameCard from '@/components/ui/GameCard/GameCard';

const GameSignupPage = () => {
//   const [isSignedUp, setIsSignedUp] = useState(false);

//   const handleSignup = () => {
//     // Проверка авторизации и запись на игру
//     const isLoggedIn = localStorage.getItem('isLoggedIn');
//     if (isLoggedIn === 'true') {
//       setIsSignedUp(true);
//       // Обновление статистики
//     }
//   };


  return (
    <div className={styles['game-signup']}>
      <GameCard />
      <GameCard />
      <GameCard />
    </div>
  );
};

export default GameSignupPage;
