import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { getMotoStandings, getMotoRiders } from "@/lib/motogp"
import { getMotoTeamColor, getMotoCountryFlagFromIso } from "@/lib/motoColors"
import TeamColorBar from "@/components/ui/TeamColorBar"
import { MotoStandingsSkeleton } from "@/components/motogp/MotoSkeleton"

export const metadata: Metadata = {
  title: "MotoGP Riders",
}

async function MotoRidersContent() {
  const [standings, riders] = await Promise.all([
    getMotoStandings(),
    getMotoRiders(),
  ])

  if (!standings || standings.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-white font-display tracking-wide mb-4">
          MotoGP Riders
        </h1>
        <p className="text-silver">
          Couldn&apos;t load rider standings — try refreshing.
        </p>
      </div>
    )
  }

  const riderMap = new Map(riders.map((r) => [r.id, r]))

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-display tracking-wide">
          MotoGP Riders
        </h1>
        <p className="text-silver text-sm mt-1">
          Rider standings — current season
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-asphalt bg-pit">
        <table className="w-full">
          <thead>
            <tr className="border-b border-asphalt bg-carbon">
              <th className="text-left py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold w-12">Pos</th>
              <th className="text-left py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold w-12">#</th>
              <th className="text-left py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold">Rider</th>
              <th className="text-left py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold hidden sm:table-cell">Country</th>
              <th className="text-left py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold hidden md:table-cell">Team</th>
              <th className="text-right py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold">Points</th>
              <th className="text-right py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold">Wins</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-asphalt/50">
            {standings.map((entry) => {
              const position = entry.position
              const isP1 = position === 1
              const teamColor = getMotoTeamColor(entry.team?.name ?? "")
              const riderDetail = riderMap.get(entry.rider.riders_id)
              const riderNumber = riderDetail?.current_career_step?.number ?? entry.rider.number
              const flag = getMotoCountryFlagFromIso(entry.rider.country?.iso ?? "")

              return (
                <tr
                  key={entry.id}
                  className={`group transition-colors hover:bg-carbon/50 ${isP1 ? "bg-gold/[0.02]" : ""}`}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <TeamColorBar
                        color={teamColor}
                        position={position}
                        className="h-8"
                      />
                      <span className={`font-mono text-sm font-bold w-6 ${isP1 ? "text-gold" : "text-white"}`}>
                        {entry.position}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-sm text-silver">{riderNumber}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{flag}</span>
                      <Link
                        href={`/motogp/riders/${entry.rider.riders_id}`}
                        className={`font-semibold hover:text-scarlet transition-colors ${
                          isP1 ? "text-gold drop-shadow-[0_0_4px_rgba(255,215,0,0.3)]" : "text-white"
                        }`}
                      >
                        {entry.rider.full_name}
                      </Link>
                      {isP1 && (
                        <span className="text-[10px] font-bold text-gold uppercase tracking-wider ml-1">
                          P1
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-silver hidden sm:table-cell">
                    {entry.rider.country?.name ?? ""}
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <span className="text-sm" style={{ color: teamColor }}>
                      {entry.team?.name ?? ""}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-mono font-bold text-white">
                      {entry.points}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-mono text-sm text-silver">
                      {entry.race_wins}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function MotoRidersPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="h-8 w-64 bg-asphalt/50 rounded animate-pulse" />
            <div className="h-4 w-48 bg-asphalt/50 rounded animate-pulse mt-2" />
          </div>
          <MotoStandingsSkeleton />
        </div>
      }
    >
      <MotoRidersContent />
    </Suspense>
  )
}
