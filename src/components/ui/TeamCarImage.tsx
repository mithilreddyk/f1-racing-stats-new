import Image from "next/image"

interface TeamCarImageProps {
  teamName: string
  teamColor: string
  className?: string
}

const CAR_IMAGE_MAP: Record<string, string> = {
  "Red Bull Racing": "/cars/redbullracing.avif",
  "Red Bull": "/cars/redbullracing.avif",
  Ferrari: "/cars/ferrari.avif",
  Mercedes: "/cars/mercedes.avif",
  McLaren: "/cars/mclaren.avif",
  "Aston Martin": "/cars/astonmartin.avif",
  Alpine: "/cars/alpine.avif",
  "Alpine F1 Team": "/cars/alpine.avif",
  Williams: "/cars/williams.avif",
  "RB F1 Team": "/cars/racingbulls.avif",
  RB: "/cars/racingbulls.avif",
  "Kick Sauber": "/cars/kicksauber.avif",
  "Stake F1 Team": "/cars/kicksauber.avif",
  "Haas F1 Team": "/cars/haas.avif",
  Haas: "/cars/haas.avif",
}

export default function TeamCarImage({ teamName, teamColor, className = "" }: TeamCarImageProps) {
  const src = CAR_IMAGE_MAP[teamName]

  return (
    <div
      className={`relative rounded-xl overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${teamColor}12 0%, #0D0D0D 60%)`, border: `1px solid ${teamColor}30` }}
    >
      {src ? (
        <div className="relative w-full" style={{ paddingBottom: "40%" }}>
          <Image
            src={src}
            alt={`${teamName} 2025 car`}
            fill
            className="object-contain p-4 drop-shadow-2xl"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-40 text-silver text-sm">
          Car image unavailable
        </div>
      )}
      <div className="px-4 pb-3 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: teamColor }} />
        <span className="text-xs font-mono text-silver uppercase tracking-wider">
          {teamName} — 2025 Livery
        </span>
      </div>
    </div>
  )
}
