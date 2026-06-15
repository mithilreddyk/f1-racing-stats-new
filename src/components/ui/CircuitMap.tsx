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
  if (!map) return null

  return (
    <svg
      viewBox="0 0 400 300"
      className={`w-full max-w-sm mx-auto ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="400" height="300" rx="8" fill="#1A1A1A" />
      <path
        d={map.path}
        fill="none"
        stroke="#E8002D"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="drop-shadow-[0_0_6px_rgba(232,0,45,0.3)]"
      />
      {map.startLine && (
        <line
          x1={map.startLine.x - 5}
          y1={map.startLine.y - 10}
          x2={map.startLine.x - 5}
          y2={map.startLine.y + 10}
          stroke="#FFD700"
          strokeWidth="2"
        />
      )}
      {map.turns?.map((turn) => (
        <text
          key={turn.label}
          x={turn.x}
          y={turn.y}
          fill="#C0C0C0"
          fontSize="8"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
        >
          {turn.label}
        </text>
      ))}
    </svg>
  )
}
