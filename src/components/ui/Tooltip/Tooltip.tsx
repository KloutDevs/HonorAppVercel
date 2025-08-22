import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { type ReactNode, useState, useEffect } from 'react';
import styles from './Tooltip.module.css';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

export const Tooltip = ({
  content,
  children,
  side = 'bottom',
  align = 'center',
}: TooltipProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      const isMobileDevice = hasTouchScreen || isSmallScreen;
      
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    // Usar Popover para móvil
    return (
      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger asChild>
          {children}
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Content
          className={styles.content}
          side={side}
          align={align}
          sideOffset={5}
          collisionPadding={16}
          avoidCollisions
        >
          {content}
          <PopoverPrimitive.Arrow
            className={styles.arrow}
            width={8}
            height={4}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Root>
    );
  } else {
    // Usar Tooltip para desktop
    return (
      <TooltipPrimitive.Provider>
        <TooltipPrimitive.Root delayDuration={0}>
          <TooltipPrimitive.Trigger asChild>
            {children}
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Content
            className={styles.content}
            side={side}
            align={align}
            sideOffset={5}
            collisionPadding={16}
            avoidCollisions
          >
            {content}
            <TooltipPrimitive.Arrow
              className={styles.arrow}
              width={8}
              height={4}
            />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    );
  }
};