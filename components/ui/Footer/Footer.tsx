import React from 'react';
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles['footer-container']}>
      <div className={styles['footer']}>
        <p>2025 Yana</p>
        <p>Disigned by Danya</p>
        <p>Mafia</p>
      </div>
    </footer>
  );
};

export default Footer;
