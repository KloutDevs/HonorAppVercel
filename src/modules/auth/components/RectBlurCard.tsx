interface RectBlurCardProps {
  className?: string;
  children?: React.ReactNode;
  width?: number;
  height?: number;
}

export function RectBlurCard({ className, children, width = 586, height = 856 }: RectBlurCardProps) {
  return (
    <div
      className={className}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        flexShrink: 0,
        position: 'relative'
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={{
          filter: 'drop-shadow(0 0 32px rgba(50, 255, 106, 0.19))',
          backdropFilter: 'blur(4px)',
        }}
      >
        <foreignObject x="-8" y="-8" width={width + 16} height={height + 16}>
          <div
            style={{
              backdropFilter: 'blur(4px)',
              clipPath: 'url(#bgblur_rect_clip_path)',
              height: '100%',
              width: '100%'
            }}
          />
        </foreignObject>
        <g filter="url(#filter0_i_rect)">
          <mask id="path-1-inside-1_rect" fill="white">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={`M${width} 48C${width} 21.4903 ${width - 21.49} 0 ${width - 48} 0H48C21.4903 0 0 21.4903 0 48V${height - 48}C0 ${height - 21.49} 21.4903 ${height} 48 ${height}H${width - 48}C${width - 21.49} ${height} ${width} ${height - 21.49} ${width} ${height - 48}V48Z`}
            />
          </mask>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d={`M${width} 48C${width} 21.4903 ${width - 21.49} 0 ${width - 48} 0H48C21.4903 0 0 21.4903 0 48V${height - 48}C0 ${height - 21.49} 21.4903 ${height} 48 ${height}H${width - 48}C${width - 21.49} ${height} ${width} ${height - 21.49} ${width} ${height - 48}V48Z`}
            fill="rgba(255, 255, 255, 0.12)"
          />
          <path
            d={`M${width - 48} ${height}V${height - 3}V${height}ZM48 ${height}V${height - 3}V${height}ZM48 -3H${width - 48}V3H48V-3ZM3 ${height - 48}V48H-3V${height - 48}H3ZM${width - 48} ${height + 3}H48V${height - 3}H${width - 48}V${height + 3}ZM${width - 3} 48V${height - 48}H${width + 3}V48H${width - 3}ZM${width - 48} ${height - 3}C${width - 23.147} ${height - 3} ${width - 3} ${height - 23.147} ${width - 3} ${height - 48}H${width + 3}C${width + 3} ${height - 21.833} ${width - 21.833} ${height + 3} ${width - 48} ${height + 3}V${height - 3}ZM3 ${height - 48}C3 ${height - 23.147} 23.1472 ${height - 3} 48 ${height - 3}V${height + 3}C19.8335 ${height + 3} -3 ${height - 21.833} -3 ${height - 48}H3ZM48 3C23.1472 3 3 23.1472 3 48H-3C-3 19.8335 19.8335 -3 48 -3V3ZM${width - 48} -3C${width - 21.833} -3 ${width + 3} 19.8335 ${width + 3} 48H${width - 3}C${width - 3} 23.1472 ${width - 23.147} 3 ${width - 48} 3V-3Z`}
            fill="rgba(255, 255, 255, 0.16)"
            mask="url(#path-1-inside-1_rect)"
            strokeWidth="3"
          />
        </g>
        <defs>
          <filter
            id="filter0_i_rect"
            x="-8"
            y="-8"
            width={width + 16}
            height={height + 16}
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
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_rect" />
          </filter>
          <clipPath id="bgblur_rect_clip_path" transform="translate(8 8)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={`M${width} 48C${width} 21.4903 ${width - 21.49} 0 ${width - 48} 0H48C21.4903 0 0 21.4903 0 48V${height - 48}C0 ${height - 21.49} 21.4903 ${height} 48 ${height}H${width - 48}C${width - 21.49} ${height} ${width} ${height - 21.49} ${width} ${height - 48}V48Z`}
            />
          </clipPath>
        </defs>
      </svg>
      {children}
    </div>
  );
}