import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { getDriverStandings } from "@/lib/ergast"
import { getTeamColor, getCountryFlag } from "@/lib/teamColors"
import TeamColorBar from "@/components/ui/TeamColorBar"
import GlossaryTooltip from "@/components/ui/GlossaryTooltip"
import { DriverStandingsSkeleton } from "@/components/ui/Skeleton"

export const metadata: Metadata = {
  title: "Driver Standings",
  description:
    "Full Formula 1 driver championship standings for the current season — positions, points, and wins explained.",
}

async function DriversContent() {
  const standings = await getDriverStandings()

  if (!standings || standings.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-white font-display tracking-wide mb-4">
          Driver Standings
        </h1>
        <p className="text-silver">
          Couldn&apos;t load driver standings — try refreshing.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-display tracking-wide">
          Driver Standings
        </h1>
        <GlossaryTooltip term="WDC">
          <p className="text-silver text-sm mt-1">
            World Drivers&apos; Championship — current season
          </p>
        </GlossaryTooltip>
      </div>

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
                Nationality
              </th>
              <th className="text-left py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold hidden md:table-cell">
                Team
              </th>
              <th className="text-right py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold">
                <GlossaryTooltip term="Points">Points</GlossaryTooltip>
              </th>
              <th className="text-right py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold">
                <GlossaryTooltip term="Pole">Wins</GlossaryTooltip>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-asphalt/50">
            {standings.map((driver) => {
              const position = parseInt(driver.position, 10)
              const isP1 = position === 1
              const teamColor = getTeamColor(
                driver.Constructors[0]?.name ?? ""
              )
              const flag = getCountryFlag(driver.Driver.nationality)

              return (
                <tr
                  key={driver.Driver.driverId}
                  className={`group transition-colors hover:bg-carbon/50 ${
                    isP1 ? "bg-gold/[0.02]" : ""
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <TeamColorBar
                        color={teamColor}
                        position={position}
                        className="h-8"
                      />
                      <span
                        className={`font-mono text-sm font-bold w-6 ${
                          isP1 ? "text-gold" : "text-white"
                        }`}
                      >
                        {driver.position}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{flag}</span>
                      <Link
                        href={`/drivers/${driver.Driver.driverId}`}
                        className={`font-semibold hover:text-scarlet transition-colors ${
                          isP1 ? "text-gold drop-shadow-[0_0_4px_rgba(255,215,0,0.3)]" : "text-white"
                        }`}
                      >
                        {driver.Driver.givenName}{" "}
                        {driver.Driver.familyName}
                      </Link>
                      {isP1 && (
                        <span className="text-[10px] font-bold text-gold uppercase tracking-wider ml-1">
                          P1
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-silver hidden sm:table-cell">
                    {driver.Driver.nationality}
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <span
                      className="text-sm"
                      style={{ color: teamColor }}
                    >
                      {driver.Constructors[0]?.name}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-mono font-bold text-white">
                      {driver.points}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-mono text-sm text-silver">
                      {driver.wins}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-xl border border-asphalt bg-pit p-4">
        <GlossaryTooltip term="Points">
          <p className="text-xs text-silver leading-relaxed">
            <span className="text-white font-semibold">How points work:</span>{" "}
            Only the top 10 finishers score. 1st gets 25 points, 2nd gets 18,
            3rd gets 15, then 12-10-8-6-4-2-1. The driver with the fastest
            lap gets an extra point if they finish in the top 10.
          </p>
        </GlossaryTooltip>
      </div>
    </div>
  )
}

export default function DriversPage() {
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
      <DriversContent />
    </Suspense>
  )
}
