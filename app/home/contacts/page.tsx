import React from 'react';
import ContactMap from '@/components/ui/ContactMap/ContactMap';
import styles from './ContactPage.module.css';

const ContactsPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Контакты</h1>

      <section className={styles.contactInfo}>
        <p><strong className={styles.strongText}>Почта:</strong> <a href="mailto:info@company.ru" className={styles.link}>info@company.ru</a></p>
        <p><strong className={styles.strongText}>Телефоны: </strong> 
          <a href="tel:+71234567890" className={styles.link}>+7 (123) 456-78-90</a>,&nbsp;
          <a href="tel:+79876543210" className={styles.link}>+7 (987) 654-32-10</a>
        </p>
        <p><strong className={styles.strongText}>Адрес:</strong> г. Ступино, проспект Победы, 40</p>
        <p><strong className={styles.strongText}>Как найти:</strong> Мы находимся рядом с автобусной остановкой «Торговый центр», вход со стороны парка кафе Forty One Coffee.</p>
      </section>

      <section className={styles.mapSection}>
        <ContactMap />
      </section>
    </div>
  );
};

export default ContactsPage;
