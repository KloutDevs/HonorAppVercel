import styles from '@/modules/user/styles/Profile.module.css';
import { UserInfo } from '../components/UserInfo/UserInfo';
import { ContentSummary } from '../components/ContentSummary/ContentSummary';
import { RankingMap } from '../components/RankingMap/RankingMap';

export default function Profile() {
  return (
    <div className={styles.container}>
      <UserInfo />
      <ContentSummary />
      <RankingMap />
    </div>
  );
}