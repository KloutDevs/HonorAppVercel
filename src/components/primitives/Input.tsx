import { useState } from 'react';
import { MajesticonsEyeLine } from '@/components/icons/MajesticonsEyeLine';
import { MajesticonsEyeOffLine } from '@/components/icons/MajesticonsEyeOffLine';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  height?: string;
  padding?: string;
  className?: string;
  canShowPassword?: boolean;
  multiline?: boolean;
  rows?: number;
}

const baseStyles = `
  flex
  flex-col
  items-start
  gap-2.5
  flex-shrink-0
  rounded-lg
  border
  border-primary
  bg-primary-clarity
  text-secondary-light
  font-montserrat
  text-xs
  font-medium
  outline-none
`;

export function Input({ 
  width = 'w-full',
  height = 'h-[50px]',
  padding = 'px-6 py-[17px]',
  className = '',
  type = 'text',
  canShowPassword = true,
  multiline = false,
  rows = 4,
  ...props 
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const inputStyles = `
    ${baseStyles}
    ${isPassword && canShowPassword ? 'pr-12' : ''}
    ${width}
    ${!multiline ? height : ''}
    ${padding}
    ${className}
  `;

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          rows={rows}
          className={`${inputStyles} resize-none min-h-[100px]`}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          type={showPassword ? 'text' : type}
          className={inputStyles}
          {...props}
        />
      )}
      
      {isPassword && canShowPassword && !multiline && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-secondary-light hover:text-primary transition-colors"
        >
          {showPassword ? (
            <MajesticonsEyeOffLine width={20} height={20} />
          ) : (
            <MajesticonsEyeLine width={20} height={20} />
          )}
        </button>
      )}
    </div>
  );
}