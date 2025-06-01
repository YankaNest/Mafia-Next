'use client';

import React, { useState } from 'react';
import styles from './AuthForms.module.css'
import CustomModal from '../Modal/Modal';
import Login from '../AuthForm/AuthForm2';
import RegisterForm from '../AuthForm/RegisterForm';
import Button from '../Button/Button';

export default function AuthModals() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const openLogin = () => {
    setRegisterModalOpen(false);
    setLoginModalOpen(true);
  };

  const openRegister = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };

  return (
    <div className={styles.authContainer}>
      <button onClick={openLogin}>Войти</button>
      <button onClick={openRegister}>Зарегистрироваться</button>

      <CustomModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      >
        <Login  />
        <p className={styles.switchText}>
          Нет аккаунта?{' '}
          <Button onClick={openRegister}>
            Зарегистрироваться
          </Button>
        </p>
      </CustomModal>

      <CustomModal
        isOpen={isRegisterModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      >
        <RegisterForm  />
        <p className={styles.switchText}>
          Уже есть аккаунт?{' '}
          <Button onClick={openLogin}>
            Войти
          </Button>
        </p>
      </CustomModal>
    </div>
  );
}
