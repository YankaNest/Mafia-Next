'use client';
import React, { useEffect, useState } from 'react';
import { IProduct } from '@/interfaces/product';
import { getAllProduct } from '@/lib/api/products';
import { deleteProduct } from '@/lib/api/products';
import styles from './DeleteProductForm.module.css';
import Button from '../Button/Button';

export default function ProductDeleteForm() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllProduct();
      setProducts(data);
    } catch (err) {
      setError('Ошибка загрузки списка продуктов');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    setError('');
    setSuccess('');
    const confirmDelete = window.confirm('Вы уверены, что хотите удалить этот продукт?');
    if (!confirmDelete) return;

    try {
      await deleteProduct(productId);
      setSuccess('Продукт успешно удалён');
      setProducts(products.filter((p) => p.id !== productId));
    } catch (err) {
      setError('Ошибка при удалении продукта');
      console.error(err);
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className={styles.form}>
      <h2 className={styles.formTitle}>Удаление продукта</h2>
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <div className={styles.gameListContainer}>
        <ul className={styles.gameList}>
          {products.map((product) => (
            <li key={product.id} className={styles.gameItem}>
              <span className={styles.gameInfo}>
                {product.name} — {product.price} ₽
              </span>
              <Button
                onClick={() => handleDelete(product.id)}
              >
                Удалить
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
