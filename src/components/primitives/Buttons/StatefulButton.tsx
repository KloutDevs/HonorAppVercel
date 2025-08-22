import { cn } from '@/utils/cn';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useAnimate } from 'framer-motion';

interface StatefulButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'
  > {
  className?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'outline' | 'transparent';
  onLoadingChange?: (isLoading: boolean) => void;
  onSuccess?: () => void;
  onError?: () => void;
  forceLoading?: boolean;
  forceSuccess?: boolean;
  forceError?: boolean;
  loadingDuration?: number; // Duración exacta del loading
  skipLoading?: boolean; // Saltar la animación de loading
  loadingText?: string; // Texto durante el loading
}

const variantStyles = {
  primary: 'bg-primary text-background hover:ring-primary ring-offset-2 hover:ring-2 dark:ring-offset-black ',
  secondary: 'bg-secondary text-white hover:ring-secondary ring-offset-2 hover:ring-2 dark:ring-offset-black ',
  danger: 'bg-danger text-white hover:ring-danger ring-offset-2 hover:ring-2 dark:ring-offset-black ',
  success: 'bg-success text-white hover:ring-success ring-offset-2 hover:ring-2 dark:ring-offset-black ',
  warning: 'bg-warning text-white hover:ring-warning ring-offset-2 hover:ring-2 dark:ring-offset-black ',
  info: 'bg-info text-white hover:ring-info ring-offset-2 hover:ring-2 dark:ring-offset-black ',
  outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-background',
  transparent: 'bg-transparent text-primary hover:bg-primary/10',
};

export const StatefulButton = ({
  className,
  children,
  variant = 'primary',
  onLoadingChange,
  onSuccess,
  onError,
  forceLoading,
  forceSuccess,
  forceError,
  onClick,
  loadingDuration,
  skipLoading = false,
  loadingText,
  ...props
}: StatefulButtonProps) => {
  const [scope, animate] = useAnimate();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const animateLoading = async () => {
    if (skipLoading) return;

    setStatus('loading');
    onLoadingChange?.(true);

    await animate(
      '.loader',
      {
        width: '20px',
        scale: 1,
        display: 'block',
      },
      {
        duration: 0.2,
      }
    );

    if (loadingDuration) {
      await new Promise((resolve) => setTimeout(resolve, loadingDuration));
      // Ocultamos el loader automáticamente después de la duración
      await animate(
        '.loader',
        {
          width: '0px',
          scale: 0,
          display: 'none',
        },
        {
          duration: 0.2,
        }
      );
      setStatus('idle');
      onLoadingChange?.(false);
    }
  };

  const animateSuccess = async () => {
    setStatus('success');
    onLoadingChange?.(false);
    await animate(
      '.loader',
      {
        width: '0px',
        scale: 0,
        display: 'none',
      },
      {
        duration: 0.2,
      }
    );
    await animate(
      '.check',
      {
        width: '20px',
        scale: 1,
        display: 'block',
      },
      {
        duration: 0.2,
      }
    );

    await animate(
      '.check',
      {
        width: '0px',
        scale: 0,
        display: 'none',
      },
      {
        delay: 2,
        duration: 0.2,
      }
    );
    setStatus('idle');
    onSuccess?.();
  };

  const animateError = async () => {
    setStatus('error');
    onLoadingChange?.(false);

    // Ocultar el loader
    await animate(
      '.loader',
      {
        width: '0px',
        scale: 0,
        display: 'none',
      },
      {
        duration: 0.2,
      }
    );

    // Mostrar el ícono de error
    await animate(
      '.error',
      {
        width: '20px',
        scale: 1,
        display: 'block',
      },
      {
        duration: 0.2,
      }
    );

    // Ocultar el ícono de error después de un delay
    await animate(
      '.error',
      {
        width: '0px',
        scale: 0,
        display: 'none',
      },
      {
        delay: 2,
        duration: 0.2,
      }
    );

    setStatus('idle');
    onError?.();
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (status !== 'idle') return;

    try {
      if (!skipLoading) {
        await animateLoading();
      }
      await onClick?.(event);
      if (!loadingDuration) { // Solo animamos success si no hay duración de loading específica
        await animateSuccess();
      }
    } catch (error) {
      await animateError();
    }
  };

  useEffect(() => {
    if (forceLoading) animateLoading();
  }, [forceLoading]);

  useEffect(() => {
    if (forceSuccess) animateSuccess();
  }, [forceSuccess]);

  useEffect(() => {
    if (forceError) animateError();
  }, [forceError]);

  return (
    <motion.button
      layout
      layoutId="button"
      ref={scope}
      disabled={status !== 'idle'}
      className={cn(
        'flex min-w-[120px] cursor-pointer items-center justify-center gap-2 rounded-[32px] px-4 py-2 font-medium transition duration-200 font-valkocapela uppercase',
        variantStyles[variant],
        status === 'error' && 'bg-danger text-white',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <motion.div layout className="flex items-center gap-2">
        <Loader />
        <CheckIcon />
        <ErrorIcon />
       <motion.span layout className="text-nowrap">
          {status === 'loading' && loadingText ? loadingText : children}
        </motion.span>
      </motion.div>
    </motion.button>
  );
};

const Loader = () => {
  return (
    <motion.svg
      animate={{
        rotate: [0, 360],
      }}
      initial={{
        scale: 0,
        width: 0,
        display: 'none',
      }}
      style={{
        scale: 0.5,
        display: 'none',
      }}
      transition={{
        duration: 0.3,
        repeat: Infinity,
        ease: 'linear',
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="loader text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a9 9 0 1 0 9 9" />
    </motion.svg>
  );
};

const CheckIcon = () => {
  return (
    <motion.svg
      initial={{
        scale: 0,
        width: 0,
        display: 'none',
      }}
      style={{
        scale: 0.5,
        display: 'none',
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="check text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </motion.svg>
  );
};

const ErrorIcon = () => {
  return (
    <motion.svg
      initial={{
        scale: 0,
        width: 0,
        display: 'none',
      }}
      style={{
        scale: 0.5,
        display: 'none',
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="error text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </motion.svg>
  );
};
