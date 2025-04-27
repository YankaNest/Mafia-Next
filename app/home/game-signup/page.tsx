import { auth } from '@/auth';
import styles from './GameSignupPage.module.css'
import { getAllGame } from '@/lib/api/games';
import GameSlider from '@/components/ui/GameSlider/GameSlider';

const GameSignupPage = async () => {
 const session = await auth();
 const allGames = await getAllGame();
 

  return (
    <div className={styles['game-signup']}>
      <GameSlider allGames={allGames} session={session} />
  
    </div>
  );
};

export default GameSignupPage;
