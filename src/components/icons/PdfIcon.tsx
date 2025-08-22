import type { SVGProps } from 'react';

export function PdfIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" {...props}>
      <path fill="currentColor" d="M10 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V6L10 0ZM12 14H4V12H12V14ZM12 10H4V8H12V10ZM9 7V1.5L14.5 7H9Z" />
    </svg>
  );
}