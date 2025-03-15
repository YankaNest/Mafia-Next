import React from 'react';
import Link from 'next/link';
import styles from "./Navigation.module.css"

const Navigation = () => {
  return (
    <div className={styles['main']}>
      <nav className={styles['nav']}>
        <div className={styles['mafia-st']}>
          <Link href="/home">
            MafiaST
          </Link>
        </div>
        <div className={styles['nav-links']}>
          <Link href="/home/game-signup">
            Запись на игру
          </Link>
          <Link href="/home/shop">
            Магазин
          </Link>
          <Link href="/home/about">
            О нас
          </Link>
          <Link href="/home/contacts">
            Контакты
          </Link>
          <Link href="/home/profile">
            Профиль
          </Link>   
        </div>
      </nav>
    </div>

  );
};

export default Navigation;
