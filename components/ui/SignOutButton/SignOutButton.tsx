'use client';

import { useCallback } from 'react';
import { signOut } from 'next-auth/react';
import Button from '@/components/ui/Button/Button';

const SignOutButton = () => {
  const handleSignOut = useCallback(() => {
    signOut(); // Перенаправление на главную после выхода
  }, []);
  
  return (
    <Button onClick={handleSignOut}>
      Выйти
    </Button>
  );
};

export default SignOutButton;
