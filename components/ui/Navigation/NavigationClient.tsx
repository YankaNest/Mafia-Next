// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import styles from './Navigation.module.css';
// import { Session } from 'next-auth';

// interface NavigationClientProps {
//   session?: Session | null;
// }

// const NavigationClient: React.FC<NavigationClientProps> = ({ session }) => {
//   const isAdmin = session?.user?.roles?.includes('Admin');
//   const [menuOpen, setMenuOpen] = useState(false);

//   const links = [
//     { href: '/home/game-signup', label: 'Запись на игры' },
//     { href: '/home/shop', label: 'Магазин' },
//     { href: '/home/about', label: 'О нас' },
//     { href: '/home/contacts', label: 'Контакты' },
//     { href: '/home/profile', label: 'Профиль' },
//   ];

//   if (isAdmin) {
//     links.push({ href: '/home/admin', label: 'Админ-панель' });
//   }

//   return (
//     <div className={styles.main}>
//       <nav className={styles.nav}>
//         <div className={styles['mafia-st']}>
//           <Link href="/home">MafiaST</Link>
//         </div>

//         <button
//           className={styles.burger}
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-label="Открыть меню"
//           type="button"
//         >
//           <span />
//           <span />
//           <span />
//         </button>

//         <div className={`${styles['nav-links']} ${menuOpen ? styles.open : ''}`}>
//           {links.map(({ href, label }) => (
//             <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
//               {label}
//             </Link>
//           ))}
//         </div>

//         {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
//       </nav>
//     </div>
//   );
// };

// export default NavigationClient;

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';
import { Session } from 'next-auth';

interface NavigationClientProps {
  session?: Session | null;
}

const NavigationClient: React.FC<NavigationClientProps> = ({ session }) => {
  const pathname = usePathname();
  const isAdmin = session?.user?.roles?.includes('Admin');
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: '/home/game-signup', label: 'Запись на игры' },
    { href: '/home/shop', label: 'Магазин' },
    { href: '/home/about', label: 'О нас' },
    { href: '/home/contacts', label: 'Контакты' },
    { href: '/home/profile', label: 'Профиль' },
  ];

  if (isAdmin) {
    links.push({ href: '/home/admin', label: 'Админ-панель' });
  }
  const isMafiaSTActive = pathname === '/home' || pathname === '/';

  return (
    <div className={styles.main}>
      <nav className={styles.nav}>
        <div className={styles['mafia-st']}>
          <Link href="/home" className={isMafiaSTActive ? styles.active : ''}>MafiaST</Link>
        </div>

        <button
          className={styles.burger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Открыть меню"
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`${styles['nav-links']} ${menuOpen ? styles.open : ''}`}>
          {links.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={isActive ? styles.active : ''}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
      </nav>
    </div>
  );
};

export default NavigationClient;
