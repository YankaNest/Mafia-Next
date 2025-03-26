// 'use client';
// import React  from 'react';
// import { useState } from 'react';
// import styles from './GameCard.module.css';
// import Button from '../Button/Button';
// import CustomModal from '../Modal/Modal';
// import AuthForm from '../AuthForm/AuthForm';

// const GameCard = () => {

// const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
// const [isLoginModalOpen, setLoginModalOpen] = useState(false);


//     return (
//       <div className={styles['game-card']}>
//         <div className={styles['date-container']}>
//             <p className={styles['text']}>24.03.2025 18:00</p>
//         </div>
//         <div className={styles['gamers']}>
//             <p className={styles['text']}>Количество игроков</p>
//             <p className={styles['text']}>/14</p>
//         </div>
//         <div className={styles['button']}>
//             <Button>Записаться на игру</Button>
//             <div className={styles['auth-button']}>
//               <Button onClick={() => setRegisterModalOpen(true)}>Регистрация</Button>
//               <p>или</p>
//               <Button onClick={() => setLoginModalOpen(true)}>Авторизация</Button>
//             </div>
//         </div>
        
//         <CustomModal
//           isOpen={isRegisterModalOpen}
//           onClose={() => setRegisterModalOpen(false)}
//           title="Регистрация"
//         >
//           <AuthForm type="register" />
//         </CustomModal>

//         {/* Модальное окно авторизации */}
//         <CustomModal
//           isOpen={isLoginModalOpen}
//           onClose={() => setLoginModalOpen(false)}
//           title="Авторизация"
//         >
//           <AuthForm type="login" />
//         </CustomModal>
//       </div>
//     );
//   };

// export default GameCard;


'use client';
import React, { useState } from 'react';
import styles from './GameCard.module.css';
import Button from '../Button/Button';
import CustomModal from '../Modal/Modal';
import AuthForm from '../AuthForm/AuthForm';

const GameCard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Состояние авторизации
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isAuthButtonVisible, setAuthButtonVisible] = useState(false); // Видимость блока auth-button

  const handleSignUp = () => {
    if (!isAuthenticated) {
      // Если пользователь не авторизован, показываем блок auth-button
      setAuthButtonVisible(true);
    } else {
      // Если пользователь авторизован, выполняем действие "Записаться на игру"
      console.log('Пользователь записан на игру');
    }
  };

  return (
    <div className={styles['game-card']}>
      <div className={styles['date-container']}>
        <p className={styles['text']}>24.03.2025 18:00</p>
      </div>
      <div className={styles['gamers']}>
        <p className={styles['text']}>Количество игроков</p>
        <p className={styles['text']}>/14</p>
      </div>
      <div className={styles['button']}>
        <Button onClick={handleSignUp}>Записаться на игру</Button>
        {isAuthButtonVisible && (
          <div className={styles['auth-button']}>
            <Button onClick={() => setRegisterModalOpen(true)}>Зарегистрироваться</Button>
            <p>или</p>
            <Button onClick={() => setLoginModalOpen(true)}>Войти</Button>
          </div>
        )}
      </div>

      {/* Модальное окно регистрации */}
      <CustomModal
        isOpen={isRegisterModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        title="Регистрация"
      >
        <AuthForm type="register" />
      </CustomModal>

      {/* Модальное окно авторизации */}
      <CustomModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        title="Авторизация"
      >
        <AuthForm type="login" />
      </CustomModal>
    </div>
  );
};

export default GameCard;
