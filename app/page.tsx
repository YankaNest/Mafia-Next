import { redirect } from 'next/navigation';

export default function MainPage() {
  redirect('/home');
  return null; // Можно ничего не возвращать, т.к. произойдёт редирект
}
