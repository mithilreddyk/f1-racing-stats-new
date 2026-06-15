import type { DriverStanding } from "@/types/f1"
import { getTeamColor, getCountryFlag } from "@/lib/teamColors"
import { ordinalSuffix } from "@/lib/utils"
import TeamColorBar from "@/components/ui/TeamColorBar"
import GlossaryTooltip from "@/components/ui/GlossaryTooltip"
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
    <div className="group flex items-center gap-4 p-3 rounded-xl bg-pit border border-asphalt hover:border-scarlet/30 transition-all duration-300 overflow-hidden relative">
      <TeamColorBar color={teamColor} position={position} className="h-16" />
      <PositionBadge position={position} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm">{flag}</span>
          <span
            className={`font-semibold truncate ${
              isP1 ? "text-gold" : "text-white"
            } ${isP1 ? "drop-shadow-[0_0_4px_rgba(255,215,0,0.3)]" : ""}`}
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
        <GlossaryTooltip term="Points">
          <div className="text-xs text-silver/60 mt-0.5">
            {driver.wins}{" "}
            <span className="text-silver/60">win{driver.wins !== "1" ? "s" : ""}</span>
          </div>
        </GlossaryTooltip>
      </div>
    </div>
  )
}
