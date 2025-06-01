// 'use client';
// import React  from 'react';
// import styles from './ShopCard.module.css';
// import Button from '../Button/Button';
// import { IProduct } from '@/interfaces/product';
// import Image from 'next/image';
// import { getCard, updateCard } from '@/lib/api/carts';

// interface ProductCardProps {
//   products: IProduct[]
// }

// const ShopCard: React.FC<ProductCardProps> = ({products}) => {
//   const addToCart = async (productId: string) => {
//     try {
//       await updateCard(productId, 1);
//       await getCard();
//       console.log('Добавлено в корзину');
//     } catch (error) {
//       console.error('Ошибка при добавлении в корзину:', error);
//     }
//   };
//     return (
//       <>
//       {products.map((product) => (
      
//       <div key={product.id} className={styles['shop-card']}>
//             <Image className={styles['shop-card-img']} src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL_WITH_SLASH}${product.mainImageUrl}`} alt={'карты'}  width={200} height={200}/>
//             <p className={styles['name']} >{product.name}</p>
//             <p className={styles['collection-name']} >{product.description}</p>
//             <div className={styles['prise-container']}>
//                 <Button onClick={() => addToCart(product.id)}>
//                     <img className={styles['cart-add']} src="/cart-add.svg" alt="ksd" />
//                 </Button>
//                 <p className={styles['new-prise']} >{product.price} руб.</p>
//             </div>
//       </div>
      
//       ))};
//     </>
//     );
//   };
  

// export default ShopCard;

'use client';

import React from 'react';
import styles from './ShopCard.module.css';
import Button from '../Button/Button';
import { IProduct } from '@/interfaces/product';
import Image from 'next/image';
import { updateCard } from '@/lib/api/carts';

interface ProductCardProps {
  products: IProduct[];
}

const ShopCard: React.FC<ProductCardProps> = ({ products }) => {
  const addToCart = async (productId: string) => {
    try {
       await updateCard( productId, 1);

      window.location.href = '/home/shop';
    } catch (error) {
      console.error('Ошибка при добавлении в корзину:', error);
      alert('Не удалось добавить товар в корзину');
    }
  };

  return (
    <>
      {products.map((product) => (
        <div key={product.id} className={styles['shop-card']}>
          <Image
            className={styles['shop-card-img']}
            src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL_WITH_SLASH}${product.mainImageUrl}`}
            alt={product.name}
            width={200}
            height={200}
          />
          <p className={styles['name']}>{product.description}</p>
          <p className={styles['collection-name']}>{product.name}</p>
          <div className={styles['prise-container']}>
            <Button onClick={() => addToCart(product.id)}>
              <Image className={styles['cart-add']} src="/cart-add.svg" alt="Добавить в корзину" />
            </Button>
            <p className={styles['new-prise']}>{product.price} руб.</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ShopCard;
