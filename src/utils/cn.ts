import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina nombres de clase con soporte para condiciones, arrays y objetos.
 * Utiliza clsx para la combinación y twMerge para resolver conflictos de Tailwind.
 * 
 * @param inputs - Clases CSS, objetos de condiciones, o arrays de clases
 * @returns String con las clases combinadas y optimizadas
 * 
 * @example
 * cn('btn', 'btn-primary', { 'opacity-50': disabled })
 * cn(['btn', isActive && 'btn-active'], 'px-4')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}