import React from 'react';
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles['footer-container']}>
      <div className={styles['footer']}>
        <p>2025 Akumu</p>
        <p>Disigned by Aboba</p>
        <p>Mafia</p>
      </div>
    </footer>
  );
};

export default Footer;
