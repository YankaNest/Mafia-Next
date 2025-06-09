'use client';
import { Game } from '@/interfaces/game';
import { deleteGame, getAllGame } from '@/lib/api/games';
import React, { useEffect, useState } from 'react';
import styles from './DeleteGameForm.module.css'; // Import CSS module
import Button from '../Button/Button';


export default function GameDeleteForm() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllGame();
      setGames(data);
    } catch (err) {
      setError('Ошибка загрузки списка игр');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (gameId: string) => {
    setError('');
    setSuccess('');
    try {
      await deleteGame(gameId);
      setSuccess('Игра успешно удалена');
      setGames(games.filter((g: Game) => g.id !== gameId));
    } catch (err) {
      setError('Ошибка при удалении игры');
      console.error(err);
    }
  };

  // Helper function to format the date and time
  const formatDateTime = (isoDateString: string): string => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  // ...
return (
  <div className={styles.form}>
    <h2 className={styles.formTitle}>Удаление игры</h2>
    {success && <div style={{ color: 'green' }}>{success}</div>}
    <div className={styles.gameListContainer}>
      <ul className={styles.gameList}>
        {games.map((game: Game) => (
          <li key={game.id} className={styles.gameItem}>
            <span className={styles.gameInfo}>
              {formatDateTime(game.startTime)}
            </span>
            <Button
              onClick={() => handleDelete(game.id)}
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
