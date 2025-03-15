import React from 'react';
import styles from './HomePage.module.css';
import Image from 'next/image';


const HomePage = () => {
  return (
    <div className={styles['main']}>
      <p className={styles['sity']}>Город засыпает,<br/>просыпается...</p>
      <p className={styles['mafia']}>МАФИЯ</p>
      <Image className={styles['home-card']}  alt='df' src='\home-card.svg' width={990} height={428}/>
    </div>
  );
};

export default HomePage;
