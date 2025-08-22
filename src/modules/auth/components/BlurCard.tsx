import type { DetailedHTMLProps, HTMLAttributes } from 'react';

interface BlurCardProps {
  className?: string;
  children?: React.ReactNode;
}

export function BlurCard({ className, children }: BlurCardProps) {
  return (
    <div
      className={className}
      style={{
        width: '787px',
        height: '856px',
        flexShrink: 0,
        position: 'absolute'
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="787"
        height="856"
        viewBox="0 0 787 856"
        fill="none"
        style={{
          filter: 'drop-shadow(0 0 32px rgba(50, 255, 106, 0.19))',
          backdropFilter: 'blur(4px)',
        }}
      >
        <foreignObject x="-8" y="-8" width="803" height="872">
          <div
            style={{
              backdropFilter: 'blur(4px)',
              clipPath: 'url(#bgblur_0_14071_8912_clip_path)',
              height: '100%',
              width: '100%'
            }}
          />
        </foreignObject>
        <g filter="url(#filter0_i_14071_8912)">
          <mask id="path-1-inside-1_14071_8912" fill="white">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M787 48C787 21.4903 765.51 0 739 0H298C271.49 0 250 21.4903 250 48V105C250 131.51 228.51 153 202 153H48C21.4903 153 0 174.49 0 201V465C0 491.51 21.4904 513 48 513H202C228.51 513 250 534.49 250 561V808C250 834.51 271.49 856 298 856L739 856C765.51 856 787 834.51 787 808V48Z"
            />
          </mask>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M787 48C787 21.4903 765.51 0 739 0H298C271.49 0 250 21.4903 250 48V105C250 131.51 228.51 153 202 153H48C21.4903 153 0 174.49 0 201V465C0 491.51 21.4904 513 48 513H202C228.51 513 250 534.49 250 561V808C250 834.51 271.49 856 298 856L739 856C765.51 856 787 834.51 787 808V48Z"
            fill="rgba(255, 255, 255, 0.12)"
          />
          <path
            d="M739 856V853V856ZM298 856V853V856ZM298 -3H739V3H298V-3ZM247 105V48H253V105H247ZM202 156H48V150H202V156ZM3 201V465H-3V201H3ZM48 510H202V516H48V510ZM247 808V561H253V808H247ZM739 859L298 859V853L739 853V859ZM790 48V808H784V48H790ZM739 853C763.853 853 784 832.853 784 808H790C790 836.167 767.167 859 739 859V853ZM253 808C253 832.853 273.147 853 298 853V859C269.833 859 247 836.166 247 808H253ZM202 510C230.167 510 253 532.833 253 561H247C247 536.147 226.853 516 202 516V510ZM3 465C3 489.853 23.1472 510 48 510V516C19.8335 516 -3 493.167 -3 465H3ZM48 156C23.1472 156 3 176.147 3 201H-3C-3 172.833 19.8335 150 48 150V156ZM253 105C253 133.167 230.167 156 202 156V150C226.853 150 247 129.853 247 105H253ZM739 -3C767.167 -3 790 19.8335 790 48H784C784 23.1472 763.853 3 739 3V-3ZM298 3C273.147 3 253 23.1472 253 48H247C247 19.8335 269.833 -3 298 -3V3Z"
            fill="rgba(255, 255, 255, 0.16)"
            mask="url(#path-1-inside-1_14071_8912)"
            strokeWidth="3"
          />
        </g>
        <defs>
          <filter
            id="filter0_i_14071_8912"
            x="-8"
            y="-8"
            width="803"
            height="872"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="16" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.196078 0 0 0 0 1 0 0 0 0 0.415686 0 0 0 0.19 0"
            />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_14071_8912" />
          </filter>
          <clipPath id="bgblur_0_14071_8912_clip_path" transform="translate(8 8)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M787 48C787 21.4903 765.51 0 739 0H298C271.49 0 250 21.4903 250 48V105C250 131.51 228.51 153 202 153H48C21.4903 153 0 174.49 0 201V465C0 491.51 21.4904 513 48 513H202C228.51 513 250 534.49 250 561V808C250 834.51 271.49 856 298 856L739 856C765.51 856 787 834.51 787 808V48Z"
            />
          </clipPath>
        </defs>
      </svg>
      {children}
    </div>
  );
}