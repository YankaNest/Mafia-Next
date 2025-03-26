import ShopCard from '@/components/ui/ShopCard/ShopCard';
import React from 'react';
import styles from './ShopPage.module.css';
import Button from '@/components/ui/Button/Button';

const ShopPage = () => {
  return (
    <div className={styles['shop-container']}>
      <div className={styles['card-container']}>
        <ShopCard/>
        <ShopCard/>
        <ShopCard/>
        <ShopCard/>
        <ShopCard/>
        <ShopCard/>
      </div>
      <div className={styles['cart-container']}>
        <h2>Корзина</h2>
        <div>товар</div>
        <div className={styles['button-container']}>
          <Button>Заказать</Button>
        </div>
        
      </div>

    </div>
  );
};

export default ShopPage;
