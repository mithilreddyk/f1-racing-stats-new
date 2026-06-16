import Link from "next/link"
import type { ConstructorStanding } from "@/types/f1"
import { getTeamColor, getCountryFlag, getTeamInsights } from "@/lib/teamColors"

interface TeamCardProps {
  team: ConstructorStanding
  position: number
}

export default function TeamCard({ team, position }: TeamCardProps) {
  const teamColor = getTeamColor(team.Constructor.name)
  const flag = getCountryFlag(team.Constructor.nationality)
  const insights = getTeamInsights(team.Constructor.name)
  const isP1 = position === 1

  return (
    <Link href={`/constructors/${team.Constructor.constructorId}`}>
      <div
        className={`group relative overflow-hidden rounded-xl bg-pit transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 ${
          isP1
            ? "shadow-[0_0_24px_rgba(255,215,0,0.12)]"
            : "hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
        }`}
        style={{
          border: `1px solid ${isP1 ? "rgba(255,215,0,0.35)" : "rgba(42,42,42,1)"}`,
        }}
      >
        {/* Team color top bar */}
        <div className="h-1 w-full" style={{ backgroundColor: teamColor }} />

        {/* P1 badge */}
        {isP1 && (
          <div className="absolute top-3 right-3">
            <span className="text-[9px] font-bold text-gold uppercase tracking-widest bg-gold/10 border border-gold/25 px-2 py-0.5 rounded-full">
              LEADERS
            </span>
          </div>
        )}

        <div className="p-5">
          {/* Header row */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-bold"
              style={{
                backgroundColor: isP1 ? "rgba(255,215,0,0.15)" : "rgba(42,42,42,0.8)",
                color: isP1 ? "#FFD700" : "#C0C0C0",
                boxShadow: isP1 ? "0 0 0 1.5px rgba(255,215,0,0.4)" : "0 0 0 1px rgba(42,42,42,1)",
              }}
            >
              {position}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-white text-base leading-tight truncate group-hover:text-white transition-colors">
                {team.Constructor.name}
              </h3>
              <p className="text-xs text-silver mt-0.5">
                {flag} {team.Constructor.nationality}
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-end gap-6 mb-4">
            <div>
              <p className="text-2xl font-bold font-mono text-white leading-none">{team.points}</p>
              <p className="text-[11px] text-silver mt-1">POINTS</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-gold leading-none">{team.wins}</p>
              <p className="text-[11px] text-silver mt-1">WINS</p>
            </div>
          </div>

          {/* Engine / Chassis pills */}
          {insights && (
            <div className="flex flex-wrap gap-1.5 mb-1">
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${teamColor}18`,
                  color: teamColor,
                  border: `1px solid ${teamColor}35`,
                }}
              >
                {insights.engine}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-carbon text-silver border border-asphalt">
                {insights.chassis}
              </span>
            </div>
          )}
        </div>

        {/* Bottom accent line */}
        <div
          className="h-px w-full opacity-20"
          style={{ backgroundColor: teamColor }}
        />
      </div>
    </Link>
  )
}
