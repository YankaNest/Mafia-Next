// 'use client';

// import React, { useState } from 'react';
// import styles from './GameCard.module.css';
// import Button from '../Button/Button';
// import CustomModal from '../Modal/Modal';
// import Login from '../AuthForm/AuthForm2';
// import RegisterForm from '../AuthForm/RegisterForm';
// import { Game } from '@/interfaces/game';

// interface GameCardProps {
//   session: import("next-auth").Session | null;
//   game: Game;
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

// const GameCard: React.FC<GameCardProps> = ({ game, session }) => {
//   const [ , setIsAuthenticated] = useState(false);
//   const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
//   const [isLoginModalOpen, setLoginModalOpen] = useState(false);
//   const [isAuthButtonVisible, setAuthButtonVisible] = useState(false);

//   const handleSignUp = () => {
//     if (!session?.token) {
//       setAuthButtonVisible(true);
//     } else {
//       setIsAuthenticated(true);
//       console.log('Пользователь записан на игру');
//     }
//   };

//   return (
//     <div className={styles['game-card']}>
//       <div className={styles['date-container']}>
//         <p className={styles['text']}>{formatDateTime(game.startTime)}</p>
//       </div>
//       <div className={styles['gamers']}>
//         <p className={styles['text']}>Количество игроков</p>
//         <p className={styles['text']}>
//           {game.currentPlayers}/{game.maxPlayers}
//         </p>
//       </div>
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

//       <CustomModal
//         isOpen={isRegisterModalOpen}
//         onClose={() => setRegisterModalOpen(false)}
//       >
//         <RegisterForm />
//       </CustomModal>

//       <CustomModal
//         isOpen={isLoginModalOpen}
//         onClose={() => setLoginModalOpen(false)}
//       >
//         <Login />
//       </CustomModal>
//     </div>
//   );
// };

// export default GameCard;


// 'use client';

// import React, { useState } from 'react';
// import styles from './GameCard.module.css';
// import Button from '../Button/Button';
// import CustomModal from '../Modal/Modal';
// import Login from '../AuthForm/AuthForm2';
// import RegisterForm from '../AuthForm/RegisterForm';
// import { Game } from '@/interfaces/game';
// import { joinGame } from '@/lib/api/games';

// interface GameCardProps {
//   session: import("next-auth").Session | null;
//   game: Game;
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

// const GameCard: React.FC<GameCardProps> = ({ game, session }) => {
//   const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
//   const [isLoginModalOpen, setLoginModalOpen] = useState(false);
//   const [isAuthButtonVisible, setAuthButtonVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   //const registred = registredGame.map((regGames => {regGames.id}))

//   // const cancelRegistration = async() => {
//   //   try {
//   //     await cancelRegistrationGame(game.id);
//   //   }catch (err) {
//   //     setError(err instanceof Error ? err.message : 'Ошибка записи');
//   // }

//   const handleSignUp = async () => {
//     if (game.currentPlayers >= game.maxPlayers) {
//       setError('Достигнут лимит участников');
//       return;
//     }

//     if (!session?.token) {
//       setAuthButtonVisible(true);
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     console.log('gameID =>', game.id)

//     try {
//       await joinGame(game.id);
//       console.log('Успешная запись на игру!');
//       // Здесь можно добавить обновление данных через родительский компонент
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Ошибка записи');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={styles['game-card']}>
//       <div className={styles['date-container']}>
//         <p className={styles['text']}>{formatDateTime(game.startTime)}</p>
//       </div>
//       <div className={styles['gamers']}>
//         <p className={styles['text']}>Количество игроков</p>
//         <p className={styles['text']}>
//           {game.currentPlayers}/{game.maxPlayers}
//         </p>
//       </div>
//       <div className={styles['button']}>
//         <Button 
//           onClick={handleSignUp}
//           disabled={isLoading || game.currentPlayers >= game.maxPlayers}
//         >
//           {isLoading ? 'Загрузка...' : 'Записаться на игру'}
//         </Button>
        
//         {error && <p className={styles['text']} style={{ color: '#ff4d4f', marginTop: 8 }}>{error}</p>}

//         {isAuthButtonVisible && (
//           <div className={styles['auth-button']}>
//             <Button onClick={() => setRegisterModalOpen(true)}>Зарегистрироваться</Button>
//             <p className={styles['ili']}>или</p>
//             <Button onClick={() => setLoginModalOpen(true)}>Войти</Button>
//           </div>
//         )}

//       </div>

//       <CustomModal
//         isOpen={isRegisterModalOpen}
//         onClose={() => setRegisterModalOpen(false)}
//       >
//         <RegisterForm />
//       </CustomModal>

//       <CustomModal
//         isOpen={isLoginModalOpen}
//         onClose={() => setLoginModalOpen(false)}
//       >
//         <Login />
//       </CustomModal>
//     </div>
  
//   );
// };

// export default GameCard;

// 'use client';

// import React, { useState, useEffect } from 'react';
// import styles from './GameCard.module.css';
// import Button from '../Button/Button';
// import CustomModal from '../Modal/Modal';
// import Login from '../AuthForm/AuthForm2';
// import RegisterForm from '../AuthForm/RegisterForm';
// import { Game } from '@/interfaces/game';
// import { cancelRegistrationGame, joinGame } from '@/lib/api/games';

