import React from 'react';
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles['footer-container']}>
      <div className={styles['footer']}>
        <p>2025</p>
        <p>Frontend: Яна</p>
        <p>Backend: Даниил</p>
        <p>MafiaST</p>
      </div>
    </footer>
  );
};

export default Footer;
