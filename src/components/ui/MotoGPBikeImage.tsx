interface MotoGPBikeImageProps {
  teamColor: string
  teamName: string
  bikeName: string
  className?: string
}

export default function MotoGPBikeImage({ teamColor, teamName, bikeName, className = "" }: MotoGPBikeImageProps) {
  return (
    <div
      className={`relative rounded-xl overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, ${teamColor}15 0%, #0D0D0D 60%)`,
        border: `1px solid ${teamColor}30`,
      }}
    >
      <div className="w-full" style={{ aspectRatio: "5 / 2" }}>
        <svg
          viewBox="0 0 600 240"
          className="w-full h-full p-4"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`bike-${teamName.replace(/\s/g, "")}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={teamColor} stopOpacity="0.9" />
              <stop offset="100%" stopColor={teamColor} stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Rear wheel */}
          <circle cx="155" cy="170" r="52" fill="none" stroke="#333" strokeWidth="8" />
          <circle cx="155" cy="170" r="52" fill="none" stroke={teamColor} strokeWidth="3" opacity="0.4" />
          <circle cx="155" cy="170" r="35" fill="none" stroke="#222" strokeWidth="4" />
          <circle cx="155" cy="170" r="10" fill="#333" />
          {/* Spokes */}
          <line x1="155" y1="135" x2="155" y2="205" stroke="#222" strokeWidth="1.5" />
          <line x1="120" y1="170" x2="190" y2="170" stroke="#222" strokeWidth="1.5" />

          {/* Front wheel */}
          <circle cx="440" cy="170" r="52" fill="none" stroke="#333" strokeWidth="8" />
          <circle cx="440" cy="170" r="52" fill="none" stroke={teamColor} strokeWidth="3" opacity="0.4" />
          <circle cx="440" cy="170" r="35" fill="none" stroke="#222" strokeWidth="4" />
          <circle cx="440" cy="170" r="10" fill="#333" />
          <line x1="440" y1="135" x2="440" y2="205" stroke="#222" strokeWidth="1.5" />
          <line x1="405" y1="170" x2="475" y2="170" stroke="#222" strokeWidth="1.5" />

          {/* Swingarm */}
          <path d="M 250,140 L 165,160" stroke="#444" strokeWidth="6" strokeLinecap="round" />
          <path d="M 250,145 L 165,165" stroke="#333" strokeWidth="4" strokeLinecap="round" />

          {/* Frame / chassis */}
          <path d="M 250,140 L 320,90 L 380,75 L 420,90 L 440,120" stroke="#444" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

          {/* Engine block */}
          <path
            d="M 240,135 L 260,120 L 320,105 L 330,115 L 330,155 L 310,165 L 260,165 L 240,155 Z"
            fill="#222"
            stroke="#333"
            strokeWidth="1.5"
          />
          <path d="M 260,125 L 310,112 L 310,145 L 260,155 Z" fill="#1a1a1a" stroke="#333" strokeWidth="1" />

          {/* Exhaust */}
          <path d="M 240,155 L 200,165 Q 175,168 160,160" stroke="#555" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 160,160 L 148,158" stroke="#666" strokeWidth="6" fill="none" strokeLinecap="round" />

          {/* Main fairing / body */}
          <path
            d={`M 320,90 Q 340,72 370,62 L 410,55 Q 430,52 445,58 L 455,65 L 448,78 L 420,88 L 380,75 L 340,82 L 320,90 Z`}
            fill={`url(#bike-${teamName.replace(/\s/g, "")})`}
            stroke={teamColor}
            strokeWidth="1.5"
            opacity="0.95"
          />

          {/* Tank */}
          <path
            d="M 280,100 Q 290,80 320,72 L 350,68 L 370,72 L 360,88 L 330,95 L 300,100 Z"
            fill={teamColor}
            opacity="0.7"
            stroke={teamColor}
            strokeWidth="1"
          />

          {/* Seat / tail */}
          <path
            d="M 250,120 L 265,105 L 300,100 L 290,115 L 270,125 L 250,130 Z"
            fill={teamColor}
            opacity="0.5"
            stroke={teamColor}
            strokeWidth="1"
          />
          {/* Tail section */}
          <path
            d="M 230,130 L 250,120 L 250,135 L 235,142 Z"
            fill={teamColor}
            opacity="0.35"
          />

          {/* Front fork */}
          <path d="M 430,90 L 442,125" stroke="#555" strokeWidth="5" strokeLinecap="round" />
          <path d="M 425,95 L 438,128" stroke="#444" strokeWidth="4" strokeLinecap="round" />

          {/* Windscreen */}
          <path
            d="M 410,55 Q 420,42 435,38 L 448,40 L 455,50 L 455,65 L 445,58 L 430,52 Z"
            fill="rgba(255,255,255,0.08)"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />

          {/* Front fender */}
          <path
            d="M 428,130 Q 445,118 465,120 Q 475,135 470,150 Q 455,142 440,140 Z"
            fill={teamColor}
            opacity="0.3"
          />

          {/* Rider silhouette (lean position) */}
          {/* Torso */}
          <path
            d="M 330,70 Q 340,55 355,48 L 365,45 L 375,48 L 370,58 L 355,65 L 340,72 Z"
            fill="#1a1a1a"
            stroke="#222"
            strokeWidth="1"
          />
          {/* Helmet */}
          <ellipse cx="368" cy="42" rx="14" ry="11" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
          <path d="M 356,38 Q 368,32 380,38" fill="none" stroke={teamColor} strokeWidth="1.5" opacity="0.6" />
          {/* Arms */}
          <path d="M 355,60 L 390,58 L 410,62" stroke="#1a1a1a" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Legs */}
          <path d="M 330,75 L 310,95 L 295,105" stroke="#1a1a1a" strokeWidth="5" fill="none" strokeLinecap="round" />

          {/* Number plate area */}
          <rect x="250" y="108" width="22" height="16" rx="3" fill={teamColor} opacity="0.6" />

          {/* Brake disc hints */}
          <circle cx="155" cy="170" r="24" fill="none" stroke="#444" strokeWidth="2" strokeDasharray="4,3" />
          <circle cx="440" cy="170" r="24" fill="none" stroke="#444" strokeWidth="2" strokeDasharray="4,3" />

          {/* Ground shadow */}
          <ellipse cx="300" cy="228" rx="180" ry="6" fill={teamColor} opacity="0.08" />
        </svg>
      </div>
      <div className="px-4 pb-3 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: teamColor }} />
        <span className="text-xs font-mono text-silver uppercase tracking-wider">
          {teamName} — {bikeName}
        </span>
      </div>
    </div>
  )
}
