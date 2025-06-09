import { auth } from '@/auth';
import CreateGameForm from '@/components/ui/CreateGemeForm/CreateGameForm';
import CreateProductForm from '@/components/ui/CreateProductForm/CreateProductForm';
import { redirect } from 'next/navigation';
import React from 'react';
import styles from './admin.module.css';
import GameDeleteForm from '@/components/ui/DeleteGameForm/DeleteGameForm';
import ProductDeleteForm from '@/components/ui/DeleteProductForm/DeleteProductForm';
import ProductUpdateForm from '@/components/ui/ProductUpdateForm/ProductUpdateForm';

export default async function AdminPage() {
  const session = await auth();

  if (!session || !session.user.roles?.includes('Admin')) {
    redirect('/home');
  }

  return (
    <div className={styles.formContainer}>
      <p>Работа с играми</p>
      <div className={styles.formsContainer}>
      
        <CreateGameForm/>
        <GameDeleteForm/>
      </div>
      <p>Работа с продуктами</p>
      <div className={styles.formsContainer}>
        <CreateProductForm/>
        <ProductDeleteForm/>
        <ProductUpdateForm/>
      </div>

    </div>
  );
};

