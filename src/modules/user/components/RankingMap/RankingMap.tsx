import styles from './RankingMap.module.css';
import { RecruitMap } from './components/RecruitMap/RecruitMap';
import { RankingCard } from './components/RankingCard/RankingCard';

export const RankingMap = () => {
  return (
    <div className={styles.container}>
      <RecruitMap />
      <RankingCard />
    </div>
  );
};