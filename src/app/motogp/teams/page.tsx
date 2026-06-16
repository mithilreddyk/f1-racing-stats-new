import { Suspense } from "react"
import type { Metadata } from "next"
import { getMotoTeams } from "@/lib/motogp"
import MotoTeamCard from "@/components/motogp/MotoTeamCard"
import { MotoStandingsSkeleton } from "@/components/motogp/MotoSkeleton"

export const metadata: Metadata = {
  title: "MotoGP Teams",
}

async function MotoTeamsContent() {
  const teams = await getMotoTeams()

  if (!teams || teams.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-white font-display tracking-wide mb-4">
          MotoGP Teams
        </h1>
        <p className="text-silver">
          Couldn&apos;t load MotoGP teams — try refreshing.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-display tracking-wide">
          MotoGP Teams
        </h1>
        <p className="text-silver text-sm mt-1">
          Teams competing in the current season
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <MotoTeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  )
}

export default function MotoTeamsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="h-8 w-64 bg-asphalt/50 rounded animate-pulse" />
            <div className="h-4 w-48 bg-asphalt/50 rounded animate-pulse mt-2" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-xl bg-pit border border-asphalt animate-pulse"
              />
            ))}
          </div>
        </div>
      }
    >
      <MotoTeamsContent />
    </Suspense>
  )
}
