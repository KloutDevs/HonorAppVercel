import { cn } from "@/utils/cn";
import styles from "./Button.module.css";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'outline' | 'transparent';
  size?: 'sm' | 'md' | 'lg' | 'custom';
  font?: 'inter' | 'valkocapela' | 'montserrat';
}

const fontFamilyMap = {
  inter: 'var(--font-inter)',
  valkocapela: 'var(--font-valkocapela)',
  montserrat: 'var(--font-montserrat)',
};

export const Button = ({ 
  className, 
  children, 
  variant = 'primary',
  size = 'md',
  font = 'valkocapela',
  style,
  ...props 
}: ButtonProps) => {
  return (
    <button
      className={cn(
        styles.button,
        styles[variant],
        size !== 'custom' && styles[size],
        className
      )}
      style={{
        fontFamily: fontFamilyMap[font],
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
};