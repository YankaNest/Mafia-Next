import { auth } from '@/auth';
import CreateGameForm from '@/components/ui/CreateGemeForm/CreateGameForm';
import CreateProductForm from '@/components/ui/CreateProductForm/CreateProductForm';
import { redirect } from 'next/navigation';
import React from 'react';
import styles from './admin.module.css';

export default async function AdminPage() {
  const session = await auth();

  if (!session || !session.user.roles?.includes('Admin')) {
    redirect('/home');
  }

  return (
    <div className={styles.formContainer}>
      <CreateGameForm/>
      <CreateProductForm/>
    </div>
  );
};

