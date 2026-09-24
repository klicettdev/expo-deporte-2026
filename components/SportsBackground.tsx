'use client'

export function SportsBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
            <style jsx>{`
        @keyframes subtleDrift {
            0% {
                transform: translate3d(0, 0, 0) scale(1);
            }
            50% {
                transform: translate3d(18px, -14px, 0) scale(1.04);
            }
            100% {
                transform: translate3d(0, 0, 0) scale(1);
            }
        }
        @keyframes ribbonFloat {
            0% {
                transform: translate3d(0, 0, 0);
            }
            50% {
                transform: translate3d(-15px, 8px, 0);
            }
            100% {
                transform: translate3d(0, 0, 0);
            }
        }
        @keyframes dashMove {
            0% {
                stroke-dashoffset: 0;
            }
            100% {
                stroke-dashoffset: 68;
            }
        }
        .anim-drift-1 {
            animation: subtleDrift 16s ease-in-out infinite;
        }
        .anim-drift-2 {
            animation: subtleDrift 20s ease-in-out infinite reverse;
        }
        .anim-ribbon {
            animation: ribbonFloat 18s ease-in-out infinite;
        }
        .anim-dash {
            animation: dashMove 14s linear infinite;
        }
    `}</style>

            <div
                className="anim-drift-1 absolute -top-36 -left-36 w-125 h-125 bg-slate-300/15 rounded-full blur-[140px]"
            />
            <div
                className="anim-drift-2 absolute top-1/4 -right-36 w-125 h-125 bg-[#ee751b]/0.045 rounded-full blur-[150px]"
            />
            <div
                className="anim-drift-1 absolute -bottom-32 left-1/3 w-115 h-115 bg-slate-200/20 rounded-full blur-[140px]"
            />

            <svg
                className="w-full h-full object-cover"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 900"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="trackRibbon1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.0" />
                        <stop offset="40%" stopColor="#94a3b8" stopOpacity="0.06" />
                        <stop offset="70%" stopColor="#cbd5e1" stopOpacity="0.10" />
                        <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.0" />
                    </linearGradient>

                    <linearGradient id="trackRibbon2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#475569" stopOpacity="0.0" />
                        <stop offset="45%" stopColor="#94a3b8" stopOpacity="0.05" />
                        <stop offset="65%" stopColor="#ee751b" stopOpacity="0.03" />
                        <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.0" />
                    </linearGradient>

                    <linearGradient id="curveGlow" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.0" />
                        <stop offset="35%" stopColor="#64748b" stopOpacity="0.08" />
                        <stop offset="70%" stopColor="#cbd5e1" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.0" />
                    </linearGradient>
                </defs>

                {/* Cintas en suspensión flotante */}
                <g className="anim-ribbon">
                    <path
                        d="M-100,750 C 250,550 550,850 950,650 C 1200,520 1380,590 1550,500 L 1550,900 L -100,900 Z"
                        fill="url(#trackRibbon1)"
                    />

                    <path
                        d="M-50,220 C 350,90 750,380 1150,180 C 1320,100 1420,130 1550,80 L 1550,-50 L -50,-50 Z"
                        fill="url(#trackRibbon2)"
                    />

                    <path
                        d="M-80,480 C 320,260 780,580 1280,340 C 1420,270 1500,290 1600,240"
                        fill="none"
                        stroke="url(#curveGlow)"
                        strokeWidth="32"
                        strokeLinecap="round"
                    />

                    {/* Línea punteada de carril que avanza continuamente */}
                    <path
                        d="M-80,480 C 320,260 780,580 1280,340 C 1420,270 1500,290 1600,240"
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="1.2"
                        strokeDasharray="12 22"
                        opacity="0.22"
                        className="anim-dash"
                    />

                    {/* Carril exterior secundario */}
                    <path
                        d="M-60,530 C 340,310 800,630 1300,390 C 1440,320 1520,340 1620,290"
                        fill="none"
                        stroke="url(#curveGlow)"
                        strokeWidth="14"
                        strokeLinecap="round"
                        opacity="0.35"
                    />

                    {/* Cortes dinámicos en la esquina */}
                    <g opacity="0.08">
                        <polygon points="1100,-20 1480,180 1480,80 1250,-20" fill="url(#trackRibbon1)" />
                        <polygon points="980,-20 1480,260 1480,210 1120,-20" fill="url(#trackRibbon2)" />
                    </g>
                </g>
            </svg>

            {/* 3. Textura técnica sutil */}
            <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                    backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                    maskImage: 'linear-gradient(to bottom, black 25%, transparent 85%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 25%, transparent 85%)',
                }}
            />
        </div>
    )
}