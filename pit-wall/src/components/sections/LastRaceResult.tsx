import type { Race, RaceResult } from "@/types/f1"
import { getTeamColor, getCountryFlag } from "@/lib/teamColors"
import { formatDate, getStatusDisplay } from "@/lib/utils"
import GlossaryTooltip from "@/components/ui/GlossaryTooltip"
import Link from "next/link"

interface LastRaceResultProps {
  race: Race | null
  results: RaceResult[] | null
}

export default function LastRaceResult({
  race,
  results,
}: LastRaceResultProps) {
  if (!race || !results) {
    return (
      <section className="rounded-xl border border-asphalt bg-pit p-6">
        <h2 className="text-xl font-bold text-white font-display tracking-wide mb-4">
          Last Race
        </h2>
        <p className="text-silver text-sm">
          No race results available yet this season.
        </p>
      </section>
    )
  }

  const podium = results.slice(0, 3)
  const flag = getCountryFlag(race.Circuit.Location.country)

  return (
    <section className="rounded-xl border border-asphalt bg-pit p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white font-display tracking-wide">
          Last Race
        </h2>
        <Link
          href={`/race/${race.round}`}
          className="text-sm text-scarlet hover:underline"
        >
          Full results
        </Link>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <span className="text-lg">{flag}</span>
        <div>
          <h3 className="font-semibold text-white">{race.raceName}</h3>
          <p className="text-xs text-silver">
            {formatDate(race.date)} &middot; Round {race.round}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {podium.map((result, index) => {
          const teamColor = getTeamColor(result.Constructor.name)
          const trophies = ["🥇", "🥈", "🥉"]
          const labels = ["1st Place", "2nd Place", "3rd Place"]

          return (
            <div
              key={result.Driver.driverId}
              className="flex items-center gap-3 p-3 rounded-lg bg-carbon border border-asphalt"
            >
              <span className="text-xl">{trophies[index]}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white">
                  {result.Driver.givenName} {result.Driver.familyName}
                </p>
                <p className="text-xs text-silver">{labels[index]}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono text-white font-bold">
                  +{result.points} pts
                </p>
                <GlossaryTooltip term="Points">
                  <p
                    className="text-xs"
                    style={{ color: teamColor }}
                  >
                    {result.Constructor.name}
                  </p>
                </GlossaryTooltip>
              </div>
            </div>
          )
        })}
      </div>

      <details className="mt-4">
        <summary className="text-sm text-silver hover:text-white cursor-pointer transition-colors">
          Full classification
        </summary>
        <div className="mt-3 space-y-1">
          {results.slice(3).map((result) => (
            <div
              key={result.Driver.driverId}
              className="flex items-center gap-3 px-3 py-2 text-sm"
            >
              <span className="w-6 text-center font-mono text-silver">
                {result.position}
              </span>
              <span className="flex-1 text-white">
                {result.Driver.familyName}
              </span>
              <span className="text-silver text-xs">
                {getStatusDisplay(result.status)}
              </span>
            </div>
          ))}
        </div>
      </details>
    </section>
  )
}
