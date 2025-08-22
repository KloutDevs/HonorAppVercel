import React from 'react';
import styles from './LayeredBackground.module.css';
import { motion } from 'framer-motion';

interface LayeredBackgroundProps {
  children: React.ReactNode;
  hasTopClip?: boolean;
}

const LayeredBackground: React.FC<LayeredBackgroundProps> = ({ children,
  hasTopClip = true }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.shapesContainer} ${!hasTopClip && styles.noClip}`}>
        <div className={styles.volumeShape} />
        <div className={styles.outsideShape} />
        <motion.div
          className={styles.worldImage}
          animate={{
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default LayeredBackground;