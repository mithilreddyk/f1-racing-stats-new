import { ordinalSuffix } from "@/lib/utils"

interface PositionBadgeProps {
  position: string | number
  size?: "sm" | "md" | "lg"
}

export default function PositionBadge({
  position,
  size = "md",
}: PositionBadgeProps) {
  const pos = typeof position === "string" ? parseInt(position, 10) : position
  const isP1 = pos === 1
  const isP2 = pos === 2
  const isP3 = pos === 3

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg",
  }

  let ringStyle = ""
  let textStyle = ""

  if (isP1) {
    ringStyle = "ring-2 ring-gold shadow-[0_0_12px_rgba(255,215,0,0.5)]"
    textStyle = "text-gold font-bold"
  } else if (isP2) {
    ringStyle = "ring-1 ring-silver"
    textStyle = "text-silver font-semibold"
  } else if (isP3) {
    ringStyle = "ring-1 ring-amber-700"
    textStyle = "text-amber-600 font-semibold"
  } else {
    ringStyle = "ring-1 ring-asphalt"
    textStyle = "text-white"
  }

  return (
    <div
      className={`${sizeClasses[size]} ${ringStyle} ${textStyle} rounded-lg flex items-center justify-center bg-pit font-mono`}
    >
      {pos}
    </div>
  )
}
