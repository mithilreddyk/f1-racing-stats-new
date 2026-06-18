import type { Metadata } from "next"
import Link from "next/link"
import { getMotoGPStandings, getMotoGPTeams } from "@/lib/motogp"
import { getCountryFlag } from "@/lib/teamColors"
import MotoGPBikeImage from "@/components/ui/MotoGPBikeImage"

export const metadata: Metadata = {
  title: "MotoGP Teams",
  description: "All MotoGP teams, riders, and manufacturers for the 2025 season.",
}

export default function MotoGPTeamsPage() {
  const teams = getMotoGPTeams()
  const standings = getMotoGPStandings()

  const teamStandings = teams
    .map((t) => {
      const teamRiders = standings.filter((s) => s.team.id === t.id)
      const totalPts = teamRiders.reduce((sum, r) => sum + r.points, 0)
      return { team: t, riders: teamRiders, totalPts }
    })
    .sort((a, b) => b.totalPts - a.totalPts)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-display tracking-wide flex items-center gap-2">
          <span className="w-1.5 h-7 rounded-full inline-block bg-[#7B2D8E]" />
          MotoGP Teams
        </h1>
        <p className="text-silver text-sm mt-1 ml-4">2025 Season — {teams.length} teams across 4 manufacturers</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {teamStandings.map(({ team, riders, totalPts }, idx) => {
          const flag = getCountryFlag(team.country)
          return (
            <div
              key={team.id}
              id={team.id}
              className="rounded-xl bg-pit border border-asphalt overflow-hidden hover:border-[#7B2D8E]/30 transition-all"
            >
              {/* Color bar */}
              <div className="h-1 w-full" style={{ backgroundColor: team.color }} />

              <div className="p-5">
                {/* Team header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold flex-shrink-0"
                    style={{
                      backgroundColor: `${team.color}20`,
                      color: team.color,
                      border: `1px solid ${team.color}40`,
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white text-base truncate">{team.name}</h3>
                    <p className="text-xs text-silver">{flag} {team.country} · {team.base}</p>
                  </div>
                  <div className="ml-auto text-right flex-shrink-0">
                    <p className="font-mono font-bold text-white text-lg leading-none">{totalPts}</p>
                    <p className="text-[10px] text-silver mt-0.5">pts</p>
                  </div>
                </div>

                {/* Bike manufacturer pill */}
                <div className="flex gap-2 mb-4">
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${team.color}18`,
                      color: team.color,
                      border: `1px solid ${team.color}35`,
                    }}
                  >
                    {team.bike}
                  </span>
                </div>

                {/* Bike image */}
                <MotoGPBikeImage teamColor={team.color} teamName={team.name} bikeName={team.bike} className="mb-4" />

                {/* Riders */}
                <div className="space-y-2">
                  {riders.map((s) => (
                    <Link
                      key={s.rider.id}
                      href={`/motogp/riders/${s.rider.id}`}
                      className="flex items-center gap-2 p-2 rounded-lg bg-carbon/50 hover:bg-carbon/80 transition-colors"
                    >
                      <span className="font-mono text-xs text-silver w-6 text-center">P{s.position}</span>
                      <span className="font-mono text-xs text-silver/60">#{s.rider.number}</span>
                      <span className="text-sm text-white font-medium flex-1 truncate hover:text-[#7B2D8E] transition-colors">
                        {s.rider.firstName} {s.rider.lastName}
                      </span>
                      <span className="font-mono text-sm font-bold text-white">{s.points}</span>
                      <span className="text-[10px] text-silver">pts</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
