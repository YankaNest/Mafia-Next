'use client';

import { CreateProductPayload } from '@/interfaces/product';
import { createProduct } from '@/lib/api/products';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './CreateProductForm.module.css';
import Button from '../Button/Button';

const CreateProductForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [availableQuantity, setAvailableQuantity] = useState<number>(0);
  const [category, setCategory] = useState('');
  const [mainImage, setMainImage] = useState<File | null>(null);

  // Новое состояние для нескольких изображений
  const [images, setImages] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMainImage(e.target.files[0]);
    }
  };

  // Новый обработчик для нескольких файлов
  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!mainImage) {
      setError('Пожалуйста, загрузите основное изображение.');
      return;
    }

    setLoading(true);

    try {
      // Если createProduct ждёт FormData, используйте FormData:
      // (если ждёт обычный объект, оставьте как есть)
      const productData: CreateProductPayload = {
        name,
        description,
        price,
        availableQuantity,
        category,
        mainImage,
        images,
      };

      await createProduct(productData);
      console.log('productData =>', productData);

      setSuccess('Продукт успешно создан!');
      setName('');
      setDescription('');
      setPrice(0);
      setAvailableQuantity(0);
      setCategory('');
      setMainImage(null);
      setImages([]);
      // Очистка input-ов (можно через ref)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Ошибка при создании продукта');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.form}>
      <h2 className={styles.formTitle}>Создать продукт</h2>
      <div className={styles.inputContainer}>
        <label htmlFor="name">Название *</label><br />
        <input
          type="text"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="description">Описание</label><br />
        <textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="price">Цена *</label><br />
        <input
          type="number"
          id="price"
          value={price}
          onChange={e => {
            const value = parseFloat(e.target.value);
            setPrice(isNaN(value) ? 0 : value);
          }}
          min={0}
          step="0.01"
          required
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="availableQuantity">Доступное количество *</label><br />
        <input
          type="number"
          id="availableQuantity"
          value={availableQuantity}
          onChange={e => {
            const value = parseInt(e.target.value, 10);
            setAvailableQuantity(isNaN(value) ? 0 : value);
          }}
          min={0}
          required
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="category">Категория</label><br />
        <input
          type="text"
          id="category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="mainImage">Фото *</label><br />
        <input
          type="file"
          id="mainImage"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
      </div>

      {/* Новое поле для нескольких изображений */}
      <div className={styles.inputContainer}>
        <label htmlFor="images">Галерея (несколько фото)</label><br />
        <input
          type="file"
          id="images"
          accept="image/*"
          multiple
          onChange={handleImagesChange}
        />
      </div>

      {/* Превью выбранных изображений
      {images.length > 0 && (
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          {images.map((file, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(file)}
              alt={`Фото ${idx + 1}`}
              width={80}
              height={80}
              style={{ objectFit: 'cover', borderRadius: 8 }}
            />
          ))}
        </div>
      )} */}

      <Button type="submit" disabled={loading}>
        {loading ? 'Создание...' : 'Создать продукт'}
      </Button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default CreateProductForm;
