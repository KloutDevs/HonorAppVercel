import styles from './RecruitMap.module.css';
import CountryIcon from '@/assets/countries/1.png';

export const RecruitMap = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>MAPA DE RECLUTAS</span>
        <span className={styles.subtitle}>Red Global</span>
      </div>
      <div className={styles.body}>
        <div className={styles.counter}>12</div>
        <div className={styles.rankContainer}>
          <img 
            src={CountryIcon}
            alt="Rank" 
            className={styles.rankImage}
          />
        </div>
      </div>
    </div>
  );
};