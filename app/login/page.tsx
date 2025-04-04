// import Button from '@/components/ui/Button/Button';
// import Input from '@/components/ui/Input/Input';
// import React, { useState } from 'react';


// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     // Проверка данных и авторизация
//     const storedUsername = localStorage.getItem('username');
//     const storedPassword = localStorage.getItem('password');

//     if (username === storedUsername && password === storedPassword) {
//       // Авторизация успешна
//       localStorage.setItem('isLoggedIn', 'true');
//     }
//   };

//   return (
//     <div>
//       <h1>Авторизация</h1>
//       <Input placeholder="Имя пользователя" value={username} onChange={setUsername} />
//       <Input placeholder="Пароль" value={password} onChange={setPassword} />
//       <Button onClick={handleLogin}>Войти</Button>
//     </div>
//   );
// };

// export default LoginPage;
