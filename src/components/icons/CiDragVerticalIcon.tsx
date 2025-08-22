import type { SVGProps } from 'react';

export function DragVerticalIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}>
            <path 
                fill="currentColor" 
                d="M9 6a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm10 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0zM9 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm10 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0zM9 18a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm10 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0z"
            />
        </svg>
    );
}