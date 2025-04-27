'use client';
import React  from 'react';
import styles from './ShopCard.module.css';
import Button from '../Button/Button';
import { IProduct } from '@/interfaces/product';

interface ProductCardProps {
  products: IProduct[]
}

const ff = () => {
    console.log('Добавть в корзину');
  }

const ShopCard: React.FC<ProductCardProps> = ({products}) => {
    return (
      <>
      {products.map((product) => (
      <>
      <div className={styles['shop-card']}>
            <img className={styles['shop-card-img']} key={product.id} src="/shop-card-img.svg" alt="ksd" />
            <p className={styles['name']} key={product.id}>{product.name}</p>
            <p className={styles['collection-name']} key={product.id}>{product.description}</p>
            <div className={styles['prise-container']}>
                <Button onClick={ff}>
                    <img className={styles['cart-add']} src="/cart-add.svg" alt="ksd" />
                </Button>
                <p className={styles['new-prise']} key={product.id}>{product.price} р.</p>
                <p className={styles['last-prise']}>1999 р.</p>
            </div>
      </div>
      </>
    ))}
    </>
    );
  };
  

export default ShopCard;
