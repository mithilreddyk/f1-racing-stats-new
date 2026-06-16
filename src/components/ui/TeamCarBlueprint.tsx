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
    <div
      className={`rounded-xl p-6 ${className}`}
      style={{
        background: "#0A1628",
        border: `1px solid ${teamColor}33`,
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: teamColor }} />
        <h3 className="text-sm font-bold text-white font-display tracking-wide uppercase">
          {teamName} — Technical Blueprint
        </h3>
      </div>

      <svg
        viewBox="0 0 800 380"
        className="w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="bp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={teamColor} strokeWidth="0.3" opacity="0.2" />
          </pattern>
          <linearGradient id="bp-body" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={teamColor} stopOpacity="0.45" />
            <stop offset="60%" stopColor={teamColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor={teamColor} stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* Blueprint grid background */}
        <rect width="800" height="380" fill="url(#bp-grid)" />

        {/* Outer bounding box */}
        <rect x="28" y="28" width="744" height="324" fill="none" stroke={teamColor} strokeWidth="0.5" opacity="0.25" strokeDasharray="4,4" />

        {/* ─── MAIN BODY (top-down view, front = LEFT at x≈55) ─── */}
        {/* Single clean closed path for the monocoque + sidepods */}
        <path
          d={`
            M 55,190
            C 80,184 140,172 230,160
            C 295,151 360,136 450,122
            C 495,116 530,114 560,116
            C 590,118 620,126 650,136
            L 668,144
            L 668,148
            L 668,232
            L 650,244
            C 620,254 590,262 560,264
            C 530,266 495,264 450,258
            C 360,244 295,229 230,220
            C 140,208 80,198 55,190
            Z
          `}
          fill="url(#bp-body)"
          stroke={teamColor}
          strokeWidth="1.8"
          opacity="0.9"
        />

        {/* Cockpit cutout / driver area */}
        <ellipse cx="350" cy="190" rx="52" ry="28" fill="#0A1628" stroke={teamColor} strokeWidth="1.2" opacity="0.8" />
        <ellipse cx="350" cy="190" rx="36" ry="18" fill="none" stroke={teamColor} strokeWidth="0.6" opacity="0.4" strokeDasharray="3,2" />

        {/* Halo (top-down: two arcs framing the cockpit opening) */}
        <path d="M 300,180 Q 350,162 400,180" fill="none" stroke={teamColor} strokeWidth="3.5" opacity="0.7" strokeLinecap="round" />
        <path d="M 300,200 Q 350,218 400,200" fill="none" stroke={teamColor} strokeWidth="3.5" opacity="0.7" strokeLinecap="round" />

        {/* Engine cover / airbox (behind cockpit) */}
        <path
          d="M 405,175 L 435,170 L 490,165 L 530,162 L 560,162 L 560,218 L 530,218 L 490,215 L 435,210 L 405,205 Z"
          fill="none"
          stroke={teamColor}
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Airbox intake */}
        <ellipse cx="415" cy="190" rx="10" ry="14" fill="none" stroke={teamColor} strokeWidth="1" opacity="0.5" />

        {/* Floor / underfloor edges (dashed) */}
        <path d="M 230,170 L 560,155" fill="none" stroke={teamColor} strokeWidth="0.7" strokeDasharray="4,3" opacity="0.35" />
        <path d="M 230,210 L 560,225" fill="none" stroke={teamColor} strokeWidth="0.7" strokeDasharray="4,3" opacity="0.35" />

        {/* ─── FRONT WING ─── */}
        {/* Main plane */}
        <path
          d="M 55,190 L 62,136 L 72,116 L 88,108 L 106,108 L 118,114 L 128,126 L 135,145 L 138,164"
          fill="none"
          stroke={teamColor}
          strokeWidth="1.4"
          opacity="0.75"
        />
        <path
          d="M 55,190 L 62,244 L 72,264 L 88,272 L 106,272 L 118,266 L 128,254 L 135,235 L 138,216"
          fill="none"
          stroke={teamColor}
          strokeWidth="1.4"
          opacity="0.75"
        />
        {/* Endplates */}
        <line x1="88" y1="108" x2="88" y2="272" stroke={teamColor} strokeWidth="1" opacity="0.5" />
        <line x1="118" y1="108" x2="118" y2="272" stroke={teamColor} strokeWidth="1" opacity="0.5" />
        {/* Wing elements (stacked) */}
        <path d="M 70,152 L 138,158" fill="none" stroke={teamColor} strokeWidth="0.6" opacity="0.35" strokeDasharray="3,2" />
        <path d="M 70,164 L 138,170" fill="none" stroke={teamColor} strokeWidth="0.6" opacity="0.35" strokeDasharray="3,2" />
        <path d="M 70,216 L 138,210" fill="none" stroke={teamColor} strokeWidth="0.6" opacity="0.35" strokeDasharray="3,2" />
        <path d="M 70,228 L 138,222" fill="none" stroke={teamColor} strokeWidth="0.6" opacity="0.35" strokeDasharray="3,2" />

        {/* ─── REAR WING ─── */}
        {/* Main plane */}
        <path
          d="M 668,144 L 672,100 L 690,82 L 716,76 L 738,80 L 754,92 L 758,108 L 756,126 L 748,136 L 728,142 L 700,144"
          fill="none"
          stroke={teamColor}
          strokeWidth="1.4"
          opacity="0.75"
        />
        <path
          d="M 668,232 L 672,280 L 690,298 L 716,304 L 738,300 L 754,288 L 758,272 L 756,254 L 748,244 L 728,238 L 700,236"
          fill="none"
          stroke={teamColor}
          strokeWidth="1.4"
          opacity="0.75"
        />
        {/* Rear wing endplates */}
        <line x1="738" y1="80" x2="738" y2="300" stroke={teamColor} strokeWidth="1" opacity="0.5" />
        <line x1="716" y1="76" x2="716" y2="304" stroke={teamColor} strokeWidth="1" opacity="0.5" />
        {/* DRS flap */}
        <path d="M 672,110 L 756,110" fill="none" stroke={teamColor} strokeWidth="0.6" opacity="0.35" strokeDasharray="3,2" />
        <path d="M 672,270 L 756,270" fill="none" stroke={teamColor} strokeWidth="0.6" opacity="0.35" strokeDasharray="3,2" />
        {/* Rear wing beam / support */}
        <line x1="668" y1="188" x2="670" y2="192" stroke={teamColor} strokeWidth="2" opacity="0.4" />
        <line x1="716" y1="76" x2="720" y2="144" stroke={teamColor} strokeWidth="1" opacity="0.3" />
        <line x1="716" y1="304" x2="720" y2="236" stroke={teamColor} strokeWidth="1" opacity="0.3" />

        {/* Diffuser */}
        <path
          d="M 650,155 L 668,148 L 668,144"
          fill="none"
          stroke={teamColor}
          strokeWidth="1"
          opacity="0.4"
        />
        <path
          d="M 650,225 L 668,232 L 668,236"
          fill="none"
          stroke={teamColor}
          strokeWidth="1"
          opacity="0.4"
        />
        <rect x="655" y="170" width="22" height="40" rx="2" fill="none" stroke={teamColor} strokeWidth="0.8" opacity="0.4" strokeDasharray="2,2" />

        {/* ─── FRONT WHEELS ─── */}
        {/* Oval top-down tires */}
        <ellipse cx="200" cy="102" rx="14" ry="34" fill="none" stroke={teamColor} strokeWidth="2" opacity="0.7" />
        <ellipse cx="200" cy="102" rx="6" ry="18" fill="none" stroke={teamColor} strokeWidth="0.8" opacity="0.35" />
        <ellipse cx="200" cy="278" rx="14" ry="34" fill="none" stroke={teamColor} strokeWidth="2" opacity="0.7" />
        <ellipse cx="200" cy="278" rx="6" ry="18" fill="none" stroke={teamColor} strokeWidth="0.8" opacity="0.35" />
        {/* Front axle line */}
        <line x1="200" y1="136" x2="200" y2="158" stroke={teamColor} strokeWidth="1.5" opacity="0.5" />
        <line x1="200" y1="222" x2="200" y2="244" stroke={teamColor} strokeWidth="1.5" opacity="0.5" />

        {/* ─── REAR WHEELS ─── */}
        <ellipse cx="580" cy="88" rx="18" ry="40" fill="none" stroke={teamColor} strokeWidth="2" opacity="0.7" />
        <ellipse cx="580" cy="88" rx="8" ry="22" fill="none" stroke={teamColor} strokeWidth="0.8" opacity="0.35" />
        <ellipse cx="580" cy="292" rx="18" ry="40" fill="none" stroke={teamColor} strokeWidth="2" opacity="0.7" />
        <ellipse cx="580" cy="292" rx="8" ry="22" fill="none" stroke={teamColor} strokeWidth="0.8" opacity="0.35" />
        {/* Rear axle line */}
        <line x1="580" y1="128" x2="580" y2="148" stroke={teamColor} strokeWidth="1.5" opacity="0.5" />
        <line x1="580" y1="232" x2="580" y2="252" stroke={teamColor} strokeWidth="1.5" opacity="0.5" />

        {/* ─── WHEELBASE DIMENSION ─── */}
        <line x1="200" y1="50" x2="200" y2="62" stroke={teamColor} strokeWidth="0.7" opacity="0.45" />
        <line x1="580" y1="50" x2="580" y2="62" stroke={teamColor} strokeWidth="0.7" opacity="0.45" />
        <line x1="200" y1="55" x2="580" y2="55" stroke={teamColor} strokeWidth="0.7" opacity="0.45" />
        <text x="390" y="48" fill={teamColor} fontSize="8.5" textAnchor="middle" fontFamily="monospace" opacity="0.55">WHEELBASE: 3600mm</text>

        {/* Overall length dimension */}
        <line x1="55" y1="345" x2="55" y2="333" stroke={teamColor} strokeWidth="0.7" opacity="0.45" />
        <line x1="758" y1="345" x2="758" y2="333" stroke={teamColor} strokeWidth="0.7" opacity="0.45" />
        <line x1="55" y1="340" x2="758" y2="340" stroke={teamColor} strokeWidth="0.7" opacity="0.45" />
        <text x="407" y="355" fill={teamColor} fontSize="8.5" textAnchor="middle" fontFamily="monospace" opacity="0.55">OVERALL LENGTH: 5695mm</text>

        {/* ─── PART LABELS ─── */}
        <text x="95" y="195" fill={teamColor} fontSize="7" textAnchor="middle" fontFamily="monospace" opacity="0.55" transform="rotate(-90, 95, 195)">FRONT WING</text>
        <text x="350" y="182" fill={teamColor} fontSize="7" textAnchor="middle" fontFamily="monospace" opacity="0.55">COCKPIT</text>
        <text x="480" y="148" fill={teamColor} fontSize="7" textAnchor="middle" fontFamily="monospace" opacity="0.55">ENGINE COVER</text>
        <text x="710" y="195" fill={teamColor} fontSize="7" textAnchor="middle" fontFamily="monospace" opacity="0.55" transform="rotate(-90, 710, 195)">REAR WING</text>
        <text x="200" y="192" fill={teamColor} fontSize="7" textAnchor="middle" fontFamily="monospace" opacity="0.45">F.AXL</text>
        <text x="580" y="192" fill={teamColor} fontSize="7" textAnchor="middle" fontFamily="monospace" opacity="0.45">R.AXL</text>

        {/* ─── LEGEND ─── */}
        <line x1="36" y1="296" x2="66" y2="296" stroke={teamColor} strokeWidth="1.8" opacity="0.65" />
        <text x="72" y="300" fill={teamColor} fontSize="8" fontFamily="monospace" opacity="0.55">MONOCOQUE CHASSIS</text>
        <line x1="36" y1="310" x2="66" y2="310" stroke={teamColor} strokeWidth="0.8" strokeDasharray="4,3" opacity="0.5" />
        <text x="72" y="314" fill={teamColor} fontSize="8" fontFamily="monospace" opacity="0.55">AERODYNAMIC SURFACE</text>
        <line x1="36" y1="324" x2="66" y2="324" stroke={teamColor} strokeWidth="1.2" opacity="0.45" />
        <text x="72" y="328" fill={teamColor} fontSize="8" fontFamily="monospace" opacity="0.55">SUSPENSION / AXLE</text>

        {/* ─── SPECS (bottom right) ─── */}
        <text x="762" y="296" fill={teamColor} fontSize="7.5" textAnchor="end" fontFamily="monospace" opacity="0.5">TIRES: 305/720-18 (F) · 405/720-18 (R)</text>
        <text x="762" y="310" fill={teamColor} fontSize="7.5" textAnchor="end" fontFamily="monospace" opacity="0.5">MIN WEIGHT: 798 kg (inc. driver)</text>
        <text x="762" y="324" fill={teamColor} fontSize="7.5" textAnchor="end" fontFamily="monospace" opacity="0.5">POWER UNIT: ~1000 hp (ICE + ERS)</text>
      </svg>
    </div>
  )
}
