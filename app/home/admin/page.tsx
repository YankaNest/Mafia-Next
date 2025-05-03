import { auth } from '@/auth';
import CreateGameForm from '@/components/ui/CreateGemeForm/CreateGameForm';
import CreateProductForm from '@/components/ui/CreateProductForm/CreateProductForm';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function AdminPage() {
  const session = await auth();

  if (!session || !session.user.roles?.includes('Admin')) {
    redirect('/home');
  }

  return (
    <div>
      <h1>Admin</h1>
      <CreateGameForm/>
      <CreateProductForm/>
    </div>
  );
};

