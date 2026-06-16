import { getCircuitMap } from "@/lib/circuitMaps"

interface CircuitMapProps {
  circuitId: string
  circuitName: string
  className?: string
}

export default function CircuitMap({
  circuitId,
  circuitName,
  className = "",
}: CircuitMapProps) {
  const map = getCircuitMap(circuitId)

  return (
    <svg
      viewBox="0 0 400 300"
      className={`w-full max-w-sm mx-auto ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="400" height="300" rx="8" fill="#1A1A1A" />
      {map ? (
        <>
          <path
            d={map.path}
            fill="none"
            stroke="#E8002D"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_8px_rgba(232,0,45,0.4)]"
          />
          {map.startLine && (
            <line
              x1={map.startLine.x - 5}
              y1={map.startLine.y - 10}
              x2={map.startLine.x - 5}
              y2={map.startLine.y + 10}
              stroke="#FFD700"
              strokeWidth="3"
            />
          )}
        </>
      ) : (
        <text
          x="200"
          y="150"
          fill="#666"
          fontSize="14"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
        >
          {circuitName}
        </text>
      )}
      <text
        x="200"
        y="280"
        fill="#555"
        fontSize="10"
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
      >
        {circuitName} — Circuit Layout
      </text>
    </svg>
  )
}
