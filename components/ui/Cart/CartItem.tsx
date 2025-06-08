// 'use client';

// import { ICart } from '@/interfaces/cart';
// import Image from 'next/image';
// import React from 'react';
// import styles from './CartItem.module.css'

// interface CartItemProps {
//   carts: ICart[];
// }

// const CartItem: React.FC<CartItemProps> = ({ carts}) => {
//   return (
//     <>
//       {carts.map((cart) => (
//         <div className={styles.CartItemContainer} key={cart.id}>
//           <div className={styles.name}>
//             <Image src={'/shop-card-img.svg'} alt={'Картинка товара'} width={100} height={100}></Image>
//             <p>Товар: {cart.product.name}</p>
//           </div>
//           <p className={styles.quantity}>Количество: {cart.quantity}</p>
//         </div>
//       ))}
//     </>
//   );
// };

// export default CartItem;

// 'use client';

// import { ICart } from '@/interfaces/cart';
// import Image from 'next/image';
// import React, { useState } from 'react';
// import styles from './CartItem.module.css';
// import Button from '../Button/Button';
// import { updateCard } from '@/lib/api/carts';

// interface CartItemProps {
//   carts: ICart[];
// }

// const CartItem: React.FC<CartItemProps> = ({ carts }) => {
//   // Локальное состояние для количества каждого товара
//   const [quantities, setQuantities] = useState<Record<string, number>>(
//     Object.fromEntries(carts.map(cart => [cart.id, cart.quantity]))
//   );

//   // Изменение количества и отправка на сервер
//   const handleQuantityChange = async (cart: ICart, delta: number) => {
//     const newQuantity = Math.max(1, (quantities[cart.id] ?? cart.quantity) + delta);

//     setQuantities(prev => ({
//       ...prev,
//       [cart.id]: newQuantity,
//     }));

//     try {
//       await updateCard(cart.productId, newQuantity);
//       // Можно обновить корзину глобально, если надо
      
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//       // В случае ошибки можно вернуть старое значение
//       setQuantities(prev => ({
//         ...prev,
//         [cart.id]: cart.quantity,
//       }));
//       alert('Ошибка обновления корзины');
//     }
//   };

//   return (
//     <>
//       {carts.map((cart) => (
//         <div className={styles.CartItemContainer} key={cart.id}>
//           <div className={styles.name}>
//             <Image
//               src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL_WITH_SLASH}${cart.product.mainImageUrl}`}
//               alt={'Картинка товара'}
//               width={100}
//               height={100}
//             />
//             <p>{cart.product.name}</p><br />
//             <p>{cart.product.description}</p>
//           </div>
//           <div className={styles.quantity}>
//             <Button onClick={() => handleQuantityChange(cart, -1)}>-</Button>
//             <span className={styles.quantityValue}>{quantities[cart.id] ?? cart.quantity}</span>
//             <Button onClick={() => handleQuantityChange(cart, +1)}>+</Button>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default CartItem;

// 'use client';

// import { ICart } from '@/interfaces/cart';
// import Image from 'next/image';
// import React, { useState } from 'react';
// import styles from './CartItem.module.css';
// import Button from '../Button/Button';
// import { updateCard } from '@/lib/api/carts';

// interface CartItemProps {
//   carts: ICart[];
// }

// const CartItem: React.FC<CartItemProps> = ({ carts }) => {
//   const [quantities, setQuantities] = useState<Record<string, number>>(
//     Object.fromEntries(carts.map(cart => [cart.id, cart.quantity]))
//   );

//   const handleQuantityChange = async (cart: ICart, delta: number) => {
//     const newQuantity = Math.max(1, (quantities[cart.id] ?? cart.quantity) + delta);

//     setQuantities(prev => ({
//       ...prev,
//       [cart.id]: newQuantity,
//     }));

//     try {
//        await updateCard(cart.productId, newQuantity);
//       //window.location.href = '/home/shop';


//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//       setQuantities(prev => ({
//         ...prev,
//         [cart.id]: cart.quantity,
//       }));
//       alert('Ошибка обновления корзины');
//     }
//   };

