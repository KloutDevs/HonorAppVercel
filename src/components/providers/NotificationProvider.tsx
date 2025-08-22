import { useEffect } from 'react';
import { AlertModal } from '@/components/ui/AlertModal/AlertModal';
import { useNotificationStore } from '@/stores/notifications';
import { debug } from '@/utils/debug';

const typeToIcon = {
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
} as const;

export function NotificationProvider() {
  const { currentModal, closeModal } = useNotificationStore();

  const handleClose = () => {
    debug.log('NotificationProvider', 'Handle close triggered');
    closeModal();
  };

  useEffect(() => {
    debug.log('NotificationProvider', 'Modal visibility changed:', !!currentModal);
  }, [currentModal]);

  if (!currentModal) return null;

  // Configurar botones con manejadores de cierre
  const primaryButton = currentModal.primaryButton && {
    ...currentModal.primaryButton,
    onClick: async () => {
      try {
        if(currentModal?.primaryButton?.onClick) {
          await currentModal.primaryButton.onClick();
        }
      } finally {
        closeModal();
      }
    },
  };

  const secondaryButton = currentModal.secondaryButton && {
    ...currentModal.secondaryButton,
    onClick: async () => {
      try {
        if(currentModal?.secondaryButton?.onClick) {
          await currentModal.secondaryButton.onClick();
        }
      } finally {
        closeModal();
      }
    },
  };

  return (
    <AlertModal
      isOpen={!!currentModal}
      onClose={handleClose}
      title={currentModal.title}
      message={currentModal.message}
      icon={typeToIcon[currentModal.type]}
      extraContent={currentModal.extraContent}
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
    />
  );
}