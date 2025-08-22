import type { SVGProps } from 'react';

export function ImageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" {...props}>
      <path fill="currentColor" d="M14 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V2C16 0.9 15.1 0 14 0ZM4.5 9L6.5 11.5L9.5 8L13 13H3L4.5 9Z" />
    </svg>
  );
}