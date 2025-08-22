const isDevelopment = ['local', 'development'].includes(import.meta.env.VITE_APP_ENV || '');

export const debug = {
  log: (component: string, message: string, data?: any) => {
    if (isDevelopment) {
      console.log(`[${component}]`, message, data || '');
    }
  },
  error: (component: string, message: string, error?: any) => {
    if (isDevelopment) {
      console.error(`[${component}]`, message, error || '');
    }
  },
  warn: (component: string, message: string, data?: any) => {
    if (isDevelopment) {
      console.warn(`[${component}]`, message, data || '');
    }
  },
};
