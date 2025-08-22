import * as Dialog from '@radix-ui/react-dialog';
import styles from './Modal.module.css';
import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  width?: number | string;
  className?: string;
}

export const Modal = ({ isOpen, onClose, children, title, width = 450, className = '' }: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          aria-describedby='modal-description'
          className={`${styles.content} ${className}`}
          style={{ width: typeof width === 'number' ? `${width}px` : width }}
        >
          {title && (
            <div className={styles.header}>
              <div className={styles.headerContent}>
                <Dialog.Title className={styles.title}>{title}</Dialog.Title>
                <Dialog.Close className={styles.closeButton}>
                  <CloseIcon />
                </Dialog.Close>
              </div>
            </div>
          )}
          <div className={styles.contentBody}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="var(--color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
