interface TeamCarBgProps {
  teamColor: string
  className?: string
}

export default function TeamCarBg({ teamColor, className = "" }: TeamCarBgProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 800 400"
        className="absolute -right-20 top-1/2 -translate-y-1/2 w-[600px] opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: teamColor }}
      >
        {/* Main body */}
        <path
          d="M120,220 Q100,220 80,210 L60,200 L50,195 Q40,190 35,185 L30,180 Q20,170 15,165 L10,160
             Q5,155 8,150 L12,145 Q18,138 25,135 L40,130 L55,128 L70,126 L100,124
             L130,122 L160,118 L200,112 L240,108 L280,106 L320,104
             Q340,103 360,100 L380,96 Q400,92 420,88 L440,84
             Q460,80 480,78 L500,76 Q520,74 540,72 L560,70
             Q580,68 600,66 L620,64 Q640,62 660,60 L680,58
             Q700,56 720,58 L740,62 Q755,66 760,76 L762,84
             Q764,92 760,98 L755,105 Q750,112 740,115
             L730,118 L720,120 Q710,122 700,124 L680,126
             L660,128 L640,130 L620,132 L600,134 L580,136
             L560,138 L540,140 L520,142 L500,144 L480,146
             L460,148 L440,152 L420,156 L400,160 L380,164
             L360,168 L340,172 L320,176 L300,178 L280,180
             L260,182 L240,184 L220,186 L200,188 L180,190
             L160,195 L140,200 L130,208 Z"
          fill="currentColor"
        />

        {/* Rear wing */}
        <path
          d="M680,58 L690,45 L700,40 L710,38 L720,40 L730,45 L740,55
             L740,62 L720,58 L700,56 Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M685,55 L700,35 L715,35 L725,42 L735,52
             L720,48 L700,46 L685,50 Z"
          fill="currentColor"
          opacity="0.5"
        />

        {/* Front wing */}
        <path
          d="M10,160 L5,155 L3,150 L5,145 L10,140 L15,138 L20,140 L25,145
             L22,150 L18,155 Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M8,155 L2,148 L4,142 L10,138 L18,140 L12,148 Z"
          fill="currentColor"
          opacity="0.5"
        />

        {/* Halo */}
        <path
          d="M200,112 Q210,90 240,82 Q260,78 280,80 Q290,82 295,88
             Q300,95 300,104"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          opacity="0.6"
        />

        {/* Cockpit opening */}
        <path
          d="M240,108 Q250,100 270,96 Q290,94 310,96 Q330,100 340,108"
          fill="currentColor"
          opacity="0.15"
        />

        {/* Rear wheel */}
        <circle cx="620" cy="170" r="32" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.6" />
        <circle cx="620" cy="170" r="22" fill="currentColor" opacity="0.15" />
        <line x1="600" y1="170" x2="640" y2="170" stroke="currentColor" strokeWidth="2" opacity="0.4" />
        <line x1="620" y1="150" x2="620" y2="190" stroke="currentColor" strokeWidth="2" opacity="0.4" />

        {/* Front wheel */}
        <circle cx="120" cy="175" r="30" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.6" />
        <circle cx="120" cy="175" r="20" fill="currentColor" opacity="0.15" />
        <line x1="102" y1="175" x2="138" y2="175" stroke="currentColor" strokeWidth="2" opacity="0.4" />
        <line x1="120" y1="157" x2="120" y2="193" stroke="currentColor" strokeWidth="2" opacity="0.4" />

        {/* Floor / diffuser */}
        <path
          d="M660,130 L680,128 L700,130 L710,135 L700,140 L680,138 L660,136 Z"
          fill="currentColor"
          opacity="0.3"
        />

        {/* Air intake / sidepod */}
        <path
          d="M360,168 Q380,155 420,150 Q450,148 480,150 Q500,155 510,165
             Q515,170 510,178 Q500,182 480,180 Q450,178 420,180 Q390,182 370,178 Z"
          fill="currentColor"
          opacity="0.1"
        />
      </svg>
    </div>
  )
}
