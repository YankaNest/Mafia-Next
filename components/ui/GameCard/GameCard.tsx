import React  from 'react';
import styles from './GameCard.module.css';
import Button from '../Button/Button';

const dd = () => {
    console.log('Записаться на игру');
  }
  

const GameCard = () => {
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
            <Button onClick={dd}>Записаться на игру</Button>

        </div>
      </div>
    );
  };
  

export default GameCard;
