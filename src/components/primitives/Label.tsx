interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  size?: 'xs' | 'sm' | 'base' | 'lg';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
}

export function Label({ 
  children, 
  required = false, 
  size = 'xs', 
  weight = 'medium',
  className = '',
  ...props 
}: LabelProps) {
  const sizeClasses = {
    'xs': 'text-xs',
    'sm': 'text-sm',
    'base': 'text-base',
    'lg': 'text-lg'
  };

  const weightClasses = {
    'normal': 'font-normal',
    'medium': 'font-medium',
    'semibold': 'font-semibold',
    'bold': 'font-bold'
  };

  return (
    <label 
      className={`
        text-secondary-light 
        font-montserrat 
        ${sizeClasses[size]}
        ${weightClasses[weight]}
        ${className}
      `}
      {...props}
    >
      {children}
      {required && (
        <span className="text-[#C4CADA] font-montserrat ml-1">
          *
        </span>
      )}
    </label>
  );
}