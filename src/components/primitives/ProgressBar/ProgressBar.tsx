import { motion } from 'framer-motion';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  current: number;
  target: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, target }) => {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <div className={styles.container}>
      <div className={styles.track}>
        <motion.div
          className={styles.progress}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: 0.5,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
};