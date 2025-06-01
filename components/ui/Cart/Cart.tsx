// 'use client';

// import React, { useState } from 'react';
// import styles from './Cart.module.css';
// import Button from '../Button/Button';
// import CartItem from './CartItem';
// import { ICart } from '@/interfaces/cart';
// //import { IOrder } from '@/interfaces/order'; // ваш интерфейс заказа
// import { createOrder } from '@/lib/api/orders'; // функция создания заказа
// import { deleteCard, getCard } from '@/lib/api/carts';

// interface CartProps {
//   initialCarts: ICart[];
// }

// const Cart: React.FC<CartProps> = ({ initialCarts }) => {
//   const [carts, setCarts] = useState<ICart[]>(initialCarts);
//   const [isOrdering, setIsOrdering] = useState(false);
//   const [address, setAddress] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState<number>(0); // 0 - наличные, 1 - карта
//   const [loading, setLoading] = useState(false);

//   const handleOrderClick = () => {
//     setIsOrdering(true);
//   };

//   const handleConfirmOrder = async () => {
//     if (!address.trim()) {
//       alert('Пожалуйста, введите адрес доставки');
//       return;
//     }

//     setLoading(true);

//     try {
//       await createOrder(  address, paymentMethod);
//       await deleteCard();
//       const updatedCart = await getCard();
//       setCarts(updatedCart);
//       setIsOrdering(false);
//       setAddress('');
//       setPaymentMethod(0);
//       alert('Заказ успешно оформлен!');
//     } catch (error) {
//       console.error('Ошибка при оформлении заказа:', error);
//       alert('Не удалось оформить заказ. Попробуйте позже.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <h2 className={styles['cart']}>Корзина</h2>
//       <CartItem carts={carts} />

//       <div className={styles['button-container']}>
//         {!isOrdering && (
//           <Button onClick={handleOrderClick} disabled={carts.length === 0}>
//             Оформить заказ
//           </Button>
//         )}

//         {isOrdering && (
//           <div className={styles['order-form']}>

//             <div className={styles['input-container']}>
//              <label htmlFor='addres' className={styles['label']}>Адрес доставки:</label>

//               <input
//                 type="text"
//                 id='addres'
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 placeholder="Введите адрес"
//                 disabled={loading}
//                 className={styles['input']}
//               />
//             </div>
            
//             <div className={styles['input-container']}>
//             <label htmlFor='payMethod' className={styles['label']}>Метод оплаты:</label>
//               <select
//                 value={paymentMethod}
//                 id='payMethod'
//                 onChange={(e) => setPaymentMethod(Number(e.target.value))}
//                 disabled={loading}
//                 className={styles['select']}
//               >
//                 <option value={0}>Наличные</option>
//                 <option value={1}>Карта</option>
//               </select>
//             </div>

            

//             <Button onClick={handleConfirmOrder} disabled={loading}>
//               {loading ? 'Оформление...' : 'Подтвердить заказ'}
//             </Button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Cart;


// 'use client';

// import React, { useState } from 'react';
// import styles from './Cart.module.css';
// import Button from '../Button/Button';
// import CartItem from './CartItem';
// import { ICart } from '@/interfaces/cart';
// import { createOrder } from '@/lib/api/orders';
// import { deleteCard, getCard, updateCard } from '@/lib/api/carts';

// interface CartProps {
//   initialCarts: ICart[];
// }

// const Cart: React.FC<CartProps> = ({ initialCarts }) => {
//   const [carts, setCarts] = useState<ICart[]>(initialCarts);
//   const [quantities, setQuantities] = useState<Record<string, number>>(
//     Object.fromEntries(initialCarts.map(cart => [cart.id, cart.quantity]))
//   );
//   const [isOrdering, setIsOrdering] = useState(false);
//   const [address, setAddress] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState<number>(0);
//   const [loading, setLoading] = useState(false);

