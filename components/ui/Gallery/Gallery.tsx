'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Gallery.module.css'

const images = [
  { id: 1, src: '/images/about/1.jpg', alt: 'Фото 1' },
  { id: 2, src: '/images/about/2.jpg', alt: 'Фото 2' },
  { id: 3, src: '/images/about/3.jpg', alt: 'Фото 3' },
  { id: 4, src: '/images/about/4.jpg', alt: 'Фото 4' },
  { id: 5, src: '/images/about/5.jpg', alt: 'Фото 5' },
  { id: 6, src: '/images/about/6.jpg', alt: 'Фото 6' },
  { id: 7, src: '/images/about/7.jpg', alt: 'Фото 7' },
];

export default function Gallery() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);

  const openModal = (image: typeof images[0]) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <>
      <div className={styles.gallery}>
        {images.map(img => (
          <div key={img.id} className={styles.thumb} onClick={() => openModal(img)}>
            <Image src={img.src} alt={img.alt} width={200} height={150} className={styles.image} />
          </div>
        ))}
      </div>

      {modalOpen && selectedImage && (
        <div className={styles.modalOverlay} onClick={onOverlayClick}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModal} aria-label="Закрыть">&times;</button>
            <Image src={selectedImage.src} alt={selectedImage.alt} width={800} height={600} className={styles.modalImage} />
          </div>
        </div>
      )}
    </>
  );
}
