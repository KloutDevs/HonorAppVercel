export const ENV = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production'
} as const;

export const CURRENT_ENV = import.meta.env.VITE_APP_ENV || ENV.PRODUCTION;

export const IS_DEV = CURRENT_ENV === ENV.DEVELOPMENT;
export const IS_STAGING = CURRENT_ENV === ENV.STAGING;
export const IS_PROD = CURRENT_ENV === ENV.PRODUCTION;

export const IS_DEV_OR_STAGING = IS_DEV || IS_STAGING;