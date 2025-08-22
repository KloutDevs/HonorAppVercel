import type { SVGProps } from 'react';

export function AudioIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" {...props}>
      <path fill="currentColor" d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM7 3H9V13H7V3ZM3 7H5V9H3V7ZM11 7H13V9H11V7Z" />
    </svg>
  );
}