interface SkeletonProps {
  className?: string
  variant?: "text" | "card" | "circle" | "rect"
}

export default function Skeleton({
  className = "",
  variant = "text",
}: SkeletonProps) {
  const baseClass = "animate-pulse bg-asphalt/50 rounded"

  const variantClasses = {
    text: "h-4 w-full",
    card: "h-32 w-full rounded-xl",
    circle: "h-10 w-10 rounded-full",
    rect: "h-20 w-full rounded-lg",
  }

  return (
    <div
      className={`${baseClass} ${variantClasses[variant]} ${className}`}
      aria-hidden="true"
    />
  )
}

export function DriverStandingsSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-3">
          <Skeleton variant="circle" className="w-8 h-8" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  )
}

export function RaceCardSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} variant="card" />
      ))}
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-24 w-full" />
      <div className="flex gap-4 justify-center">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-16" />
        ))}
      </div>
    </div>
  )
}
