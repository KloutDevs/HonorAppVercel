import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import type { ReactNode } from 'react';
import styles from './Dropdown.module.css';

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  className?: string;
}

export const Dropdown = ({ 
  trigger, 
  children, 
  side = 'bottom',
  align = 'center',
  sideOffset = 5,
  className 
}: DropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {trigger}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content 
          className={`${styles.content} ${className || ''}`}
          sideOffset={sideOffset}
          side={side}
          align={align}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

// Exportación de subcomponentes para mejor organización 
export const DropdownItem = ({ 
  children, 
  className,
  ...props 
}: DropdownMenu.DropdownMenuItemProps) => (
  <DropdownMenu.Item 
    className={`${styles.item} ${className || ''}`} 
    {...props}
  >
    {children}
  </DropdownMenu.Item>
);