//   const handleQuantityChange = async (cart: ICart, newQuantity: number) => {
//     setQuantities(prev => ({
//       ...prev,
//       [cart.id]: newQuantity,
//     }));

//     try {
//       await updateCard(cart.productId, newQuantity);
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//       alert('Ошибка обновления корзины');
//       setQuantities(prev => ({
//         ...prev,
//         [cart.id]: cart.quantity,
//       }));
//     }
//   };

//   const handleOrderClick = () => {
//     setIsOrdering(true);
//   };

//   const handleConfirmOrder = async () => {
//     if (!address.trim()) {
//       alert('Пожалуйста, введите адрес доставки');
//       return;
//     }

//     setLoading(true);

//     try {
//       await createOrder(address, paymentMethod);
//       await deleteCard();
//       const updatedCart = await getCard();
//       setCarts(updatedCart);
//       setQuantities(Object.fromEntries(updatedCart.map(cart => [cart.id, cart.quantity])));
//       setIsOrdering(false);
//       setAddress('');
//       setPaymentMethod(0);
//       alert('Заказ успешно оформлен!');
//     } catch (error) {
//       console.error('Ошибка при оформлении заказа:', error);
//       alert('Не удалось оформить заказ. Попробуйте позже.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const total = carts.reduce(
//     (sum, cart) => sum + (cart.product.price * (quantities[cart.id] ?? cart.quantity)),
//     0
//   );

//   return (
//     <>
//       <h2 className={styles['cart']}>Корзина</h2>
//       {carts.length === 0 ? (
//         <div className={styles['empty-cart']}>Корзина пуста</div>
//       ) : (
//         <>
//           {carts.map(cart => (
//             <CartItem
//               key={cart.id}
//               cart={cart}
//               quantity={quantities[cart.id] ?? cart.quantity}
//               onQuantityChange={handleQuantityChange}
//             />
//           ))}
//           <div className={styles['total']}>
//             <strong>Итого: {total} руб.</strong>
//           </div>
//         </>
//       )}

//       <div className={styles['button-container']}>
//         {!isOrdering && (
//           <Button onClick={handleOrderClick} disabled={carts.length === 0}>
//             Оформить заказ
//           </Button>
//         )}

//         {isOrdering && (
//           <div className={styles['order-form']}>

//             <div className={styles['input-container']}>
//               <label htmlFor='addres' className={styles['label']}>Адрес доставки:</label>
//               <input
//                 type="text"
//                 id='addres'
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 placeholder="Введите адрес"
//                 disabled={loading}
//                 className={styles['input']}
//               />
//             </div>
            
//             <div className={styles['input-container']}>
//               <label htmlFor='payMethod' className={styles['label']}>Метод оплаты:</label>
//               <select
//                 value={paymentMethod}
//                 id='payMethod'
//                 onChange={(e) => setPaymentMethod(Number(e.target.value))}
//                 disabled={loading}
//                 className={styles['select']}
//               >
//                 <option value={0}>Наличные</option>
//                 <option value={1}>Карта</option>
//               </select>
//             </div>

//             <Button onClick={handleConfirmOrder} disabled={loading}>
//               {loading ? 'Оформление...' : 'Подтвердить заказ'}
//             </Button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Cart;

'use client';

import React, { useState } from 'react';
import styles from './Cart.module.css';
import Button from '../Button/Button';
import CartItem from './CartItem';
import { ICart } from '@/interfaces/cart';
import { createOrder } from '@/lib/api/orders';
import { deleteCard, getCard, updateCard } from '@/lib/api/carts';
import Image from 'next/image';

interface CartProps {
  initialCarts: ICart[];
}

