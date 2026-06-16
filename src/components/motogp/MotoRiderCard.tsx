import Link from "next/link"
import type { MotoTeamRider } from "@/types/motogp"
import { getMotoTeamColor, getMotoCountryFlagFromIso, getMotoNumberColor } from "@/lib/motoColors"
import TeamColorBar from "@/components/ui/TeamColorBar"

interface MotoRiderCardProps {
  rider: MotoTeamRider
  position?: number
}

export default function MotoRiderCard({ rider, position }: MotoRiderCardProps) {
  const teamName = rider.current_career_step?.team?.name ?? ""
  const teamColor = getMotoTeamColor(teamName)
  const numberColor = getMotoNumberColor(rider.current_career_step?.team?.color ?? teamColor)
  const flag = getMotoCountryFlagFromIso(rider.country?.iso ?? "")
  const riderNumber = rider.current_career_step?.number
  const isP1 = position === 1

  return (
    <Link href={`/motogp/riders/${rider.id}`}>
      <div className="group flex items-center gap-4 p-3 rounded-xl bg-pit border border-asphalt hover:border-scarlet/30 transition-all duration-300 overflow-hidden relative">
        {position && <TeamColorBar color={teamColor} position={position} className="h-16" />}
        {riderNumber && (
          <div
            className="flex items-center justify-center w-10 h-10 rounded-lg font-mono text-sm font-bold bg-carbon"
            style={{ color: numberColor }}
          >
            {riderNumber}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm">{flag}</span>
            <span
              className={`font-semibold truncate ${
                isP1 ? "text-gold" : "text-white"
              } ${isP1 ? "drop-shadow-[0_0_4px_rgba(255,215,0,0.3)]" : ""}`}
            >
              {rider.name} {rider.surname}
            </span>
            {isP1 && (
              <span className="text-[10px] font-bold text-gold uppercase tracking-wider">
                Leader
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-silver mt-0.5">
            <span>{rider.country?.name ?? ""}</span>
            <span className="text-asphalt">|</span>
            <span style={{ color: teamColor }}>{teamName}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
