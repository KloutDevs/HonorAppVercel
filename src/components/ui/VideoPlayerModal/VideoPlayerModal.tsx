import React, { useEffect } from 'react';
import { motion, AnimatePresence, type Variants  } from 'framer-motion';
import styles from './VideoPlayerModal.module.css';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  duration?: string;
  description?: string;
  views: number;
}

// Variantes de animación para el overlay
const overlayVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Variantes de animación para el modal
const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title,
  duration,
  description
}) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div className={styles.header}>
              <div className={styles.headerContent}>
                <h2 className={styles.title}>{title}</h2>
                <button 
                  className={styles.closeButton}
                  onClick={onClose}
                  aria-label="Cerrar reproductor"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            {/* Contenedor del video */}
            <div className={styles.videoContainer}>
              <video
                src={videoUrl}
                controls
                autoPlay={isOpen}
                playsInline
                preload="metadata"
                className={styles.video}
                poster={undefined}
              >
                Tu navegador no soporta el elemento video.
              </video>
            </div>

            {/* Información adicional */}
            <div className={styles.info}>
              <div className={styles.metaInfo}>
                {duration && <span className={styles.duration}>Duración: {duration}</span>}
              </div>
              {description && (
                <p className={styles.description}>{description}</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default VideoPlayerModal;