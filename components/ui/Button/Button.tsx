import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset"; 
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type }) => {
  return (
    <button className={styles['button']} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
