// 'use client';

// import React, { useState } from 'react';
// import styles from './GameCard.module.css';
// import Button from '../Button/Button';
// import CustomModal from '../Modal/Modal';
// import Login from '../AuthForm/AuthForm2';
// import RegisterForm from '../AuthForm/RegisterForm';
// import { Game } from '@/interfaces/game';

// interface GameCardProps {
//   session: import("c:/Users/honor/Desktop/Mafia-Next/mafia-app/node_modules/next-auth/index").Session | null;
//   allGames: Game[];
// }

// function formatDateTime(isoString: string): string {
//   const date = new Date(isoString);

//   const day = date.getDate().toString().padStart(2, '0');
//   const month = (date.getMonth() + 1).toString().padStart(2, '0');
//   const year = date.getFullYear();

//   const hours = date.getHours().toString().padStart(2, '0');
//   const minutes = date.getMinutes().toString().padStart(2, '0');

//   return `${day}.${month}.${year} ${hours}:${minutes}`;
// }

//   const GameCard: React.FC<GameCardProps> = ({allGames, session}) => {
//   const [ , setIsAuthenticated] = useState(false); // Состояние авторизации
//   const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
//   const [isLoginModalOpen, setLoginModalOpen] = useState(false);
//   const [isAuthButtonVisible, setAuthButtonVisible] = useState(false); // Видимость блока auth-button

 

//   const handleSignUp = () => {
//     if (!session?.token) {
//       // Если пользователь не авторизован, показываем блок auth-button
//       setAuthButtonVisible(true);
//     } else {
//       setIsAuthenticated(true);
//       // Если пользователь авторизован, выполняем действие "Записаться на игру"
//       console.log('Пользователь записан на игру');
//     }
//   };

//   return (
//     <>
//     {allGames.map((games) => (
//       <>
//     <div className={styles['game-card']}>
//         <div className={styles['date-container']}>
//           <p className={styles['text']} key={games.id}>{formatDateTime(games.startTime)}</p> {/* 24.03.2025 18:00 */}
//         </div>
//         <div className={styles['gamers']}>
//             <p className={styles['text']}>Количество игроков</p>
//             <p className={styles['text']} key={games.id} >{games.currentPlayers}/{games.maxPlayers}</p>
//         </div>
//       <div className={styles['button']}>
//         <Button onClick={handleSignUp}>Записаться на игру</Button>
//         {isAuthButtonVisible && (
//           <div className={styles['auth-button']}>
//             <Button onClick={() => setRegisterModalOpen(true)}>Зарегистрироваться</Button>
//             <p className={styles['ili']}>или</p>
//             <Button onClick={() => setLoginModalOpen(true)}>Войти</Button>
//           </div>
//         )}
//       </div>

//       {/* Модальное окно регистрации */}
//       <CustomModal
//         isOpen={isRegisterModalOpen}
//         onClose={() => setRegisterModalOpen(false)}
//       >
//         <RegisterForm /> 
//       </CustomModal>

//       {/* Модальное окно авторизации */}
//       <CustomModal
//         isOpen={isLoginModalOpen}
//         onClose={() => setLoginModalOpen(false)}
//       >
//         <Login/>
//       </CustomModal>
//     </div>
//     </>
//     ))}
//     </>
//   );
// };

// export default GameCard;

'use client';

import React, { useState } from 'react';
import styles from './GameCard.module.css';
import Button from '../Button/Button';
import CustomModal from '../Modal/Modal';
import Login from '../AuthForm/AuthForm2';
import RegisterForm from '../AuthForm/RegisterForm';
import { Game } from '@/interfaces/game';

interface GameCardProps {
  session: import("next-auth").Session | null;
  game: Game;
}

function formatDateTime(isoString: string): string {
  const date = new Date(isoString);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

const GameCard: React.FC<GameCardProps> = ({ game, session }) => {
  const [ , setIsAuthenticated] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isAuthButtonVisible, setAuthButtonVisible] = useState(false);

  const handleSignUp = () => {
    if (!session?.token) {
      setAuthButtonVisible(true);
    } else {
      setIsAuthenticated(true);
      console.log('Пользователь записан на игру');
    }
  };

  return (
    <div className={styles['game-card']}>
      <div className={styles['date-container']}>
        <p className={styles['text']}>{formatDateTime(game.startTime)}</p>
      </div>
      <div className={styles['gamers']}>
        <p className={styles['text']}>Количество игроков</p>
        <p className={styles['text']}>
          {game.currentPlayers}/{game.maxPlayers}
        </p>
      </div>
      <div className={styles['button']}>
        <Button onClick={handleSignUp}>Записаться на игру</Button>
        {isAuthButtonVisible && (
          <div className={styles['auth-button']}>
            <Button onClick={() => setRegisterModalOpen(true)}>Зарегистрироваться</Button>
            <p className={styles['ili']}>или</p>
            <Button onClick={() => setLoginModalOpen(true)}>Войти</Button>
          </div>
        )}
      </div>

      <CustomModal
        isOpen={isRegisterModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      >
        <RegisterForm />
      </CustomModal>

      <CustomModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      >
        <Login />
      </CustomModal>
    </div>
  );
};

export default GameCard;

