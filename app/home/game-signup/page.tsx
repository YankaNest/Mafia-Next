import { auth } from '@/auth';
import styles from './GameSignupPage.module.css'
import GameCard from '@/components/ui/GameCard/GameCard';

const GameSignupPage = async () => {
 const session = await auth();
 console.log(session);

  return (
    <div className={styles['game-signup']}>
      <GameCard />
      <GameCard />
      <GameCard />
    </div>
  );
};

export default GameSignupPage;
