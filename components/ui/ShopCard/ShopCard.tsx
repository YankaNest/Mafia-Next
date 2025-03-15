'use client';
import React  from 'react';
import styles from './ShopCard.module.css';
import Button from '../Button/Button';



const ff = () => {
    console.log('Добавть в корзину');
  }

const ShopCard = () => {
    return (
      <div className={styles['shop-card']}>
            <img className={styles['shop-card-img']} src="/shop-card-img.svg" alt="ksd" />
            <p className={styles['name']}>Набор карт мафии</p>
            <p className={styles['collection-name']}>Blood moon</p>
            <div className={styles['prise-container']}>
                <Button onClick={ff}>
                    <img className={styles['cart-add']} src="/cart-add.svg" alt="ksd" />
                </Button>
                <p className={styles['new-prise']}>999 р.</p>
                <p className={styles['last-prise']}>1999 р.</p>
            </div>
      </div>
    );
  };
  

export default ShopCard;
