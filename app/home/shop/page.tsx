import ShopCard from '@/components/ui/ShopCard/ShopCard';
import React from 'react';
import styles from './ShopPage.module.css';
import { getAllProduct } from '@/lib/api/products';
import Cart from '@/components/ui/Cart/Cart';
import { auth } from '@/auth';
import { getCard } from '@/lib/api/carts';
import { ICart } from '@/interfaces/cart';

const ShopPage = async () => {
  const session = await auth(); 
  const products = await getAllProduct();
  let initialCarts: ICart[] = [];
  
  if (session?.token) {
    initialCarts = await getCard();
  }

  return (
    <div className={styles['shop-container']}>
      <div className={styles['card-container']}>
        <ShopCard products={products}/>
      </div>
      {session?.token && (
        <div className={styles['cart-container']}>
          <Cart initialCarts={initialCarts} />
        </div>
      )}
    </div>
  );
};

export default ShopPage;
