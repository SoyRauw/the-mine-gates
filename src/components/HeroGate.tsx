const GATE_RUNES = [
  { x: 430, y: 330, glyph: "M0-6V6M-4-2H4" },
  { x: 446, y: 260, glyph: "M0-6 5 5H-5Z" },
  { x: 492, y: 200, glyph: "M-5 4 0-5 5 4M-3 0H3" },
  { x: 550, y: 160, glyph: "M-5-4H5V5H-5ZM-5-4 5 5" },
  { x: 650, y: 160, glyph: "M0-6C4-2 4 2 0 6C-4 2-4-2 0-6Z" },
  { x: 708, y: 200, glyph: "M-5-5V5M0-5V5M5-5V5" },
  { x: 754, y: 260, glyph: "M-5 0H5M0-5V5M-4-4 4 4M4-4-4 4" },
  { x: 770, y: 330, glyph: "M-5 5 0-5 5 5M-2 1H2" },
];

const EMBERS = Array.from({ length: 16 }, (_, index) => ({
  left: `${10 + ((index * 37) % 80)}%`,
  delay: `${(index * 0.73) % 7}s`,
  duration: `${7 + (index % 5)}s`,
  size: `${2 + (index % 3)}px`,
}));

export function HeroGate() {
  return (
    <div className="hero-gate" aria-hidden="true">
      <div className="hero-gate__aura" />
      <svg
        className="hero-gate__svg"
        viewBox="0 0 1200 640"
        preserveAspectRatio="xMidYMax meet"
        focusable="false"
      >
        <defs>
          <radialGradient id="portal-gradient" cx="50%" cy="62%" r="60%">
            <stop offset="0%" stopColor="#f0d58a" stopOpacity=".95" />
            <stop offset="18%" stopColor="#c084fc" stopOpacity=".85" />
            <stop offset="48%" stopColor="#7a2bd8" stopOpacity=".72" />
            <stop offset="78%" stopColor="#3a1270" stopOpacity=".45" />
            <stop offset="100%" stopColor="#120a3a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="portal-core" cx="50%" cy="55%" r="55%">
            <stop offset="0%" stopColor="#fff8d0" stopOpacity=".9" />
            <stop offset="30%" stopColor="#e6b8ff" stopOpacity=".55" />
            <stop offset="100%" stopColor="#8a2be2" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="gold-line" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0d58a" />
            <stop offset="55%" stopColor="#c9a85c" />
            <stop offset="100%" stopColor="#7d6a3c" />
          </linearGradient>
          <linearGradient id="gate-dark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0b0822" />
            <stop offset="100%" stopColor="#05020f" />
          </linearGradient>
          <filter id="portal-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
        </defs>

        <path
          className="gate-mountain"
          d="M0 640V470l85-40 52 32 78-86 68 54 84-104 72 82 75-54 95 76 70-112 85 90 66-52 90 72 62-44 88 60 80-32 60 42v160Z"
        />

        <g className="gate-pines gate-pines--left">
          <path d="M85 520 125 390l40 130Z" />
          <path d="M120 545 175 365l55 180Z" />
          <path d="M190 530 230 410l40 120Z" />
          <path d="M55 560 95 445l40 115Z" />
        </g>
        <g className="gate-pines gate-pines--right">
          <path d="M1115 520 1075 390l-40 130Z" />
          <path d="M1080 545 1025 365l-55 180Z" />
          <path d="M1010 530 970 410l-40 120Z" />
          <path d="M1145 560 1105 445l-40 115Z" />
        </g>

        <path
          className="gate-stone"
          d="M250 640V305l55-45 55 45v335h-110Z"
        />
        <path
          className="gate-stone"
          d="M840 640V305l55-45 55 45v335H840Z"
        />
        <path
          className="gate-stone"
          d="M400 640V310q0-150 200-210 200 60 200 210v330H400Z"
        />
        <path
          className="gate-stone-light"
          d="M400 640V310q0-150 200-210 200 60 200 210v330H400Z"
          opacity=".35"
        />

        <path
          className="gate-roof"
          d="M250 305 305 150l55 155Z"
        />
        <path
          className="gate-roof"
          d="M840 305 895 150l55 155Z"
        />

        <g className="gate-crenels">
          <path d="M250 305h18v-22h18v22h18v-22h18v22h18v-22h18v22h18" />
          <path d="M840 305h18v-22h18v22h18v-22h18v22h18v-22h18v22h18" />
        </g>

        <path
          className="gate-arch"
          d="M400 640V310q0-150 200-210 200 60 200 210v330"
        />
        <path
          className="gate-arch-inner"
          d="M455 640V325q0-118 145-170 145 52 145 170v315"
        />

        <path
          className="gate-portal"
          d="M470 640V330q0-112 130-162 130 50 130 162v310H470Z"
        />
        <ellipse
          className="gate-portal-core"
          cx="600"
          cy="450"
          rx="120"
          ry="165"
        />

        <g className="gate-runes">
          {GATE_RUNES.map((rune, index) => (
            <g
              key={`${rune.x}-${rune.y}`}
              className="gate-rune"
              style={{ animationDelay: `${0.7 + index * 0.11}s` }}
              transform={`translate(${rune.x} ${rune.y})`}
            >
              <circle r="11" />
              <path d={rune.glyph} />
            </g>
          ))}
        </g>

        <path
          className="gate-keystone"
          d="M600 92 612 122 600 152 588 122Z"
        />

        <g className="gate-torches">
          <g transform="translate(318 260)">
            <path className="gate-torch-bracket" d="M0 0v28M-8 28h16" />
            <circle className="gate-torch-flame" r="5" />
          </g>
          <g transform="translate(882 260)">
            <path className="gate-torch-bracket" d="M0 0v28M-8 28h16" />
            <circle className="gate-torch-flame" r="5" />
          </g>
          <g transform="translate(430 500)">
            <path className="gate-torch-bracket" d="M0 0v24M-7 24h14" />
            <circle className="gate-torch-flame" r="4" />
          </g>
          <g transform="translate(770 500)">
            <path className="gate-torch-bracket" d="M0 0v24M-7 24h14" />
            <circle className="gate-torch-flame" r="4" />
          </g>
        </g>

        <path
          className="gate-steps"
          d="M365 640h470l-32-24H397l-32 24Zm-20 0h510l-34-18H379l-34 18Zm-18 0h546l-36-14H363l-36 14Z"
        />
        <path
          className="gate-path"
          d="M510 640 560 560h80l50 80Z"
        />
      </svg>

      <div className="hero-gate__fog" />
      <div className="hero-gate__embers">
        {EMBERS.map((ember, index) => (
          <span
            key={index}
            style={{
              left: ember.left,
              animationDelay: ember.delay,
              animationDuration: ember.duration,
              width: ember.size,
              height: ember.size,
            }}
          />
        ))}
      </div>
    </div>
  );
}
