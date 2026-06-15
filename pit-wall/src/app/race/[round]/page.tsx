import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getSchedule, getRaceResult } from "@/lib/ergast"
import { getTeamColor, getCountryFlag } from "@/lib/teamColors"
import { formatDate, getStatusDisplay } from "@/lib/utils"
import GlossaryTooltip from "@/components/ui/GlossaryTooltip"
import { DriverStandingsSkeleton } from "@/components/ui/Skeleton"

interface RacePageProps {
  params: Promise<{ round: string }>
}

export async function generateMetadata({
  params,
}: RacePageProps): Promise<Metadata> {
  const { round } = await params
  const schedule = await getSchedule()
  const race = schedule?.find((r) => r.round === round)

  if (!race) {
    return { title: "Race Result" }
  }

  return {
    title: `${race.raceName} ${race.season}`,
    description: `Full results for the ${race.raceName} — positions, gaps, and status for every driver.`,
  }
}

async function RaceContent({ round }: { round: string }) {
  const schedule = await getSchedule()
  const raceMeta = schedule?.find((r) => r.round === round)

  if (!raceMeta) {
    notFound()
  }

  const data = await getRaceResult(raceMeta.season, round)
  const race = data?.race ?? raceMeta
  const results = data?.results ?? []

  const flag = getCountryFlag(race.Circuit.Location.country)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">{flag}</span>
          <h1 className="text-3xl font-bold text-white font-display tracking-wide">
            {race.raceName}
          </h1>
        </div>
        <p className="text-silver">
          {race.Circuit.circuitName} &middot;{" "}
          {race.Circuit.Location.locality},{" "}
          {race.Circuit.Location.country}
        </p>
        <p className="text-sm text-silver/60">
          {formatDate(race.date)} &middot; Round {race.round}
        </p>
      </div>

      {results.length === 0 ? (
        <div className="rounded-xl border border-asphalt bg-pit p-12 text-center">
          <p className="text-silver text-lg">
            No results yet for this race
          </p>
          <p className="text-silver/60 text-sm mt-2">
            Results will appear here once the race weekend is complete.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-asphalt bg-pit">
          <table className="w-full">
            <thead>
              <tr className="border-b border-asphalt bg-carbon">
                <th className="text-left py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold w-12">
                  Pos
                </th>
                <th className="text-left py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold">
                  Driver
                </th>
                <th className="text-left py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold hidden sm:table-cell">
                  Team
                </th>
                <th className="text-right py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold hidden md:table-cell">
                  <GlossaryTooltip term="Gap">Time / Gap</GlossaryTooltip>
                </th>
                <th className="text-right py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold">
                  <GlossaryTooltip term="Points">Pts</GlossaryTooltip>
                </th>
                <th className="text-right py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold hidden sm:table-cell">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-asphalt/50">
              {results.map((result, index) => {
                const position = parseInt(result.position, 10)
                const isP1 = position === 1
                const teamColor = getTeamColor(result.Constructor.name)
                const hasFastestLap = result.FastestLap?.rank === "1"

                return (
                  <tr
                    key={result.Driver.driverId}
                    className={`group transition-colors hover:bg-carbon/50 ${
                      isP1 ? "bg-gold/[0.02]" : ""
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-1 h-8 rounded-full flex-shrink-0"
                          style={{ backgroundColor: teamColor }}
                        />
                        <span
                          className={`font-mono text-sm font-bold ${
                            isP1 ? "text-gold" : "text-white"
                          }`}
                        >
                          {result.position}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">
                          {result.Driver.givenName} {result.Driver.familyName}
                        </span>
                        {hasFastestLap && (
                          <span className="text-[10px] font-bold bg-purple-600/20 text-purple-400 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                            <GlossaryTooltip term="Fastest Lap">
                              FL
                            </GlossaryTooltip>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <span
                        className="text-sm"
                        style={{ color: teamColor }}
                      >
                        {result.Constructor.name}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right hidden md:table-cell">
                      <span className="font-mono text-sm text-silver">
                        {result.Time?.time ?? getStatusDisplay(result.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-mono font-bold text-white">
                        +{result.points}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right hidden sm:table-cell">
                      <span className="text-xs text-silver/80">
                        {getStatusDisplay(result.status)}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 rounded-xl border border-asphalt bg-pit p-4 space-y-2">
        <GlossaryTooltip term="Gap">
          <p className="text-xs text-silver leading-relaxed">
            <span className="text-white font-semibold">What is &ldquo;Gap&rdquo;?</span>{" "}
            The gap shows how many seconds behind the leader (or the car ahead) a
            driver finished. A gap of +5.342s means they crossed the line 5.342
            seconds after the car in front.
          </p>
        </GlossaryTooltip>
        <GlossaryTooltip term="Fastest Lap">
          <p className="text-xs text-silver leading-relaxed">
            <span className="text-white font-semibold">Fastest Lap:</span>{" "}
            The driver who set the quickest single lap of the race earns a bonus
            championship point. Marked with a{" "}
            <span className="text-purple-400 font-semibold">purple FL badge</span>.
          </p>
        </GlossaryTooltip>
      </div>
    </div>
  )
}

export default async function RacePage({ params }: RacePageProps) {
  const { round } = await params
  return (
    <Suspense
      fallback={
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="h-8 w-64 bg-asphalt/50 rounded animate-pulse" />
            <div className="h-4 w-48 bg-asphalt/50 rounded animate-pulse mt-2" />
          </div>
          <DriverStandingsSkeleton />
        </div>
      }
    >
      <RaceContent round={round} />
    </Suspense>
  )
}
