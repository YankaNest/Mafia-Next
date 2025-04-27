'use client';

import { CreateProductPayload } from '@/interfaces/product';
import { createProduct } from '@/lib/api/products';
import React, { useState, ChangeEvent, FormEvent } from 'react';


const CreateProductForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [availableQuantity, setAvailableQuantity] = useState<number>(0);
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!image) {
      setError('Пожалуйста, загрузите изображение.');
      return;
    }

    setLoading(true);

    try {
      const productData: CreateProductPayload = {
        name,
        description,
        price,
        availableQuantity,
        category,
        image,
      };
      // Если нужен токен, передайте его сюда
      await createProduct(productData);
        console.log('productData =>' ,productData);
        
      setSuccess('Продукт успешно создан!');
      setName('');
      setDescription('');
      setPrice(0);
      setAvailableQuantity(0);
      setCategory('');
      setImage(null);
      // Очистить input file (через реф или обновление ключа)
      // Можно добавить реф для input и очистить его value
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Ошибка при создании продукта');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label htmlFor="name">Name *</label><br />
        <input
          type="text"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description</label><br />
        <textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="price">Price *</label><br />
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

        <div>
            <label htmlFor="availableQuantity">Available Quantity *</label><br />
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

      <div>
        <label htmlFor="category">Category</label><br />
        <input
          type="text"
          id="category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="image">Image *</label><br />
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Создание...' : 'Создать продукт'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default CreateProductForm;
