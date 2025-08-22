import { forwardRef } from 'react';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown/Dropdown';
import { cn } from '@/utils/cn';
import styles from './DropdownField.module.css';

interface Option {
  value: string | number;
  label: string;
}

interface DropdownFieldProps {
  value: string | number;
  onChange: (value: string | number) => void;
  options: Option[];
  placeholder?: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'normal';
  padding?: string;
  maxHeight?: string;
  containerClassName?: string;
  labelClassName?: string;
  label?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const DropdownField = forwardRef<HTMLDivElement, DropdownFieldProps>(({
  value,
  onChange,
  options,
  placeholder = 'Seleccionar',
  variant = 'primary',
  size = 'normal',
  padding = 'px-4',
  maxHeight = 'max-h-[200px]',
  containerClassName = 'flex flex-col items-start gap-2 w-full',
  labelClassName = 'text-primary-light font-montserrat text-sm font-normal',
  label,
  required,
  error,
  disabled,
  icon,
  ...props
}, ref) => {
  const selectedOption = options.find(opt => opt.value === value);

  const triggerStyles = cn(
    'flex w-full min-w-[350px] items-center gap-2 justify-between rounded-lg border transition-all duration-300 cursor-pointer',
    'bg-[#1A2E1A]/80 backdrop-blur-sm',                // Fondo oliva oscuro semitransparente
    'border-[rgba(190,221,125,0.2)] shadow-[0_0_10px_rgba(190,221,125,0.08)]',
    'hover:border-[rgba(190,221,125,0.45)] hover:shadow-[0_0_14px_rgba(190,221,125,0.14)]',
    'focus:border-[#BEDD7D] focus:shadow-[0_0_18px_rgba(190,221,125,0.28),inset_0_0_8px_rgba(190,221,125,0.08)]',
    {
      'h-[40px]': size === 'small',
      'h-[48px]': size === 'normal',
      'opacity-50 cursor-not-allowed': disabled,
    },
    padding
  );

  const textStyles = cn(
    'font-montserrat text-left',
    {
      'text-primary-light': value,
      'text-primary-light/80': !value,
      'text-[12px]': size === 'small',
      'text-[14px]': size === 'normal',
    }
  );

  const dropdownContentStyles = cn(
    'min-w-[350px] w-[var(--radix-dropdown-trigger-width)] overflow-y-auto',
    styles['dropdown-content'],
    maxHeight
  );

  return (
    <div ref={ref} className={containerClassName}>
      {label && (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            <label className={labelClassName}>
              {label}
              {required && <span className="text-danger text-xs ml-2">*</span>}
            </label>
          </div>
          {error && (
            <span className="text-danger text-xs font-medium">
              {error}
            </span>
          )}
        </div>
      )}

      <Dropdown
        trigger={
          <button type="button" className={triggerStyles} disabled={disabled}>

            {icon && <span className="mr-2">{icon}</span>}
            <div className="flex-1 min-w-0">
              <span className={textStyles}>
                {selectedOption?.label || placeholder}
              </span>
            </div>
            <svg
              className={cn("text-primary", {
                'w-4 h-4': size === 'small',
                'w-6 h-6': size === 'normal',
              })}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        }
        className={dropdownContentStyles}
      >
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              'cursor-pointer',
              {
                'text-[12px]': size === 'small',
                'text-[14px]': size === 'normal',
                'text-primary': value === option.value,
                'text-primary-light': value !== option.value,
              }
            )}
          >
            {option.label}
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  );
});

DropdownField.displayName = 'DropdownField';