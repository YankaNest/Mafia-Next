'use client';
import { CreateGamePayload } from '@/interfaces/game';
import { createGame } from '@/lib/api/games';
import React, { useState } from 'react';
import styles from './CreateGameForm.module.css'
import Button from '../Button/Button';

const CreateGameForm: React.FC = () => {
  const [form, setForm] = useState<CreateGamePayload>({
    name: '',
    startTime: '',
    endOfRegistration: '',
    maxPlayers: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'maxPlayers' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Преобразуем дату из локального формата в ISO строку
      const payload: CreateGamePayload = {
        ...form,
        startTime: new Date(form.startTime).toISOString(),
        endOfRegistration: new Date(form.endOfRegistration).toISOString(),
      };

      console.log('payload', JSON.stringify(payload))

      const createdGame = await createGame(payload);
      console.log('created Game !!!!', createdGame);
      
      setSuccess(`Игра "${'createdGame'}" успешно создана!`);
      setForm({
        name: '',
        startTime: '',
        endOfRegistration: '',
        maxPlayers: 1,
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Ошибка при создании игры');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.formTitle}>Создать игру</h2>
      <div className={styles.inputContainer}>
        <label htmlFor="name">Название игры:</label><br />
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="startTime">Время начала игры:</label><br />
        <input
          type="datetime-local"
          id="startTime"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="endOfRegistration">Конец регистрации:</label><br />
        <input
          type="datetime-local"
          id="endOfRegistration"
          name="endOfRegistration"
          value={form.endOfRegistration}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="maxPlayers">Максимальное количество игроков:</label><br />
        <input
          type="number"
          id="maxPlayers"
          name="maxPlayers"
          min={1}
          value={form.maxPlayers}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Создание...' : 'Создать игру'}
      </Button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default CreateGameForm;