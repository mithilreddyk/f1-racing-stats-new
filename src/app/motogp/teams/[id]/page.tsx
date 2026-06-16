import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getMotoTeamById, getMotoEvents, getMotoEventSessions, getMotoSessionResult, getMotoStandings } from "@/lib/motogp"
import { getMotoTeamColor, getMotoCountryFlagFromIso, getMotoNumberColor, getMotoTeamInsights } from "@/lib/motoColors"
import { MotoHeroSkeleton } from "@/components/motogp/MotoSkeleton"
import MotoTeamCarBg from "@/components/motogp/MotoTeamCarBg"
import MotoTeamCarBlueprint from "@/components/motogp/MotoTeamCarBlueprint"

interface TeamPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: TeamPageProps): Promise<Metadata> {
  const { id } = await params
  const team = await getMotoTeamById(id)
  return {
    title: team?.name ?? "Team",
  }
}

async function TeamContent({ id }: { id: string }) {
  const [team, events, standings] = await Promise.all([
    getMotoTeamById(id),
    getMotoEvents(),
    getMotoStandings(),
  ])

  if (!team) notFound()

  const color = getMotoTeamColor(team.name)
  const constructorName = team.constructor?.name ?? ""
  const teamDrivers = team.riders ?? []
  const finishedEvents = events.filter((e) => e.status === "FINISHED")
  const recentEvents = finishedEvents.slice(-20).reverse()

  const riderStandings = standings?.filter(
    (s) => teamDrivers.some((d) => d.id === s.rider.id)
  ) ?? []

  const raceResults = await Promise.all(
    recentEvents.map(async (event) => {
      const eventUuid = event.results_api_event_uuid ?? event.toad_api_uuid
      if (!eventUuid) return null
      const sessions = await getMotoEventSessions(eventUuid)
      const raceSession = sessions.find((s) => s.type === "RAC")
      if (!raceSession) return null
      const result = await getMotoSessionResult(raceSession.id)
      if (!result) return null
      const entries = result.classification.filter(
        (c) => c.team?.name === team.name
      )
      if (entries.length === 0) return null
      const round = events.indexOf(event) + 1
      return { event, entries, round }
    })
  )

  const validResults = raceResults.filter((r): r is NonNullable<typeof r> => r !== null)

  const insights = getMotoTeamInsights(team.name)

  return (
    <div className="relative">
      <div
        className="absolute top-0 left-0 w-full h-48 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, ${color}22 0%, transparent 100%)`,
        }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <MotoTeamCarBg teamColor={color} />
        <div className="mb-8 relative z-10">
          <div className="flex items-center gap-2 text-sm text-silver mb-4">
            <Link href="/motogp/teams" className="hover:text-white transition-colors">
              Teams
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-lg"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 30px ${color}44`,
              }}
            >
              {team.name.slice(0, 3).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-white font-display tracking-wide">
                  {team.name}
                </h1>
              </div>
              <p className="text-silver text-sm">
                {constructorName}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8 relative z-10">
          <div className="bg-pit border border-asphalt rounded-xl p-4 text-center">
            <p className="text-2xl font-bold font-mono text-white">{teamDrivers.length}</p>
            <p className="text-xs text-silver">Riders</p>
          </div>
          <div className="bg-pit border border-asphalt rounded-xl p-4 text-center">
            <p className="text-2xl font-bold font-mono text-white">{finishedEvents.length}</p>
            <p className="text-xs text-silver">Races</p>
          </div>
        </div>

        {teamDrivers.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-white font-display tracking-wide mb-4 relative z-10">Riders</h2>
            <div className="grid gap-3 sm:grid-cols-2 mb-8 relative z-10">
              {teamDrivers.map((d) => {
                const rs = riderStandings.find((s) => s.rider.id === d.id)
                return (
                  <Link
                    key={d.id}
                    href={`/motogp/riders/${d.id}`}
                    className="flex items-center gap-3 p-4 rounded-xl bg-pit border border-asphalt hover:border-scarlet/30 transition-all group"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold font-display shadow-lg flex-shrink-0"
                      style={{
                        backgroundColor: color,
                        color: getMotoNumberColor(color),
                      }}
                    >
                      {d.current_career_step?.number}
                    </div>
                    <div>
                      <p className="text-white font-semibold group-hover:text-scarlet transition-colors">
                        {d.name} {d.surname}
                      </p>
                      <p className="text-xs text-silver">{d.country?.name}</p>
                    </div>
                    {rs && (
                      <div className="ml-auto text-right">
                        <p className="font-mono font-bold text-white">{rs.points}</p>
                        <p className="text-xs text-silver">pts</p>
                      </div>
                    )}
                  </Link>
                )
              })}
            </div>
          </>
        )}

        {insights && (
          <>
            <MotoTeamCarBlueprint teamColor={color} teamName={team.name} className="mb-8 relative z-10" />
            <h2 className="text-xl font-bold text-white font-display tracking-wide mb-4 relative z-10">Team Insights</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8 relative z-10">
              <div className="bg-pit border border-asphalt rounded-xl p-3">
                <p className="text-[10px] text-silver uppercase tracking-wider mb-1">Team Principal</p>
                <p className="text-sm font-semibold text-white">{insights.principal}</p>
              </div>
              <div className="bg-pit border border-asphalt rounded-xl p-3">
                <p className="text-[10px] text-silver uppercase tracking-wider mb-1">Engine</p>
                <p className="text-sm font-semibold text-white">{insights.engine}</p>
              </div>
              <div className="bg-pit border border-asphalt rounded-xl p-3">
                <p className="text-[10px] text-silver uppercase tracking-wider mb-1">Bike</p>
                <p className="text-sm font-semibold text-white">{insights.bike}</p>
              </div>
              <div className="bg-pit border border-asphalt rounded-xl p-3">
                <p className="text-[10px] text-silver uppercase tracking-wider mb-1">Base</p>
                <p className="text-sm font-semibold text-white">{insights.base}</p>
              </div>
              <div className="bg-pit border border-asphalt rounded-xl p-3">
                <p className="text-[10px] text-silver uppercase tracking-wider mb-1">Founded</p>
                <p className="text-sm font-semibold text-white">{insights.founded}</p>
              </div>
              <div className="bg-pit border border-asphalt rounded-xl p-3">
                <p className="text-[10px] text-silver uppercase tracking-wider mb-1">Titles</p>
                <p className="text-sm font-semibold text-white">{insights.titles}</p>
              </div>
            </div>
          </>
        )}

        {validResults.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-white font-display tracking-wide mb-4 relative z-10">
              Season Results ({validResults.length})
            </h2>
            <div className="overflow-y-auto max-h-[600px] rounded-xl border border-asphalt bg-pit relative z-10">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-asphalt bg-carbon">
                    <th className="py-2 px-3 text-xs text-silver uppercase text-left">Event</th>
                    <th className="py-2 px-3 text-xs text-silver uppercase text-left">Rider</th>
                    <th className="py-2 px-3 text-xs text-silver uppercase text-right">Pos</th>
                    <th className="py-2 px-3 text-xs text-silver uppercase text-right">Pts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-asphalt/50">
                  {validResults.map((r) =>
                    r.entries.map((entry) => (
                      <tr key={`${r.event.id}-${entry.rider.id}`} className="hover:bg-carbon/50 transition-colors">
                        <td className="py-2 px-3">
                          <Link
                            href={`/motogp/race/${r.round}`}
                            className="text-white text-sm hover:text-scarlet transition-colors"
                          >
                            {r.event.short_name || r.event.name}
                          </Link>
                        </td>
                        <td className="py-2 px-3">
                          <Link
                            href={`/motogp/riders/${entry.rider.riders_id}`}
                            className="text-sm text-silver hover:text-white transition-colors"
                          >
                            {entry.rider.full_name}
                          </Link>
                        </td>
                        <td className="py-2 px-3 text-right">
                          <span className={`font-mono text-sm font-bold ${entry.position === 1 ? "text-gold" : "text-silver"}`}>
                            P{entry.position}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right font-mono text-sm text-white">
                          {entry.points}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { id } = await params
  return (
    <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-8"><MotoHeroSkeleton /></div>}>
      <TeamContent id={id} />
    </Suspense>
  )
}
