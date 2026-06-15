interface TeamColorBarProps {
  color: string
  position?: number
  className?: string
}

export default function TeamColorBar({
  color,
  position,
  className = "",
}: TeamColorBarProps) {
  const isP1 = position === 1

  return (
    <div
      className={`w-1 flex-shrink-0 rounded-full transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_8px] ${isP1 ? "opacity-100" : "opacity-60"} ${className}`}
      style={{
        backgroundColor: isP1 ? "#FFD700" : color,
        boxShadow: isP1 ? "0 0 8px rgba(255, 215, 0, 0.5)" : undefined,
      }}
    />
  )
}
