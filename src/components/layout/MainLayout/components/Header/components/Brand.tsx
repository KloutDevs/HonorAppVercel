import type { HTMLAttributes } from 'react';
import logoGreen from '@/assets/logo-green.svg';
import { motion, AnimatePresence } from 'framer-motion';

interface BrandProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export function Brand({ className, ...props }: BrandProps) {
    return (
        <AnimatePresence>
            <motion.div
                className={className}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    duration: 0.3
                }}
                style={{
                    width: '533px',
                    height: '57px',
                    flexShrink: 0,
                    position: 'absolute',
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="533"
                    height="116"
                    viewBox="0 0 533 116"
                    fill="none"
                    style={{
                        shapeRendering: 'geometricPrecision',
                        textRendering: 'geometricPrecision',
                        imageRendering: 'optimizeQuality' as any,
                        fillRule: 'evenodd',
                        clipRule: 'evenodd'
                    }}
                >
                    <g filter="url(#filter0_ii_14046_336)">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M285.417 -31H0L38.844 70.5901C49.3861 98.1277 73.6058 116 100.414 116H432.586C459.394 116 483.614 98.1277 494.156 70.5901L533 -31H285.417Z"
                            fill="#3E4D36"
                            strokeWidth="0.5"
                            stroke="#3E4D36"
                            vectorEffect="non-scaling-stroke"
                        />
                    </g>
                    <defs>
                        <filter
                            id="filter0_ii_14046_336"
                            x="0"
                            y="-31"
                            width="533"
                            height="155"
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
                            <feOffset dy="8" />
                            <feGaussianBlur stdDeviation="16" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.745098 0 0 0 0 0.866667 0 0 0 0 0.490196 0 0 0 1 0"
                            />
                            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_14046_336" />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset />
                            <feGaussianBlur stdDeviation="6" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.24 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="effect1_innerShadow_14046_336"
                                result="effect2_innerShadow_14046_336"
                            />
                        </filter>
                    </defs>
                </svg>
                <motion.img
                    src={logoGreen}
                    alt="Honor Logo"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    style={{
                        width: '188.98px',
                        aspectRatio: '188.98/70.00',
                        position: 'absolute',
                        top: '32%',
                        left: '32%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1
                    }}
                />
            </motion.div>
        </AnimatePresence>
    );
}