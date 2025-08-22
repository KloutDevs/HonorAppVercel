import { Label } from "@/components/primitives/Label";

interface FormRowProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
  hint?: string;
}

export function FormRow({
  label,
  required = false,
  error,
  children,
  className = '',
  hint,
}: FormRowProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex flex-col gap-1">
        <Label required={required}>{label}</Label>
        {hint && (
          <span className="text-xs text-secondary-light">
            {hint}
          </span>
        )}
      </div>
      
      {children}
      
      {error && (
        <div className="min-h-[20px] flex items-center">
          <p className="text-sm text-red-500 truncate" title={error}>
            {error}
          </p>
        </div>
      )}
    </div>
  );
}