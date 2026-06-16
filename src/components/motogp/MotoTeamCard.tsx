import Link from "next/link"
import type { MotoTeam } from "@/types/motogp"
import { getMotoTeamColor } from "@/lib/motoColors"

interface MotoTeamCardProps {
  team: MotoTeam
  position?: number
}

export default function MotoTeamCard({ team, position }: MotoTeamCardProps) {
  const teamColor = getMotoTeamColor(team.name)
  const isP1 = position === 1

  return (
    <Link href={`/motogp/teams/${team.id}`}>
      <div
        className={`group relative overflow-hidden rounded-xl border bg-pit p-6 transition-all duration-300 hover:scale-[1.02] ${
          isP1
            ? "border-gold/50 shadow-[0_0_20px_rgba(255,215,0,0.1)]"
            : "border-asphalt hover:border-scarlet/30"
        }`}
      >
        <div
          className="absolute top-0 left-0 w-full h-1"
          style={{ backgroundColor: teamColor }}
        />
        {isP1 && (
          <div className="absolute -top-1 -right-1 w-20 h-20">
            <div className="absolute top-3 right-3 rotate-45 bg-gold text-carbon text-[10px] font-bold uppercase tracking-wider px-8 py-0.5 shadow-lg">
              Leaders
            </div>
          </div>
        )}
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`flex items-center justify-center w-10 h-10 rounded-lg font-mono text-sm font-bold ${
              isP1
                ? "bg-gold/20 text-gold ring-2 ring-gold"
                : "bg-carbon text-silver ring-1 ring-asphalt"
            }`}
          >
            {position}
          </span>
          <div>
            <h3 className="font-semibold text-white text-lg">{team.name}</h3>
            <p className="text-xs text-silver flex items-center gap-1">
              {team.constructor?.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <p className="text-2xl font-bold font-mono text-white">{team.riders?.length ?? 0}</p>
            <p className="text-xs text-silver">rider{team.riders?.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
        <div
          className="mt-4 h-1 w-full rounded-full opacity-20"
          style={{ backgroundColor: teamColor }}
        />
      </div>
    </Link>
  )
}
