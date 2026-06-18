import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { getConstructorStandings } from "@/lib/ergast"
import TeamCard from "@/components/cards/TeamCard"
import GlossaryTooltip from "@/components/ui/GlossaryTooltip"
import { DriverStandingsSkeleton } from "@/components/ui/Skeleton"

export const metadata: Metadata = {
  title: "Constructor Standings",
  description:
    "Full Formula 1 constructor (team) championship standings — points, wins, and team info.",
}

async function ConstructorsContent() {
  const standings = await getConstructorStandings()

  if (!standings || standings.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-white font-display tracking-wide mb-4">
          Constructor Standings
        </h1>
        <p className="text-silver">
          Couldn&apos;t load constructor standings — try refreshing.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-display tracking-wide">
          Constructor Standings
        </h1>
        <GlossaryTooltip term="Constructor">
          <p className="text-silver text-sm mt-1">
            World Constructors&apos; Championship — team standings for the
            current season
          </p>
        </GlossaryTooltip>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {standings.map((team) => (
          <TeamCard
            key={team.Constructor.constructorId}
            team={team}
            position={parseInt(team.position, 10)}
          />
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-asphalt bg-pit p-4">
        <GlossaryTooltip term="Constructor">
          <p className="text-xs text-silver leading-relaxed">
            <span className="text-white font-semibold">
              What is a Constructor?
            </span>{" "}
            In Formula 1, the &ldquo;constructor&rdquo; is the team that
            designs and builds the car. Teams score points from both of their
            drivers, and the constructor with the most points wins the World
            Constructors&apos; Championship (WCC).
          </p>
        </GlossaryTooltip>
      </div>
    </div>
  )
}

export default function ConstructorsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="h-8 w-64 bg-asphalt/50 rounded animate-pulse" />
            <div className="h-4 w-48 bg-asphalt/50 rounded animate-pulse mt-2" />
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
      <ConstructorsContent />
    </Suspense>
  )
}