//   return (
//     <>
//       {carts.map((cart) => (
//         <div className={styles.CartItemContainer} key={cart.id}>
//           <div className={styles.cartItem}>
//             <Image
//               src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL_WITH_SLASH}${cart.product.mainImageUrl}`}
//               alt={'Картинка товара'}
//               width={100}
//               height={66}
//             />
//             <div className={styles.textContainer}>
//               <p className={styles.description}>{cart.product.description}</p>
//               <p className={styles.name}>{cart.product.name}</p>
//               <p className={styles.name}>{cart.product.price} руб.</p>
//             </div>
            
//           </div>
//           <div className={styles.quantity}>
//             <Button onClick={() => handleQuantityChange(cart, -1)}>-</Button>
//             <span className={styles.quantityValue}>{quantities[cart.id] ?? cart.quantity}</span>
//             <Button onClick={() => handleQuantityChange(cart, +1)}>+</Button>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default CartItem;

// 'use client';

// import { ICart } from '@/interfaces/cart';
// import Image from 'next/image';
// import React from 'react';
// import styles from './CartItem.module.css';
// import Button from '../Button/Button';

// interface CartItemProps {
//   cart: ICart;
//   quantity: number;
//   onQuantityChange: (cart: ICart, newQuantity: number) => void;
// }

// const CartItem: React.FC<CartItemProps> = ({ cart, quantity, onQuantityChange }) => {
//   const handleQuantityChange = (delta: number) => {
//     const newQuantity = Math.max(1, quantity + delta);
//     onQuantityChange(cart, newQuantity);
//   };

//   return (
//     <div className={styles.CartItemContainer}>
//       <div className={styles.cartItem}>
//         <Image
//           src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL_WITH_SLASH}${cart.product.mainImageUrl}`}
//           alt={'Картинка товара'}
//           width={100}
//           height={66}
//         />
//         <div className={styles.textContainer}>
//           <p className={styles.description}>{cart.product.description}</p>
//           <p className={styles.name}>{cart.product.name}</p>
//           <p className={styles.name}>{cart.product.price} руб.</p>
//         </div>
//       </div>
//       <div className={styles.quantity}>
//         <Button onClick={() => handleQuantityChange(-1)}>-</Button>
//         <span className={styles.quantityValue}>{quantity}</span>
//         <Button onClick={() => handleQuantityChange(+1)}>+</Button>
//       </div>
//     </div>
//   );
// };

// export default CartItem;

'use client';

import { ICart } from '@/interfaces/cart';
import Image from 'next/image';
import React from 'react';
import styles from './CartItem.module.css';
import Button from '../Button/Button';

interface CartItemProps {
  cart: ICart;
  quantity: number;
  onQuantityChange: (cart: ICart, newQuantity: number) => void;
  onRemove: (cart: ICart) => void; // добавляем пропс для удаления
}

const CartItem: React.FC<CartItemProps> = ({ cart, quantity, onQuantityChange, onRemove }) => {
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    onQuantityChange(cart, newQuantity);
  };

  const handleRemoveClick = () => {
    if (confirm(`Удалить товар "${cart.product.name}" из корзины?`)) {
      onRemove(cart);
    }
  };

  return (
    <div className={styles.CartItemContainer}>
      <div className={styles.cartItem}>
        <Image
        className={styles.productImage}
          src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL_WITH_SLASH}${cart.product.mainImageUrl}`}
          alt={'Картинка товара'}
          width={100}
          height={66}
        />
        <div className={styles.textContainer}>
          <p className={styles.description}>{cart.product.description}</p>
          <p className={styles.name}>{cart.product.name}</p>
          <p className={styles.name}>
            {cart.product.price} руб.
            <button
              onClick={handleRemoveClick}
              className={styles.removeButton}
              aria-label="Удалить товар"
              style={{
                marginLeft: '30px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              title="Удалить товар из корзины"
            >
              <Image src={'/deleteCartMini.svg'} alt={'Удалить товар'} width={15} height={15}></Image>
            </button>
          </p>
        </div>
      </div>
      <div className={styles.quantity}>
        <Button onClick={() => handleQuantityChange(-1)}>-</Button>
        <span className={styles.quantityValue}>{quantity}</span>
        <Button onClick={() => handleQuantityChange(+1)}>+</Button>
      </div>
    </div>
  );
};

export default CartItem;

