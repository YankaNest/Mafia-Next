import { auth } from '@/auth';
import styles from './GameSignupPage.module.css'
import { getRegistredGame, getUpcomingGame } from '@/lib/api/games';
import GameSlider from '@/components/ui/GameSlider/GameSlider';
import { Game } from '@/interfaces/game';

const GameSignupPage = async () => {
 const session = await auth();
 const allGames = await getUpcomingGame();
 let registredGame: Game[] = [];
 if(session?.token) {
  registredGame = await getRegistredGame();
 }
 
 

  return (
    <div className={styles['game-signup']}>
      <GameSlider allGames={allGames} session={session} registredGames={registredGame}/>
    </div>
  );
};

export default GameSignupPage;
