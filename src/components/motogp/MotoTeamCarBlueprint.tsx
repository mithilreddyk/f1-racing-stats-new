interface MotoTeamCarBlueprintProps {
  teamColor: string
  teamName: string
  className?: string
}

export default function MotoTeamCarBlueprint({
  teamColor,
  teamName,
  className = "",
}: MotoTeamCarBlueprintProps) {
  return (
    <div className={`bg-[#0A1628] border border-${teamColor.replace("#", "")}/30 rounded-xl p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: teamColor }} />
        <h3 className="text-sm font-bold text-white font-display tracking-wide uppercase">
          {teamName} — Technical Blueprint
        </h3>
      </div>
      <svg
        viewBox="0 0 800 400"
        className="w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="motogrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={teamColor} strokeWidth="0.3" opacity="0.15" />
          </pattern>
          <linearGradient id="motoGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={teamColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={teamColor} stopOpacity="0.03" />
          </linearGradient>
        </defs>
        <rect width="800" height="400" fill="url(#motogrid)" />

        {/* Dimension lines around bike */}
        <line x1="40" y1="30" x2="40" y2="360" stroke={teamColor} strokeWidth="0.5" opacity="0.3" />
        <line x1="760" y1="30" x2="760" y2="360" stroke={teamColor} strokeWidth="0.5" opacity="0.3" />
        <line x1="40" y1="30" x2="760" y2="30" stroke={teamColor} strokeWidth="0.5" opacity="0.3" />
        <line x1="40" y1="360" x2="760" y2="360" stroke={teamColor} strokeWidth="0.5" opacity="0.3" />
        <text x="400" y="22" fill={teamColor} fontSize="9" textAnchor="middle" fontFamily="monospace" opacity="0.4">
          OVERALL LENGTH: 2100mm
        </text>
        <text x="400" y="378" fill={teamColor} fontSize="9" textAnchor="middle" fontFamily="monospace" opacity="0.4">
          WHEELBASE: 1450mm | WEIGHT: 157kg | POWER: ~300hp
        </text>

        {/* Wheelbase measurement annotation */}
        <line x1="210" y1="345" x2="210" y2="358" stroke={teamColor} strokeWidth="0.5" opacity="0.4" />
        <line x1="210" y1="345" x2="555" y2="345" stroke={teamColor} strokeWidth="0.5" opacity="0.4" strokeDasharray="2,4" />
        <line x1="555" y1="345" x2="555" y2="358" stroke={teamColor} strokeWidth="0.5" opacity="0.4" />
        <text x="382" y="343" fill={teamColor} fontSize="8" textAnchor="middle" fontFamily="monospace" opacity="0.4">
          1450mm
        </text>

        {/* Front wheel */}
        <circle cx="210" cy="278" r="26" fill="none" stroke={teamColor} strokeWidth="1.5" opacity="0.7" />
        <circle cx="210" cy="278" r="22" fill="none" stroke={teamColor} strokeWidth="0.5" opacity="0.3" strokeDasharray="2,3" />
        <circle cx="210" cy="278" r="8" fill="none" stroke={teamColor} strokeWidth="1" opacity="0.6" />
        <line x1="210" y1="256" x2="210" y2="300" stroke={teamColor} strokeWidth="0.4" opacity="0.3" />
        <line x1="188" y1="278" x2="232" y2="278" stroke={teamColor} strokeWidth="0.4" opacity="0.3" />
        <line x1="194" y1="262" x2="226" y2="294" stroke={teamColor} strokeWidth="0.4" opacity="0.3" />
        <line x1="226" y1="262" x2="194" y2="294" stroke={teamColor} strokeWidth="0.4" opacity="0.3" />
        {/* Front brake disc */}
        <circle cx="210" cy="278" r="18" fill="none" stroke={teamColor} strokeWidth="0.5" opacity="0.25" strokeDasharray="1,3" />

        {/* Rear wheel */}
        <circle cx="555" cy="278" r="30" fill="none" stroke={teamColor} strokeWidth="1.5" opacity="0.7" />
        <circle cx="555" cy="278" r="25" fill="none" stroke={teamColor} strokeWidth="0.5" opacity="0.3" strokeDasharray="2,3" />
        <circle cx="555" cy="278" r="9" fill="none" stroke={teamColor} strokeWidth="1" opacity="0.6" />
        <line x1="555" y1="252" x2="555" y2="304" stroke={teamColor} strokeWidth="0.4" opacity="0.3" />
        <line x1="529" y1="278" x2="581" y2="278" stroke={teamColor} strokeWidth="0.4" opacity="0.3" />
        <line x1="537" y1="260" x2="573" y2="296" stroke={teamColor} strokeWidth="0.4" opacity="0.3" />
        <line x1="573" y1="260" x2="537" y2="296" stroke={teamColor} strokeWidth="0.4" opacity="0.3" />
        {/* Rear brake disc */}
        <circle cx="555" cy="278" r="20" fill="none" stroke={teamColor} strokeWidth="0.5" opacity="0.25" strokeDasharray="1,3" />

        {/* Front fork */}
        <line x1="270" y1="195" x2="210" y2="278" stroke={teamColor} strokeWidth="1.2" opacity="0.5" />
        <line x1="264" y1="195" x2="204" y2="278" stroke={teamColor} strokeWidth="0.8" opacity="0.3" />
        {/* Fork top clamp */}
        <rect x="262" y="190" width="12" height="10" rx="2" fill="none" stroke={teamColor} strokeWidth="0.8" opacity="0.5" />

        {/* Swingarm */}
        <line x1="495" y1="215" x2="555" y2="278" stroke={teamColor} strokeWidth="1.5" opacity="0.5" />
        <line x1="489" y1="215" x2="549" y2="278" stroke={teamColor} strokeWidth="0.8" opacity="0.3" />
        <rect x="488" y="210" width="14" height="10" rx="2" fill="none" stroke={teamColor} strokeWidth="0.8" opacity="0.5" />

        {/* Main frame spine */}
        <path
          d="M 270,195 Q 320,200 380,205 Q 440,210 495,215"
          fill="none"
          stroke={teamColor}
          strokeWidth="1.2"
          opacity="0.4"
        />

        {/* Subframe (rear) */}
        <path
          d="M 450,208 Q 480,195 510,180 L 525,230"
          fill="none"
          stroke={teamColor}
          strokeWidth="0.6"
          opacity="0.3"
          strokeDasharray="3,3"
        />

        {/* Main body / fairing profile */}
        <path
          d="M 155,245
             C 155,210 175,180 200,162
             C 210,155 220,146 230,140
             C 245,132 260,130 280,130
             C 320,128 355,132 380,140
             C 395,145 405,155 415,158
             L 440,158
             C 470,158 505,170 525,210
             L 530,238
             C 510,258 470,260 430,258
             L 380,260
             C 340,262 290,260 250,255
             C 210,250 180,252 160,252
             Z"
          fill="url(#motoGrad)"
          stroke={teamColor}
          strokeWidth="1.2"
          opacity="0.7"
        />

        {/* Fuel tank top shape */}
        <path
          d="M 270,130
             C 290,125 330,124 360,128
             C 380,131 395,138 405,148
             C 395,145 380,142 360,140
             C 330,138 300,138 280,140
             C 268,142 258,146 250,152
             Z"
          fill="none"
          stroke={teamColor}
          strokeWidth="0.8"
          opacity="0.5"
        />

        {/* Seat */}
        <path
          d="M 415,158 L 445,156 C 460,155 465,158 465,162 L 440,164 Z"
          fill="none"
          stroke={teamColor}
          strokeWidth="0.8"
          opacity="0.5"
        />

        {/* Rider helmet */}
        <ellipse cx="252" cy="112" rx="10" ry="14" transform="rotate(-15,252,112)" fill="none" stroke={teamColor} strokeWidth="1.2" opacity="0.7" />
        <path
          d="M 248,105 Q 255,100 260,106"
          fill="none"
          stroke={teamColor}
          strokeWidth="0.6"
          opacity="0.5"
        />
        {/* Visor */}
        <path
          d="M 244,108 Q 250,102 258,108"
          fill="none"
          stroke={teamColor}
          strokeWidth="0.8"
          opacity="0.4"
        />

        {/* Rider body - back/torso in tuck position */}
        <path
          d="M 258,124 Q 280,130 310,145 Q 345,158 380,165"
          fill="none"
          stroke={teamColor}
          strokeWidth="1.5"
          opacity="0.6"
        />
        {/* Rider chest/belly */}
        <path
          d="M 258,124 Q 270,145 300,158 Q 330,168 365,170"
          fill="none"
          stroke={teamColor}
          strokeWidth="0.8"
          opacity="0.3"
        />

        {/* Rider upper arm */}
        <line x1="300" y1="145" x2="275" y2="162" stroke={teamColor} strokeWidth="1" opacity="0.5" />
        {/* Rider forearm */}
        <line x1="275" y1="162" x2="255" y2="170" stroke={teamColor} strokeWidth="0.8" opacity="0.5" />
        {/* Rider hand on grip */}
        <circle cx="255" cy="170" r="3" fill="none" stroke={teamColor} strokeWidth="0.5" opacity="0.4" />

        {/* Rider thigh */}
        <path
          d="M 365,170 L 330,185 L 310,190"
          fill="none"
          stroke={teamColor}
          strokeWidth="1.2"
          opacity="0.5"
        />
        {/* Rider shin */}
        <line x1="310" y1="190" x2="355" y2="222" stroke={teamColor} strokeWidth="0.8" opacity="0.5" />
        {/* Rider foot on peg */}
        <line x1="355" y1="222" x2="370" y2="228" stroke={teamColor} strokeWidth="0.8" opacity="0.5" />

        {/* Rider lower arm (tucked) */}
        <line x1="300" y1="145" x2="290" y2="155" stroke={teamColor} strokeWidth="0.6" opacity="0.35" />

        {/* Exhaust pipe */}
        <path
          d="M 370,248 Q 410,255 450,250 Q 480,245 510,240 Q 530,237 545,235"
          fill="none"
          stroke={teamColor}
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Exhaust silencer */}
        <rect x="520" y="232" width="30" height="6" rx="3" fill="none" stroke={teamColor} strokeWidth="0.8" opacity="0.5" />

        {/* Winglet on fairing */}
        <path
          d="M 175,210 L 160,205 L 155,210 L 170,218 Z"
          fill="none"
          stroke={teamColor}
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line x1="175" y1="210" x2="195" y2="208" stroke={teamColor} strokeWidth="0.5" opacity="0.3" strokeDasharray="2,2" />

        {/* Chain */}
        <path
          d="M 485,240 Q 520,245 540,255"
          fill="none"
          stroke={teamColor}
          strokeWidth="0.5"
          opacity="0.3"
          strokeDasharray="2,3"
        />
        {/* Front sprocket */}
        <circle cx="485" cy="240" r="6" fill="none" stroke={teamColor} strokeWidth="0.5" opacity="0.3" />
        {/* Rear sprocket */}
        <circle cx="555" cy="255" r="10" fill="none" stroke={teamColor} strokeWidth="0.5" opacity="0.3" strokeDasharray="1,2" />

        {/* Fork brace */}
        <line x1="240" y1="230" x2="252" y2="235" stroke={teamColor} strokeWidth="0.6" opacity="0.3" />

        {/* Part labels */}
        <text x="158" y="200" fill={teamColor} fontSize="7" textAnchor="end" fontFamily="monospace" opacity="0.5">FRONT FAIRING</text>
        <line x1="160" y1="197" x2="195" y2="195" stroke={teamColor} strokeWidth="0.3" opacity="0.3" />

        <text x="240" y="96" fill={teamColor} fontSize="7" textAnchor="middle" fontFamily="monospace" opacity="0.5">SCREEN</text>
        <line x1="240" y1="99" x2="238" y2="130" stroke={teamColor} strokeWidth="0.3" opacity="0.3" />

        <text x="252" y="82" fill={teamColor} fontSize="7" textAnchor="middle" fontFamily="monospace" opacity="0.5">RIDER</text>
        <line x1="252" y1="85" x2="252" y2="106" stroke={teamColor} strokeWidth="0.3" opacity="0.3" />

        <text x="330" y="110" fill={teamColor} fontSize="7" textAnchor="middle" fontFamily="monospace" opacity="0.5">FUEL TANK</text>
        <line x1="330" y1="113" x2="330" y2="132" stroke={teamColor} strokeWidth="0.3" opacity="0.3" />

        <text x="420" y="108" fill={teamColor} fontSize="7" textAnchor="middle" fontFamily="monospace" opacity="0.5">ENGINE</text>
        <line x1="420" y1="111" x2="420" y2="200" stroke={teamColor} strokeWidth="0.3" opacity="0.3" />

        <text x="530" y="198" fill={teamColor} fontSize="7" textAnchor="middle" fontFamily="monospace" opacity="0.5">SWINGARM</text>
        <line x1="530" y1="201" x2="520" y2="220" stroke={teamColor} strokeWidth="0.3" opacity="0.3" />

        <text x="595" y="278" fill={teamColor} fontSize="7" textAnchor="start" fontFamily="monospace" opacity="0.5">REAR TYRE</text>
        <line x1="590" y1="278" x2="582" y2="278" stroke={teamColor} strokeWidth="0.3" opacity="0.3" />

        <text x="545" y="222" fill={teamColor} fontSize="7" textAnchor="end" fontFamily="monospace" opacity="0.5">EXHAUST</text>
        <line x1="547" y1="225" x2="538" y2="232" stroke={teamColor} strokeWidth="0.3" opacity="0.3" />

        <text x="140" y="226" fill={teamColor} fontSize="7" textAnchor="end" fontFamily="monospace" opacity="0.5">WINGLET</text>
        <line x1="143" y1="223" x2="156" y2="214" stroke={teamColor} strokeWidth="0.3" opacity="0.3" />

        {/* Legend */}
        <line x1="30" y1="290" x2="70" y2="290" stroke={teamColor} strokeWidth="1.5" opacity="0.6" />
        <text x="75" y="293" fill={teamColor} fontSize="8" fontFamily="monospace" opacity="0.5">TWIN-SPARS FRAME</text>
        <line x1="30" y1="305" x2="70" y2="305" stroke={teamColor} strokeWidth="0.6" opacity="0.4" strokeDasharray="3,3" />
        <text x="75" y="308" fill={teamColor} fontSize="8" fontFamily="monospace" opacity="0.5">AERODYNAMIC SURFACE</text>
        <line x1="30" y1="320" x2="70" y2="320" stroke={teamColor} strokeWidth="0.8" opacity="0.35" />
        <text x="75" y="323" fill={teamColor} fontSize="8" fontFamily="monospace" opacity="0.5">FAIRING / BODYWORK</text>

        {/* Specs */}
        <text x="750" y="290" fill={teamColor} fontSize="7" textAnchor="end" fontFamily="monospace" opacity="0.4">
          TYRES: 120/70-17 (F) | 200/70-17 (R)
        </text>
        <text x="750" y="305" fill={teamColor} fontSize="7" textAnchor="end" fontFamily="monospace" opacity="0.4">
          ENGINE: 1000cc V4 / I4
        </text>
        <text x="750" y="320" fill={teamColor} fontSize="7" textAnchor="end" fontFamily="monospace" opacity="0.4">
          FUEL: 22L | BRAKES: Brembo
        </text>
      </svg>
    </div>
  )
}
