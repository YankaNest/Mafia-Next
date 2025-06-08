// import Image from 'next/image';
// import React from 'react';
// import styles from './ProfilePage.module.css';
// import { getUser } from '@/lib/api/users';

// const user = await getUser();

// const ProfilePage = () => {
//   // Если есть profileImageUrl - используем её, иначе - дефолтную картинку
//   const imageSrc = user.profileImageUrl && user.profileImageUrl.trim() !== ''
//     ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL_WITH_SLASH}${user.profileImageUrl}`
//     : '/no_profile_image.jpg';

//   return (
//     <div className={styles.main}>
//       <div className={styles.mainInfo}>
//         <div className={styles.profile_image_wrapper}>
//           <Image
//             className={styles.profile_image}
//             src={imageSrc}
//             alt={'Фото профиля'}
//             width={300}
//             height={300}
//           />
//           <button className={styles.overlay}>Редактировать фото</button>
//         </div>
//         <div className={styles.info}>
//           <div className={styles.userName}>
//             <p>{user.firstName}</p>
//             <p>{user.lastName}</p>
//           </div>
//           <p>{user.phoneNumber}</p>
//           <p>{user.email}</p>
//         </div>
//       </div>
//       <div className={styles.games}>
//         <p>Записи на игры</p>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

// import React from 'react';
// import { getUser } from '@/lib/api/users';
// import Image from 'next/image';
// import styles from './ProfilePage.module.css';
// import AuthModals from '@/components/ui/AuthForms/AuthForms';
// import { auth } from '@/auth';
// import { Game } from '@/interfaces/game';
// import { getRegistredGame } from '@/lib/api/games';
// import { IOrder } from '@/interfaces/order';
// import { getOrders } from '@/lib/api/orders';

// export default async function ProfilePage() {
//   const session = await auth();

//   if (!session?.token) {
//     return <AuthModals />;
//   }
//   const user = await getUser();

//    let registredGame: Game[] = [];
//     registredGame = await getRegistredGame();

//     let orders: IOrder[] = [];
//     orders = await getOrders();
   
//   const imageSrc = user.profileImageUrl && user.profileImageUrl.trim() !== ''
//     ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL_WITH_SLASH}${user.profileImageUrl}`
//     : '/no_profile_image.jpg';

//   return (
//     <div className={styles.main}>
//       {/* Ваш профиль */}
//       <div className={styles.mainInfo}>
//         <div className={styles.profile_image_wrapper}>
//           <Image
//             className={styles.profile_image}
//             src={imageSrc}
//             alt={'Фото профиля'}
//             width={300}
//             height={300}
//           />
//           <button className={styles.overlay}>Редактировать фото</button>
//         </div>
//         <div className={styles.info}>
//           <div className={styles.userName}>
//             <p>{user.firstName}</p>
//             <p>{user.lastName}</p>
//           </div>
//           <p>{user.phoneNumber}</p>
//           <p>{user.email}</p>
//         </div>
//       </div>
     
//       <div className={styles.games}>
//         <p>Записи на игры</p>
//         {
//         registredGame.map((game) => (
//         <div key={game.id}>
//             <p>{game.startTime}</p>
//         </div>
//         ))}
//       </div>

//       <div>
//         <p>Заказы</p>
//         {
//         orders.map((order) => (
//         <div key={order.id}>
//             <p>Адрес:{order.address}</p>
//             <p>Дата заказа:{order.orderDate}</p>
//             <p>Метод оплаты:{order.paymentMethod}</p>
//             <p>Cумма заказа:{order.totalAmount}</p>
//             <p>Статус заказа:{order.status}</p>
//         </div>
//         ))} 
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { getUser } from '@/lib/api/users';
import Image from 'next/image';
import styles from './ProfilePage.module.css';
import AuthModals from '@/components/ui/AuthForms/AuthForms';
import { auth } from '@/auth';
import { Game } from '@/interfaces/game';
import { getRegistredGame } from '@/lib/api/games';
import { IOrder } from '@/interfaces/order';
import { getOrders } from '@/lib/api/orders';
import SignOutButton from '@/components/ui/SignOutButton/SignOutButton';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.token) {
    return <AuthModals />;
  }

  const user = await getUser();

  let registredGame: Game[] = [];
  registredGame = await getRegistredGame();

  let orders: IOrder[] = [];
  orders = await getOrders();

  const imageSrc =
    user.profileImageUrl && user.profileImageUrl.trim() !== ''
      ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL_WITH_SLASH}${user.profileImageUrl}`
      : '/no_profile_image.jpg';

  // Функции форматирования даты и времени
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const paymentMethods = ['Наличные', 'Карта'];
  const orderStatuses = ['Новый', 'В обработке', 'Отправлен', 'Доставлен', 'Отменён'];

  return (
    <div className={styles.main}>
      {/* Ваш профиль */}
      <div className={styles.mainInfo}>
        <div className={styles.profile_image_wrapper}>
          <Image
            className={styles.profile_image}
            src={imageSrc}
            alt={'Фото профиля'}
            width={300}
            height={300}
            priority
          />
          <button className={styles.overlay}>Редактировать фото</button>
        </div>
        <div className={styles.info}>
          <div className={styles.userName}>
            <p>{user.firstName} {user.lastName}</p>
          </div>
          <p>{user.phoneNumber}</p>
          <p>{user.email}</p>
        </div>
        <SignOutButton/>
      </div>

      <div className={styles.games}>
        <h3 className={styles.title}>Записи на игры</h3>
        {registredGame.length === 0 && <p>Нет записей на игры</p>}
        {registredGame.map((game) => (
          <div key={game.id} className={styles.gameCard}>
            <p>
              <strong className={styles.strongText}>Дата:</strong> {formatDate(game.startTime)}
            </p>
            <p>
              <strong className={styles.strongText}>Время:</strong> {formatTime(game.startTime)}
            </p>
          </div>
        ))}
      </div>

      <div className={styles.orders}>
        <h3 className={styles.title}>Заказы</h3>
        {orders.length === 0 && <p>Нет заказов</p>}
        {orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <p>
              <strong className={styles.strongText}>Адрес:</strong> {order.address}
            </p>
            <p>
              <strong className={styles.strongText}>Дата заказа:</strong> {formatDate(order.orderDate)} {formatTime(order.orderDate)}
            </p>
            <p>
              <strong className={styles.strongText}>Метод оплаты:</strong> {paymentMethods[order.paymentMethod] ?? 'Неизвестно'}
            </p>
            <p>
              <strong className={styles.strongText}>Сумма заказа:</strong> {order.totalAmount} руб.
            </p>
            <p>
              <strong className={styles.strongText}>Статус заказа:</strong> {orderStatuses[order.status] ?? 'Неизвестно'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}