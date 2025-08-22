import type { SVGProps } from 'react';

export function LinkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" {...props}>
      <path fill="currentColor" d="M6.879 9.934a.75.75 0 0 1-.88-1.22l2.5-1.8a.75.75 0 0 1 .88 1.22l-2.5 1.8ZM4.5 6.5a2 2 0 0 1 2-2h1a.75.75 0 0 1 0 1.5h-1a.5.5 0 0 0-.5.5v1a.75.75 0 0 1-1.5 0v-1Zm7 3.5a2 2 0 0 1-2 2h-1a.75.75 0 0 1 0-1.5h1a.5.5 0 0 0 .5-.5V9a.75.75 0 0 1 1.5 0v1Z" />
    </svg>
  );
}