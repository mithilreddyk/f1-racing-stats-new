import Link from "next/link"
import type { DriverStanding } from "@/types/f1"
import { getTeamColor, getCountryFlag } from "@/lib/teamColors"
import TeamColorBar from "@/components/ui/TeamColorBar"
import PositionBadge from "@/components/ui/PositionBadge"

interface DriverCardProps {
  driver: DriverStanding
  position: number
}

export default function DriverCard({ driver, position }: DriverCardProps) {
  const teamColor = getTeamColor(driver.Constructors[0]?.name ?? "")
  const flag = getCountryFlag(driver.Driver.nationality)
  const isP1 = position === 1

  return (
    <Link href={`/drivers/${driver.Driver.driverId}`}>
      <div className="group flex items-center gap-4 p-3 rounded-xl bg-pit border border-asphalt hover:border-scarlet/30 transition-all duration-300 overflow-hidden relative">
        <TeamColorBar color={teamColor} position={position} className="h-16" />
        <PositionBadge position={position} size="sm" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm">{flag}</span>
            <span
              className={`font-semibold truncate group-hover:text-scarlet transition-colors ${
                isP1 ? "text-gold drop-shadow-[0_0_4px_rgba(255,215,0,0.3)]" : "text-white"
              }`}
            >
              {driver.Driver.givenName} {driver.Driver.familyName}
            </span>
            {isP1 && (
              <span className="text-[10px] font-bold text-gold uppercase tracking-wider">
                Leader
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-silver mt-0.5">
            <span>{driver.Driver.nationality}</span>
            <span className="text-asphalt">|</span>
            <span style={{ color: teamColor }}>{driver.Constructors[0]?.name}</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-white font-bold font-mono text-lg">
            {driver.points}
            <span className="text-silver text-xs ml-1 font-normal">pts</span>
          </div>
          <div className="text-xs text-silver/60 mt-0.5">
            {driver.wins}{" "}
            <span className="text-silver/60">win{driver.wins !== "1" ? "s" : ""}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
