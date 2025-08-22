interface RectBlurCardProps {
  className?: string;
  children?: React.ReactNode;
}

export function RectBlurCardCSS({ className, children }: RectBlurCardProps) {
  return (
    <div
      className={`relative flex-shrink-0 w-full min-h-0 z-20 ${className}`}
    >
      {/* Capa de blur y borde */}
      <div 
        className="absolute inset-0 rounded-[48px] backdrop-blur-[4px]"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          border: '3px solid rgba(255, 255, 255, 0.16)',
          boxShadow: 'inset 0 0 32px 0 rgba(50, 255, 106, 0.19)',
        }}
      />
      
      {/* Contenido */}
      <div className="relative h-full w-full">
        {children}
      </div>
    </div>
  );
}