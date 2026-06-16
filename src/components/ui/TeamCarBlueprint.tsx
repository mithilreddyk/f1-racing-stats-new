interface TeamCarBlueprintProps {
  teamColor: string
  teamName: string
  className?: string
}

export default function TeamCarBlueprint({
  teamColor,
  teamName,
  className = "",
}: TeamCarBlueprintProps) {
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
        {/* Grid lines for blueprint feel */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={teamColor} strokeWidth="0.3" opacity="0.15" />
          </pattern>
          <linearGradient id="carGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={teamColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={teamColor} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect width="800" height="400" fill="url(#grid)" />

        {/* Dimension lines around car */}
        <line x1="30" y1="50" x2="30" y2="350" stroke={teamColor} strokeWidth="0.5" opacity="0.3" />
        <line x1="770" y1="50" x2="770" y2="350" stroke={teamColor} strokeWidth="0.5" opacity="0.3" />
        <line x1="30" y1="50" x2="770" y2="50" stroke={teamColor} strokeWidth="0.5" opacity="0.3" />
        <line x1="30" y1="350" x2="770" y2="350" stroke={teamColor} strokeWidth="0.5" opacity="0.3" />
        <text x="400" y="30" fill={teamColor} fontSize="9" textAnchor="middle" fontFamily="monospace" opacity="0.4">
          OVERALL LENGTH: 5200mm
        </text>
        <text x="400" y="370" fill={teamColor} fontSize="9" textAnchor="middle" fontFamily="monospace" opacity="0.4">
          WHEELBASE: 3600mm | FRONT TRACK: 1650mm | REAR TRACK: 1580mm
        </text>

        {/* Main body top view */}
        <path
          d="M380,100 L400,95 L420,100 L440,108 L460,115 L480,120 L500,122 L520,124 L540,125 L560,126 L580,128 L600,130 L620,132 L640,135 L660,140 L680,145
             Q700,152 720,158 L740,165 L755,172 L762,180 L765,190 L760,200 L750,208 L735,212 L720,215 L700,218 L680,220 L660,222 L640,224 L620,226 L600,228 L580,230 L560,232 L540,234 L520,236 L500,238 L480,240 L460,242 L440,245 L420,250 L400,255 L385,260 L375,265 L370,272 L368,280 L370,288 L378,295 L390,300 L405,302 L420,300 L435,295 L445,288 L450,280 L448,272 L442,265 L432,260 L418,258 L405,258 L395,262 L388,270 L385,280 L388,290 L395,298
             L388,290 L385,280 L388,270 L395,262 L405,258 L418,258 L432,260 L442,265 L448,272 L450,280 L445,288 L435,295 L420,300 L405,302 L390,300 L378,295 L370,288 L368,280 L370,272 L375,265 L385,260 L400,255 L420,250 L440,245 L460,242 L480,240 L500,238 L520,236 L540,234 L560,232 L580,230 L600,228 L620,226 L640,224 L660,222 L680,220 L700,218 L720,215 L735,212 L750,208 L760,200 L765,190 L762,180 L755,172 L740,165 L720,158 Q700,152 680,145 L660,140 L640,135 L620,132 L600,130 L580,128 L560,126 L540,125 L520,124 L500,122 L480,120 L460,115 L440,108 L420,100 L400,95 Z"
          fill="url(#carGrad)"
          stroke={teamColor}
          strokeWidth="1.5"
          opacity="0.8"
        />

        {/* Nose cone */}
        <path
          d="M380,100 Q360,95 340,95 L320,98 L300,102 L280,108 L260,115 L245,122 L235,130 L230,140 L228,150 L230,160 L235,168 L245,172 L260,175 L280,178 L300,180 L320,182 L340,183 L360,184 L380,185"
          fill="none"
          stroke={teamColor}
          strokeWidth="1.5"
          opacity="0.7"
        />
        <path
          d="M230,140 L220,142 L210,148 L205,155 L210,162 L220,165 L230,168"
          fill="none"
          stroke={teamColor}
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Front wing */}
        <path
          d="M180,155 L160,140 L140,130 L120,125 L100,122 L80,125 L65,132 L55,142 L50,155 L55,168 L65,178 L80,185 L100,188 L120,185 L140,180 L160,170 L180,155"
          fill="none"
          stroke={teamColor}
          strokeWidth="1.2"
          opacity="0.6"
        />
        {/* Front wing endplates */}
        <line x1="100" y1="122" x2="100" y2="188" stroke={teamColor} strokeWidth="0.8" opacity="0.4" />
        <line x1="80" y1="125" x2="80" y2="185" stroke={teamColor} strokeWidth="0.8" opacity="0.4" />

        {/* Rear wing */}
        <path
          d="M680,145 L700,130 L720,120 L740,115 L755,118 L765,125 L770,138 L768,150 L760,160 L745,165 L730,162 L715,155 L700,148"
          fill="none"
          stroke={teamColor}
          strokeWidth="1.2"
          opacity="0.6"
        />
        {/* Rear wing endplates */}
        <line x1="740" y1="115" x2="745" y2="165" stroke={teamColor} strokeWidth="0.8" opacity="0.4" />
        <line x1="720" y1="120" x2="715" y2="155" stroke={teamColor} strokeWidth="0.8" opacity="0.4" />

        {/* Rear wing main plane */}
        <path
          d="M700,130 L680,145 L700,148 L720,145 L740,140 L755,135"
          fill="none"
          stroke={teamColor}
          strokeWidth="1"
          opacity="0.4"
        />

        {/* Front wheels */}
        <ellipse cx="300" cy="118" rx="18" ry="10" fill="none" stroke={teamColor} strokeWidth="1.5" opacity="0.7" />
        <ellipse cx="300" cy="220" rx="18" ry="10" fill="none" stroke={teamColor} strokeWidth="1.5" opacity="0.7" />
        <line x1="285" y1="118" x2="285" y2="220" stroke={teamColor} strokeWidth="0.5" opacity="0.3" />

        {/* Rear wheels */}
        <ellipse cx="620" cy="115" rx="22" ry="12" fill="none" stroke={teamColor} strokeWidth="1.5" opacity="0.7" />
        <ellipse cx="620" cy="225" rx="22" ry="12" fill="none" stroke={teamColor} strokeWidth="1.5" opacity="0.7" />
        <line x1="602" y1="115" x2="602" y2="225" stroke={teamColor} strokeWidth="0.5" opacity="0.3" />

        {/* Halo (top view) */}
        <path
          d="M400,140 Q410,130 420,125 L440,120 L460,118 L480,120 L495,125 L505,132 L510,142"
          fill="none"
          stroke={teamColor}
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Cockpit opening */}
        <ellipse cx="440" cy="170" rx="30" ry="18" fill="none" stroke={teamColor} strokeWidth="1" opacity="0.4" />

        {/* Engine cover / airbox */}
        <path
          d="M510,142 L520,138 L540,132 L560,128 L580,126 L600,128 L615,132 L625,140 L625,150 L615,158 L600,162 L580,165 L560,165 L540,162 L520,158 L510,150 Z"
          fill="none"
          stroke={teamColor}
          strokeWidth="0.8"
          opacity="0.4"
        />

        {/* Floor / diffuser edges */}
        <path
          d="M200,165 L220,162 L250,158 L280,155 L310,152 L340,150 L370,150 L400,150"
          fill="none"
          stroke={teamColor}
          strokeWidth="0.6"
          opacity="0.3"
          strokeDasharray="3,3"
        />
        <path
          d="M200,175 L220,178 L250,182 L280,185 L310,188 L340,190 L370,190 L400,190"
          fill="none"
          stroke={teamColor}
          strokeWidth="0.6"
          opacity="0.3"
          strokeDasharray="3,3"
        />

        {/* Sidepod outlines */}
        <path
          d="M380,150 Q420,145 460,148 L500,155 L530,162 L550,170 L560,180 L555,190 L540,195 L520,192 L500,185 L480,178 L460,175 L440,175 L420,178 L400,182 L385,188"
          fill="none"
          stroke={teamColor}
          strokeWidth="0.8"
          opacity="0.35"
        />
        <path
          d="M380,185 Q420,190 460,192 L500,192 L530,188 L560,182 L580,175 L590,168 L585,158 L570,152 L545,150 L520,152 L495,158 L475,165 L455,170 L435,172 L415,170 L400,165 L390,158"
          fill="none"
          stroke={teamColor}
          strokeWidth="0.8"
          opacity="0.35"
        />

        {/* Diffuser */}
        <path
          d="M650,165 L670,162 L690,160 L710,162 L720,168 L710,172 L690,175 L670,175 L650,172 Z"
          fill="none"
          stroke={teamColor}
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Measurement annotations */}
        <line x1="300" y1="90" x2="300" y2="105" stroke={teamColor} strokeWidth="0.5" opacity="0.4" />
        <line x1="300" y1="90" x2="620" y2="90" stroke={teamColor} strokeWidth="0.5" opacity="0.4" strokeDasharray="2,4" />
        <line x1="620" y1="90" x2="620" y2="102" stroke={teamColor} strokeWidth="0.5" opacity="0.4" />
        <text x="460" y="88" fill={teamColor} fontSize="8" textAnchor="middle" fontFamily="monospace" opacity="0.4">
          3600mm
        </text>

        {/* Part labels */}
        <text x="120" y="155" fill={teamColor} fontSize="7" textAnchor="middle" fontFamily="monospace" opacity="0.5">FRONT WING</text>
        <text x="440" y="210" fill={teamColor} fontSize="7" textAnchor="middle" fontFamily="monospace" opacity="0.5">COCKPIT</text>
        <text x="550" y="210" fill={teamColor} fontSize="7" textAnchor="middle" fontFamily="monospace" opacity="0.5">ENGINE COVER</text>
        <text x="730" y="155" fill={teamColor} fontSize="7" textAnchor="middle" fontFamily="monospace" opacity="0.5">REAR WING</text>
        <text x="240" y="235" fill={teamColor} fontSize="7" textAnchor="middle" fontFamily="monospace" opacity="0.5">FLOOR</text>
        <text x="610" y="238" fill={teamColor} fontSize="7" textAnchor="middle" fontFamily="monospace" opacity="0.5">DIFFUSER</text>

        {/* Legend */}
        <line x1="30" y1="290" x2="70" y2="290" stroke={teamColor} strokeWidth="1.5" opacity="0.6" />
        <text x="75" y="293" fill={teamColor} fontSize="8" fontFamily="monospace" opacity="0.5">MONOCOQUE CHASSIS</text>
        <line x1="30" y1="305" x2="70" y2="305" stroke={teamColor} strokeWidth="0.6" opacity="0.4" strokeDasharray="3,3" />
        <text x="75" y="308" fill={teamColor} fontSize="8" fontFamily="monospace" opacity="0.5">AERODYNAMIC SURFACE</text>
        <line x1="30" y1="320" x2="70" y2="320" stroke={teamColor} strokeWidth="0.8" opacity="0.35" />
        <text x="75" y="323" fill={teamColor} fontSize="8" fontFamily="monospace" opacity="0.5">SIDEPOD / BODYWORK</text>

        {/* Tire specs */}
        <text x="750" y="290" fill={teamColor} fontSize="7" textAnchor="end" fontFamily="monospace" opacity="0.4">
          TIRES: 305/720-18 (F) | 405/720-18 (R)
        </text>
        <text x="750" y="305" fill={teamColor} fontSize="7" textAnchor="end" fontFamily="monospace" opacity="0.4">
          WEIGHT: 798kg (inc. driver)
        </text>
        <text x="750" y="320" fill={teamColor} fontSize="7" textAnchor="end" fontFamily="monospace" opacity="0.4">
          POWER: ~1000hp (ICE + ERS)
        </text>
      </svg>
    </div>
  )
}
