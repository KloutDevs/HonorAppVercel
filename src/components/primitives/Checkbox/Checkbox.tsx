import { cn } from '@/utils/cn';
import type { ComponentProps } from 'react';

type OmittedInputProps = 'type' | 'className' | 'onChange';

interface CheckboxProps extends Omit<ComponentProps<'input'>, OmittedInputProps> {
  variant?: 'primary' | 'secondary';
  label?: string;
  className?: string;
  checkboxClassName?: string;
  containerClassName?: string;
  showCircleBg?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox = ({
  variant = 'primary',
  label,
  className,
  checkboxClassName,
  containerClassName,
  showCircleBg = true,
  disabled,
  checked,
  onChange,
  ...props
}: CheckboxProps) => {
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(e.target.checked);
    }
  };

  // Estilos base del checkbox
  const checkboxStyles = cn(
    'relative w-[18px] h-[18px] rounded-[4px] transition-colors duration-200',
    {
      // Cuando está deshabilitado
      'bg-dark-grey-700 cursor-default': disabled,
      // Cuando está activo
      [variant === 'primary' ? 'bg-primary' : 'bg-secondary']: checked && !disabled,
      // Estado normal
      'bg-[rgba(190,221,125,0.1)] border border-[rgba(190,221,125,0.15)] hover:border-[rgba(190,221,125,0.3)] cursor-pointer':
        !checked && !disabled,
    },
    checkboxClassName
  );

  // Estilos del contenedor circular
  const circleStyles = cn(
    'flex justify-center items-center transition-colors duration-200 select-none',
    {
      'p-[11px] rounded-full': showCircleBg,
      'bg-[rgba(26,46,26,0.4)] hover:bg-[rgba(26,46,26,0.6)] cursor-pointer':
        showCircleBg && !disabled,
      'bg-[rgba(26,46,26,0.2)] cursor-default': showCircleBg && disabled,
    },
    className
  );

  return (
    <div
      className={cn(
        'flex p-1 flex-col justify-center items-center select-none',
        containerClassName
      )}
    >
      <label className={circleStyles}>
        <input
          type="checkbox"
          className="sr-only"
          disabled={disabled}
          checked={checked}
          onChange={handleToggle}
          {...props}
        />
        <div className={checkboxStyles}>
          {checked && !disabled && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 select-none pointer-events-none"
            >
              <path
                d="M10 16.4L6 12.4L7.4 11L10 13.6L16.6 7L18 8.4L10 16.4Z"
                fill="currentColor"
                className="text-secondary-active"
              />
            </svg>
          )}
          {disabled && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[2px] bg-primary-light/50 rounded-full" />
          )}
        </div>
        {label && (
          <span
            className={cn('ml-2 text-sm', {
              'text-primary-light': !disabled,
              'text-primary-light/50': disabled,
            })}
          >
            {label}
          </span>
        )}
      </label>
    </div>
  );
};