// interface GameCardProps {
//   session: import("next-auth").Session | null;
//   game: Game;
//   registredGame: Game[];
//   onUpdate?: () => void; // Добавляем колбэк для обновления данных
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

// const GameCard: React.FC<GameCardProps> = ({ game, session, registredGame = [], onUpdate }) => {
//   const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
//   const [isLoginModalOpen, setLoginModalOpen] = useState(false);
//   const [isAuthButtonVisible, setAuthButtonVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isRegistered, setIsRegistered] = useState(false);

//   // Проверяем регистрацию при загрузке
  
//   useEffect(() => {
//     if (session?.token) {
//       const registeredIds = registredGame.map(g => g.id);
//       setIsRegistered(registeredIds.includes(game.id));
//     } else {
//       setIsRegistered(false);
//     }
//   }, [registredGame, game.id, session?.token]);

//   const cancelRegistration = async () => {
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       await cancelRegistrationGame(game.id);
//       setIsRegistered(false);
//       onUpdate?.();// Обновляем данные в родительском компоненте

//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Ошибка отмены регистрации');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignUp = async () => {
//     if (game.currentPlayers >= game.maxPlayers) {
//       setError('Достигнут лимит участников');
//       return;
//     }

//     if (!session?.token) {
//       setAuthButtonVisible(true);
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       await joinGame(game.id);
//       setIsRegistered(true);
//       onUpdate?.(); // Обновляем данные в родительском компоненте
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Ошибка записи');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={styles['game-card']}>
//       <div className={styles['date-container']}>
//         <p className={styles['text']}>{formatDateTime(game.startTime)}</p>
//       </div>

//       <div className={styles['gamers']}>
//         <p className={styles['text']}>Количество игроков</p>
//         <p className={styles['text']}>
//           {game.currentPlayers}/{game.maxPlayers}
//         </p>
//       </div>

//       <div className={styles['button']}>
//         {isRegistered ? (
//           <Button 
//             onClick={cancelRegistration}
//             disabled={isLoading}
//           >
//             {isLoading ? 'Отмена...' : 'Отменить регистрацию'}
//           </Button>
//         ) : (
//           <>
//             <Button 
//               onClick={handleSignUp}
//               disabled={isLoading || game.currentPlayers >= game.maxPlayers}
//             >
//               {isLoading ? 'Загрузка...' : 'Записаться на игру'}
//             </Button>

//             {error && (
//               <p className={styles['error-text']}>{error}</p>
//             )}
//           </>
//         )}

//         {isAuthButtonVisible && (
//           <div className={styles['auth-button']}>
//             <Button onClick={() => setRegisterModalOpen(true)}>Зарегистрироваться</Button>
//             <p className={styles['ili']}>или</p>
//             <Button onClick={() => setLoginModalOpen(true)}>Войти</Button>
//           </div>
//         )}
//       </div>

//       <CustomModal
//         isOpen={isRegisterModalOpen}
//         onClose={() => setRegisterModalOpen(false)}
//       >
//         <RegisterForm />
//       </CustomModal>

//       <CustomModal
//         isOpen={isLoginModalOpen}
//         onClose={() => setLoginModalOpen(false)}
//       >
//         <Login />
//       </CustomModal>
//     </div>
//   );
// };

// export default GameCard;

'use client';

import React, { useState, useEffect } from 'react';
import styles from './GameCard.module.css';
import Button from '../Button/Button';
import CustomModal from '../Modal/Modal';
import Login from '../AuthForm/AuthForm2';
import RegisterForm from '../AuthForm/RegisterForm';
import { Game } from '@/interfaces/game';
import { cancelRegistrationGame, joinGame } from '@/lib/api/games';

interface GameCardProps {
  session: import("next-auth").Session | null;
  game: Game;
  registredGame?: Game[]; // массив игр, на которые пользователь записан
  onUpdate?: () => void;
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

const GameCard: React.FC<GameCardProps> = ({ game, session, registredGame = [], onUpdate }) => {
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isAuthButtonVisible, setAuthButtonVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  // Проверяем регистрацию только если пользователь авторизован
  useEffect(() => {
    if (session?.token) {
      setIsRegistered(registredGame.some(g => g.id === game.id));
    } else {
      setIsRegistered(false);
    }
  }, [registredGame, game.id, session?.token]);

  const cancelRegistration = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await cancelRegistrationGame(game.id);
      setIsRegistered(false);
      onUpdate?.();
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка отмены регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (game.currentPlayers >= game.maxPlayers) {
      setError('Достигнут лимит участников');
      return;
    }
    if (!session?.token) {
      setAuthButtonVisible(true);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await joinGame(game.id);
      setIsRegistered(true);
      onUpdate?.();
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка записи');
    } finally {
      setIsLoading(false);
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
        {isRegistered ? (
          <Button 
            onClick={cancelRegistration}
            disabled={isLoading}
          >
            {isLoading ? 'Отмена...' : 'Отменить регистрацию'}
          </Button>
        ) : (
          <>
            <Button 
              onClick={handleSignUp}
              disabled={isLoading || game.currentPlayers >= game.maxPlayers}
            >
              {isLoading ? 'Загрузка...' : 'Записаться на игру'}
            </Button>
            {error && (
              <p className={styles['error-text']}>{error}</p>
            )}
          </>
        )}

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
