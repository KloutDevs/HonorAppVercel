import styles from './UserInfo.module.css';
import { WelcomeCard } from '../WelcomeCard/WelcomeCard';
import { RankAscending } from '../RankAscending/RankAscending';

export const UserInfo = () => {
  return (
    <div className={styles.container}>
      <WelcomeCard />
      <RankAscending />
    </div>
  );
};