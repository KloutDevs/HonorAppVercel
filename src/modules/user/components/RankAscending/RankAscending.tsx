import styles from './RankAscending.module.css';
import RangerIcon from '@/assets/ranks/honor_insignia.svg';
import { ProgressBar } from '@/components/primitives/ProgressBar/ProgressBar';

export const RankAscending = () => {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.titleContainer}>
                        <span className={styles.title}>Ascenso de Rango</span>
                    </div>

                    {/* Precios y Progreso */}
                    <div className={styles.progressContainer}>
                        <div className={styles.pricesContainer}>
                            <span className={styles.currentPrice}>$12.000</span>
                            <span className={styles.targetPrice}>$15.000</span>
                        </div>
                        <ProgressBar current={12000} target={15000} />
                    </div>
                </div>

                {/* Imagen del rango */}
                <div className={styles.rankImage}>
                    <img
                        src={RangerIcon}
                        alt="Next Rank"
                        className={styles.rankIcon}
                    />
                </div>

                {/* Información del rango */}
                <div className={styles.rankInfoWelcome}>
                    <div className={styles.rankLabel}>
                        <span className={styles.rankLabelText}>Próximo rango</span>
                    </div>
                    <div className={styles.rankValue}>
                        <span className={styles.rankValueText}>RANGER</span>
                    </div>
                </div>
            </div>
        </div>
    );
};