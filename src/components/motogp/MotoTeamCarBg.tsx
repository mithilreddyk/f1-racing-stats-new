interface MotoTeamCarBgProps {
  teamColor: string
  className?: string
}

export default function MotoTeamCarBg({ teamColor, className = "" }: MotoTeamCarBgProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 800 350"
        className="absolute -right-10 top-1/2 -translate-y-1/2 w-[500px] opacity-15"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: teamColor }}
      >
        {/* Front fairing and nose */}
        <path
          d="M30,175 Q15,170 5,162 Q0,155 2,148 L8,142 Q15,138 25,136 L40,134 L60,132 L80,130 L100,128 L120,126 L140,124 L160,122 L180,120 L200,118"
          fill="currentColor"
        />

        {/* Main body / tank area */}
        <path
          d="M200,118 Q220,115 240,112 L260,110 L280,108 L300,106 L320,105 L340,104 L360,103 L380,102 L400,101 L420,100 L440,99 L460,98 L480,97 L500,96 L520,95 L540,94 L560,93 L580,92 L600,91 L620,90"
          fill="currentColor"
        />

        {/* Tail section */}
        <path
          d="M620,90 Q640,89 660,88 L680,87 L700,86 L720,85 L740,84 Q750,83 755,85 L758,90 Q760,95 755,100 L745,105 L730,108 L710,110 L690,112 L670,114 L650,116 L630,118 L610,120"
          fill="currentColor"
        />

        {/* Bottom fairing */}
        <path
          d="M30,175 Q50,178 70,180 L90,182 L110,184 L130,186 L150,188 L170,190 L190,192 L210,194 L230,196 L250,198 L270,200 L290,202 L310,204 L330,206 L350,208 L370,210 L390,212 L410,214 L430,216 L450,218 L470,220 L490,222 L510,224 L530,226 L550,228 L570,230 L590,232 L610,234 L630,236 L650,238 L670,240 L690,242 L710,244 L730,246 L740,248 Q750,250 750,245 Q748,238 740,232 L730,228 L710,224 L690,220 L670,216 L650,212 L630,208 L610,204 L590,200 L570,196 L550,192 L530,188 L510,184 L490,180 L470,176 L450,172 L430,168 L410,164 L390,160 L370,156 L350,152 L330,148 L310,146 L290,144 L270,142 L250,140 L230,138 L210,136 L190,134 L170,132 L150,130 L130,128 L110,126 L90,124 L70,122 L50,120 L35,118"
          fill="currentColor"
          opacity="0.7"
        />

        {/* Rider silhouette - upper body tucked in */}
        <path
          d="M280,108 Q290,85 310,75 Q330,68 350,65 Q370,62 390,60 Q410,58 430,57 Q450,56 470,55 Q490,54 510,53 L520,52 Q530,51 535,55 Q540,62 538,72 Q535,80 530,85 Q525,88 520,90 Q510,92 500,94 L480,96 L460,98 L440,99 L420,100 L400,101 L380,102 L360,103 L340,104 L320,105 L300,106 Z"
          fill="currentColor"
          opacity="0.9"
        />

        {/* Rider helmet */}
        <ellipse cx="340" cy="78" rx="18" ry="16" fill="currentColor" opacity="0.95" />
        <ellipse cx="340" cy="75" rx="12" ry="10" fill="currentColor" opacity="0.4" />

        {/* Rider arm */}
        <path
          d="M360,85 Q370,82 380,80 Q390,78 400,77 L410,76 Q415,75 418,78 Q420,82 418,86 Q415,88 410,89 L400,90 L390,91 L380,92 Q370,93 362,92"
          fill="currentColor"
          opacity="0.8"
        />

        {/* Front wheel */}
        <circle cx="80" cy="195" r="30" fill="none" stroke="currentColor" strokeWidth="5" opacity="0.5" />
        <circle cx="80" cy="195" r="18" fill="currentColor" opacity="0.15" />
        <line x1="62" y1="195" x2="98" y2="195" stroke="currentColor" strokeWidth="2" opacity="0.3" />
        <line x1="80" y1="177" x2="80" y2="213" stroke="currentColor" strokeWidth="2" opacity="0.3" />

        {/* Rear wheel */}
        <circle cx="680" cy="200" r="32" fill="none" stroke="currentColor" strokeWidth="5" opacity="0.5" />
        <circle cx="680" cy="200" r="20" fill="currentColor" opacity="0.15" />
        <line x1="660" y1="200" x2="700" y2="200" stroke="currentColor" strokeWidth="2" opacity="0.3" />
        <line x1="680" y1="180" x2="680" y2="220" stroke="currentColor" strokeWidth="2" opacity="0.3" />

        {/* Exhaust pipe */}
        <path
          d="M720,100 Q730,98 740,96 L748,94 Q752,93 754,96 Q755,100 752,104 L748,106 L740,108 L730,110 Q722,112 718,110"
          fill="currentColor"
          opacity="0.4"
        />

        {/* Front brake disc hint */}
        <circle cx="95" cy="195" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      </svg>
    </div>
  )
}
