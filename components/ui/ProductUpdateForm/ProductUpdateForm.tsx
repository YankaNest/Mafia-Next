'use client';
import React, { useEffect, useState } from 'react';
import { IProduct } from '@/interfaces/product';
import { getAllProduct, getProductById, updateProduct } from '@/lib/api/products';
import styles from './ProductUpdateForm.module.css';

export default function ProductUpdateForm() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [productData, setProductData] = useState<Partial<IProduct>>({});
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    setError('');
    try {
      const data = await getAllProduct();
      setProducts(data);
    } catch (err) {
      setError('Ошибка загрузки списка продуктов');
      console.error(err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchProduct = async (productId: string) => {
    setLoadingProduct(true);
    setError('');
    try {
      const data = await getProductById(productId);
      if (data) {
        setProductData(data);
      } else {
        setError('Продукт не найден');
      }
    } catch (err) {
      setError('Ошибка загрузки данных продукта');
      console.error(err);
    } finally {
      setLoadingProduct(false);
    }
  };

  const handleProductSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = e.target.value;
    setSelectedProductId(productId);
    fetchProduct(productId);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedProductId) {
      setError('Выберите продукт для обновления');
      return;
    }

    try {
      await updateProduct(selectedProductId, productData);
      setSuccess('Продукт успешно обновлен');
    } catch (err) {
      setError('Ошибка при обновлении продукта');
      console.error(err);
    }
  };

  if (loadingProducts) return <div>Загрузка списка продуктов...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.form}>
      <h2 className={styles.formTitle}>Обновление продукта</h2>

      <div className={styles.selectProductContainer}>
        <label htmlFor="productSelect">Выберите продукт:</label>
        <select id="productSelect" onChange={handleProductSelect} value={selectedProductId || ''}>
          <option value="">-- Выберите продукт --</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
      </div>

      {loadingProduct && <div>Загрузка данных продукта...</div>}

      {productData && productData.id && (
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label htmlFor="name">Название:</label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.input}
              value={productData.name || ''}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="description">Описание:</label>
            <textarea
              id="description"
              name="description"
              className={styles.input}
              value={productData.description || ''}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="price">Цена:</label>
            <input
              type="number"
              id="price"
              name="price"
              className={styles.input}
              value={productData.price || ''}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="availableQuantity">Количество в наличии:</label>
            <input
              type="number"
              id="availableQuantity"
              name="availableQuantity"
              className={styles.input}
              value={productData.availableQuantity || ''}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="category">Категория:</label>
            <input
              type="text"
              id="category"
              name="category"
              className={styles.input}
              value={productData.category || ''}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Обновить продукт
          </button>
        </form>
      )}

      {success && <div className={styles.success}>{success}</div>}
    </div>
  );
}
