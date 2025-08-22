import { create } from 'zustand';
import { debug } from '@/utils/debug';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'outline' | 'transparent';

// Interfaz para la configuración de botones
interface ButtonConfig {
  text: string;
  variant?: ButtonVariant;
  onClick?: () => void | Promise<void>;
  loading?: boolean;
  loadingText?: string;
  showStates?: boolean;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  extraContent?: React.ReactNode;
  primaryButton?: ButtonConfig;
  secondaryButton?: ButtonConfig;
}

type NotificationParams = Omit<Notification, 'id' | 'type'>;

interface NotificationStore {
  currentModal: Notification | null;
  showModal: (notification: Omit<Notification, 'id'>) => void;
  closeModal: () => void;
  success: (params: NotificationParams) => void;
  error: (params: NotificationParams) => void;
  warning: (params: NotificationParams) => void;
  info: (params: NotificationParams) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  currentModal: null,

  showModal: (notification) => {
    debug.log('NotificationStore', 'Showing modal with config:', notification);
    set({
      currentModal: {
        id: crypto.randomUUID(),
        ...notification,
      },
    });
    debug.log('NotificationStore', 'Modal state updated');
  },

  closeModal: () => {
    debug.log('NotificationStore', 'Closing modal');
    set({ currentModal: null });
    debug.log('NotificationStore', 'Modal closed');
  },

  success: (params) => {
    debug.log('NotificationStore', 'Showing success modal:', params);
    set({
      currentModal: {
        id: crypto.randomUUID(),
        type: 'success',
        primaryButton: {
          text: '¡Genial!',
          variant: 'primary',
          showStates: false,
          ...params.primaryButton,
        },
        ...params,
      },
    });
  },

  error: (params) => {
    debug.log('NotificationStore', 'Showing error modal:', params);
    set({
      currentModal: {
        id: crypto.randomUUID(),
        type: 'error',
        primaryButton: {
          text: 'Entendido',
          variant: 'danger',
          showStates: false,
          ...params.primaryButton,
        },
        ...params,
      },
    });
  },

  warning: (params) => {
    debug.log('NotificationStore', 'Showing warning modal:', params);
    set({
      currentModal: {
        id: crypto.randomUUID(),
        type: 'warning',
        primaryButton: {
          text: 'Entendido',
          variant: 'warning',
          showStates: false,
          ...params.primaryButton,
        },
        ...params,
      },
    });
  },

  info: (params) => {
    debug.log('NotificationStore', 'Showing info modal:', params);
    set({
      currentModal: {
        id: crypto.randomUUID(),
        type: 'info',
        primaryButton: {
          text: 'Entendido',
          variant: 'info',
          showStates: false,
          ...params.primaryButton,
        },
        ...params,
      },
    });
  },
}));