const Cart: React.FC<CartProps> = ({ initialCarts }) => {
  const [carts, setCarts] = useState<ICart[]>(initialCarts);
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(initialCarts.map(cart => [cart.id, cart.quantity]))
  );
  const [isOrdering, setIsOrdering] = useState(false);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = async (cart: ICart, newQuantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [cart.id]: newQuantity,
    }));

    try {
      await updateCard(cart.productId, newQuantity);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // alert('Ошибка обновления корзины');
      setQuantities(prev => ({
        ...prev,
        [cart.id]: cart.quantity,
      }));
    }
  };

  // Новая функция удаления товара
  const handleRemove = async (cart: ICart) => {
    try {
      await updateCard(cart.productId, 0);
      // Обновляем локальное состояние корзины и количества
      const updatedCarts = carts.filter(c => c.id !== cart.id);
      setCarts(updatedCarts);

      const updatedQuantities = { ...quantities };
      delete updatedQuantities[cart.id];
      setQuantities(updatedQuantities);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // alert('Ошибка удаления товара из корзины');
    }
  };

  const handleOrderClick = () => {
    setIsOrdering(true);
  };

  const handleConfirmOrder = async () => {
    if (!address.trim()) {
      // alert('Пожалуйста, введите адрес доставки');
      return;
    }

    setLoading(true);

    try {
      await createOrder(address, paymentMethod);
      await deleteCard();
      const updatedCart = await getCard();
      setCarts(updatedCart);
      setQuantities(Object.fromEntries(updatedCart.map(cart => [cart.id, cart.quantity])));
      setIsOrdering(false);
      setAddress('');
      setPaymentMethod(0);
      alert('Заказ успешно оформлен!');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      //console.error('Ошибка при оформлении заказа:', error);
      alert('Не удалось оформить заказ. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };
  const handleClearCart = async () => {
  // if (!confirm('Вы уверены, что хотите очистить всю корзину?')) {
  //   return;
  // }

  setLoading(true);
  try {
    await deleteCard();
    setCarts([]);
    setQuantities({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
  } finally {
    setLoading(false);
  }
};


  const total = carts.reduce(
    (sum, cart) => sum + (cart.product.price * (quantities[cart.id] ?? cart.quantity)),
    0
  );

  return (
    <>
    <div className={styles['cart-name']}>
      <h2 className={styles['cart']}>Корзина</h2>
      <div className={styles['cart-button']}>
        <Button
          onClick={handleClearCart}
          disabled={carts.length === 0 || loading}
        >
          <Image src={'/deleteCart.svg'} alt={'очистить корзину'} width={35} height={35}></Image>
        </Button>
      </div>

    </div>

      {carts.length === 0 ? (
        <div className={styles['empty-cart']}>Корзина пуста</div>
      ) : (
        <>
          {carts.map(cart => (
            <CartItem
              key={cart.id}
              cart={cart}
              quantity={quantities[cart.id] ?? cart.quantity}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove} // передаём функцию удаления
            />
          ))}
          <div className={styles['total']}>
            <strong>Итого: {total} руб.</strong>
          </div>
        </>
      )}

      <div className={styles['button-container']}>
        {!isOrdering && (
          <Button onClick={handleOrderClick} disabled={carts.length === 0}>
            Оформить заказ
          </Button>
        )}

        {isOrdering && (
          <div className={styles['order-form']}>

            <div className={styles['input-container']}>
              <label htmlFor='addres' className={styles['label']}>Адрес доставки:</label>
              <input
                type="text"
                id='addres'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Введите адрес"
                disabled={loading}
                className={styles['input']}
              />
            </div>
            
            <div className={styles['input-container']}>
              <label htmlFor='payMethod' className={styles['label']}>Метод оплаты:</label>
              <select
                value={paymentMethod}
                id='payMethod'
                onChange={(e) => setPaymentMethod(Number(e.target.value))}
                disabled={loading}
                className={styles['select']}
              >
                <option value={0}>Наличные</option>
                <option value={1}>Карта</option>
              </select>
            </div>

            <Button onClick={handleConfirmOrder} disabled={loading}>
              {loading ? 'Оформление...' : 'Подтвердить заказ'}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
