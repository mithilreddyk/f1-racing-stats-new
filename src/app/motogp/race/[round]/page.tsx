import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getMotoRaceResult, getMotoSprintResult, getMotoQualifyingResult, getMotoEvents } from "@/lib/motogp"
import { getMotoTeamColor, getMotoCountryFlagFromIso } from "@/lib/motoColors"
import { MotoHeroSkeleton } from "@/components/motogp/MotoSkeleton"

interface RacePageProps {
  params: Promise<{ round: string }>
}

export async function generateMetadata({ params }: RacePageProps): Promise<Metadata> {
  const { round } = await params
  const data = await getMotoRaceResult(parseInt(round, 10))
  return {
    title: data ? `${data.event.name}` : "Race Result",
  }
}

async function RaceContent({ round }: { round: string }) {
  const roundNum = parseInt(round, 10)
  const [raceData, sprintData, qualifyingData] = await Promise.all([
    getMotoRaceResult(roundNum),
    getMotoSprintResult(roundNum),
    getMotoQualifyingResult(roundNum),
  ])

  if (!raceData) notFound()

  const { event, session, result } = raceData
  const classification = result.classification ?? []
  const flag = getMotoCountryFlagFromIso(event.country?.iso ?? "")

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-2 text-sm text-silver mb-4">
        <Link href="/motogp/race" className="hover:text-white transition-colors">
          Race Results
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">{flag}</span>
          <h1 className="text-3xl font-bold text-white font-display tracking-wide">
            {event.name}
          </h1>
        </div>
        <p className="text-silver">
          {event.circuit?.name} &middot; {event.country?.name}
        </p>
        <div className="flex items-center gap-3 text-sm text-silver/60 mt-1">
          <span>Round {roundNum}</span>
          {qualifyingData && (
            <>
              <span className="text-asphalt">|</span>
              <Link
                href={`/motogp/race/${round}/qualifying`}
                className="text-scarlet hover:underline"
              >
                Qualifying Results
              </Link>
            </>
          )}
        </div>
        {session.condition && (
          <div className="flex items-center gap-4 text-xs text-silver/60 mt-2">
            <span>Track: {session.condition.track}°C</span>
            <span>Air: {session.condition.air}°C</span>
            {session.condition.humidity && <span>Humidity: {session.condition.humidity}%</span>}
            {session.condition.weather && <span>Weather: {session.condition.weather}</span>}
          </div>
        )}
      </div>

      {classification.length === 0 ? (
        <div className="rounded-xl border border-asphalt bg-pit p-12 text-center">
          <p className="text-silver text-lg">No results yet for this race</p>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-bold text-white font-display tracking-wide mb-3">Race Classification</h2>
          <div className="overflow-hidden rounded-xl border border-asphalt bg-pit mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b border-asphalt bg-carbon">
                  <th className="text-left py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold w-12">Pos</th>
                  <th className="text-left py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold">Rider</th>
                  <th className="text-left py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold hidden sm:table-cell">Team</th>
                  <th className="text-right py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold hidden md:table-cell">Time / Gap</th>
                  <th className="text-right py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold">Pts</th>
                  <th className="text-right py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold hidden sm:table-cell">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-asphalt/50">
                {classification.map((entry) => {
                  const pos = entry.position
                  const isP1 = pos === 1
                  const teamColor = getMotoTeamColor(entry.team?.name ?? "")
                  return (
                    <tr
                      key={entry.rider.id}
                      className={`group transition-colors hover:bg-carbon/50 ${isP1 ? "bg-gold/[0.02]" : ""}`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-1 h-8 rounded-full flex-shrink-0"
                            style={{ backgroundColor: teamColor }}
                          />
                          <span className={`font-mono text-sm font-bold ${isP1 ? "text-gold" : "text-white"}`}>
                            {pos}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          href={`/motogp/riders/${entry.rider.riders_id}`}
                          className="font-semibold text-white hover:text-scarlet transition-colors"
                        >
                          {entry.rider.full_name}
                        </Link>
                      </td>
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <span className="text-sm" style={{ color: teamColor }}>
                          {entry.team?.name ?? ""}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right hidden md:table-cell">
                        <span className="font-mono text-sm text-silver">
                          {entry.time ?? entry.gap?.first ?? entry.status ?? ""}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="font-mono font-bold text-white">
                          +{entry.points}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right hidden sm:table-cell">
                        <span className="text-xs text-silver/80">
                          {entry.status ?? ""}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {sprintData && sprintData.result.classification.length > 0 && (
        <>
          <h2 className="text-lg font-bold text-white font-display tracking-wide mb-3">Sprint Race</h2>
          <div className="overflow-hidden rounded-xl border border-asphalt bg-pit mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b border-asphalt bg-carbon">
                  <th className="text-left py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold w-12">Pos</th>
                  <th className="text-left py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold">Rider</th>
                  <th className="text-left py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold hidden sm:table-cell">Team</th>
                  <th className="text-right py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold">Pts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-asphalt/50">
                {sprintData.result.classification.map((entry) => {
                  const teamColor = getMotoTeamColor(entry.team?.name ?? "")
                  return (
                    <tr key={entry.rider.id} className="group transition-colors hover:bg-carbon/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-1 h-8 rounded-full flex-shrink-0"
                            style={{ backgroundColor: teamColor }}
                          />
                          <span className="font-mono text-sm font-bold text-white">{entry.position}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          href={`/motogp/riders/${entry.rider.riders_id}`}
                          className="font-semibold text-white hover:text-scarlet transition-colors"
                        >
                          {entry.rider.full_name}
                        </Link>
                      </td>
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <span className="text-sm" style={{ color: teamColor }}>
                          {entry.team?.name ?? ""}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="font-mono font-bold text-white">+{entry.points}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default async function RacePage({ params }: RacePageProps) {
  const { round } = await params
  return (
    <Suspense
      fallback={
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <MotoHeroSkeleton />
        </div>
      }
    >
      <RaceContent round={round} />
    </Suspense>
  )
}
