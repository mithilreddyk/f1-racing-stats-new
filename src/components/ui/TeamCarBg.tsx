interface TeamCarBgProps {
  teamColor: string
  className?: string
}

export default function TeamCarBg({ teamColor, className = "" }: TeamCarBgProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 800 350"
        className="absolute -right-10 top-1/2 -translate-y-1/2 w-[500px] opacity-15"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: teamColor }}
      >
        {/* Main body silhouette */}
        <path
          d="M60,200 Q40,195 20,185 L5,175 Q0,170 2,162 L8,155 Q15,148 25,145 L40,142 L70,138 L100,135 L140,130 L180,125 L220,120 L260,115 L300,110
             Q330,108 360,105 L400,102 L440,100 L480,98 L520,96 L560,95 L600,94
             Q640,93 680,94 L710,96 Q730,100 745,108 L755,118 Q760,128 755,135
             L745,140 L730,142 L710,143 L680,144 L650,145 L620,146 L590,147 L560,148
             L530,149 L500,150 L470,152 L440,155 L410,158 L380,162 L350,166
             Q320,170 290,174 L260,178 L230,182 L200,186 L170,190 L140,194
             Q110,198 90,200 L70,202 Z"
          fill="currentColor"
        />

        {/* Nose and front wing */}
        <path
          d="M5,175 L2,168 L3,160 L8,152 L15,148 L22,146 L28,148 L25,155 L20,162 L15,170 Z"
          fill="currentColor"
          opacity="0.7"
        />
        <path
          d="M50,200 L25,195 L10,188 L5,182 L10,178 L30,185 L55,192 Z"
          fill="currentColor"
          opacity="0.5"
        />

        {/* Rear wing */}
        <path
          d="M710,96 L720,78 L730,68 L740,64 L750,68 L758,78 L762,92 L760,105 L752,110 L740,108 L725,105 L712,100 Z"
          fill="currentColor"
          opacity="0.7"
        />
        <path
          d="M720,82 L732,62 L745,58 L755,65 L758,78 L748,72 L735,68 L722,72 Z"
          fill="currentColor"
          opacity="0.4"
        />

        {/* Halo */}
        <path
          d="M200,130 Q210,105 240,95 Q265,88 290,90 Q305,92 310,100 Q315,110 315,125"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          opacity="0.5"
        />

        {/* Cockpit */}
        <path
          d="M240,118 Q255,108 275,104 Q295,102 315,105 Q335,110 345,120"
          fill="currentColor"
          opacity="0.1"
        />

        {/* Rear wheel */}
        <circle cx="600" cy="185" r="35" fill="none" stroke="currentColor" strokeWidth="5" opacity="0.5" />
        <circle cx="600" cy="185" r="22" fill="currentColor" opacity="0.15" />
        <line x1="578" y1="185" x2="622" y2="185" stroke="currentColor" strokeWidth="2" opacity="0.3" />
        <line x1="600" y1="163" x2="600" y2="207" stroke="currentColor" strokeWidth="2" opacity="0.3" />

        {/* Front wheel */}
        <circle cx="120" cy="190" r="32" fill="none" stroke="currentColor" strokeWidth="5" opacity="0.5" />
        <circle cx="120" cy="190" r="20" fill="currentColor" opacity="0.15" />
        <line x1="100" y1="190" x2="140" y2="190" stroke="currentColor" strokeWidth="2" opacity="0.3" />
        <line x1="120" y1="170" x2="120" y2="210" stroke="currentColor" strokeWidth="2" opacity="0.3" />

        {/* Diffuser / floor */}
        <path
          d="M650,145 L680,142 L710,143 L730,148 L720,152 L690,150 L660,148 Z"
          fill="currentColor"
          opacity="0.3"
        />

        {/* Sidepod air intake */}
        <path
          d="M340,170 Q370,155 420,148 Q460,145 500,148 Q530,155 535,168 Q530,178 500,180 Q460,182 420,180 Q380,178 350,175 Z"
          fill="currentColor"
          opacity="0.12"
        />

        {/* Engine cover bumps */}
        <path
          d="M500,148 Q530,145 560,148 Q580,152 580,160 Q570,165 550,162 Q520,158 500,155 Z"
          fill="currentColor"
          opacity="0.08"
        />
      </svg>
    </div>
  )
}
