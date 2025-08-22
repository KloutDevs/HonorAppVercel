import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { MajesticonsEyeLine } from '@/components/icons/MajesticonsEyeLine';
import { MajesticonsEyeOffLine } from '@/components/icons/MajesticonsEyeOffLine';
import { useState } from 'react';

interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'size'> {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'normal';
  containerClassName?: string;
  labelClassName?: string;
  canShowPassword?: boolean;
  multiline?: boolean;
  rows?: number;
}

export const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>((
  {
    label,
    required,
    error,
    hint,
    variant = 'primary',
    size = 'normal',
    containerClassName = 'flex flex-col items-start gap-2 w-full',
    labelClassName = 'text-primary-light font-monserrat text-sm font-normal tracking-wide',
    canShowPassword = true,
    multiline = false,
    rows = 4,
    type = 'text',
    className,
    disabled,
    ...props
  },
  ref
) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const inputStyles = cn(
    // Estilo base – diseño militar
    'w-full rounded-lg border transition-all duration-300 font-inter outline-none',
    'bg-[#1A2E1A]/80 backdrop-blur-sm',              
    'border-[rgba(190,221,125,0.2)]',
    'text-white placeholder:text-gray-400',
    'caret-[#BEDD7D]', // Color visible para el cursor
    // Eliminar subrayados y decoraciones
    'no-underline decoration-none',
    '[text-decoration:none]',
    'focus:[text-decoration:none]',
    
    // Efectos de brillo delicado
    'shadow-[0_0_10px_rgba(190,221,125,0.08)]',
    'hover:border-[rgba(190,221,125,0.45)] hover:shadow-[0_0_14px_rgba(190,221,125,0.14)]',
    'focus:border-[#BEDD7D] focus:shadow-[0_0_18px_rgba(190,221,125,0.28),inset_0_0_8px_rgba(190,221,125,0.08)]',
    
    // Tamaños
    {
      'h-[42px] px-4 py-3 text-[13px]': size === 'small',
      'h-[50px] px-5 py-4 text-[14px]': size === 'normal',
      'opacity-40 cursor-not-allowed': disabled,
      'pr-14': isPassword && canShowPassword && !multiline,
      'resize-none min-h-[120px] py-4': multiline,
    },
    className
  );

  return (
    <div className={containerClassName}>
      {label && (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <label className={labelClassName}>
              {label}
              {required && <span className="text-danger text-sm ml-2">*</span>}
            </label>
          </div>
          {error && (
            <span className="text-red-400 text-xs font-medium bg-[rgba(248,40,90,0.1)] px-2 py-1 rounded border border-[rgba(248,40,90,0.2)]">
              {error}
            </span>
          )}
        </div>
      )}
      
      {hint && (
        <span className="text-xs text-gray-400 bg-[rgba(190,221,125,0.05)] px-3 py-1 rounded border border-[rgba(190,221,125,0.1)]">
          {hint}
        </span>
      )}

      <div className="relative w-full">
        {multiline ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={rows}
            className={inputStyles}
            disabled={disabled}
            spellCheck={false}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            type={showPassword ? 'text' : type}
            className={inputStyles}
            disabled={disabled}
            spellCheck={false}
            autoComplete="off"
            {...props}
          />
        )}
        
        {isPassword && canShowPassword && !multiline && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-[#A6FF00] transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(166,255,0,0.6)]"
            disabled={disabled}
          >
            {showPassword ? (
              <MajesticonsEyeOffLine width={20} height={20} />
            ) : (
              <MajesticonsEyeLine width={20} height={20} />
            )}
          </button>
        )}
      </div>
    </div>
  );
});

TextField.displayName = 'TextField';