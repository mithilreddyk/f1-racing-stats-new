import { Suspense } from "react"
import type { Metadata } from "next"
import { getSchedule } from "@/lib/ergast"
import { getCountryFlag } from "@/lib/teamColors"
import RaceCard from "@/components/cards/RaceCard"
import GlossaryTooltip from "@/components/ui/GlossaryTooltip"
import { RaceCardSkeleton } from "@/components/ui/Skeleton"

export const metadata: Metadata = {
  title: "Race Schedule",
  description:
    "Full Formula 1 race calendar for the current season — dates, circuits, and countdowns.",
}

function findNextRaceIndex(races: { date: string; time?: string }[]): number {
  const now = new Date()
  for (let i = 0; i < races.length; i++) {
    const raceDate = new Date(
      `${races[i].date}T${races[i].time ?? "00:00:00Z"}`
    )
    if (raceDate > now) return i
  }
  return -1
}

async function ScheduleContent() {
  const schedule = await getSchedule()

  if (!schedule || schedule.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-white font-display tracking-wide mb-4">
          Race Schedule
        </h1>
        <p className="text-silver">
          Couldn&apos;t load the race schedule — try refreshing.
        </p>
      </div>
    )
  }

  const nextRaceIndex = findNextRaceIndex(schedule)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-display tracking-wide">
          Race Schedule
        </h1>
        <GlossaryTooltip term="Grand Prix">
          <p className="text-silver text-sm mt-1">
            Current season calendar — {schedule.length} races
          </p>
        </GlossaryTooltip>
      </div>

      <div className="space-y-3">
        {schedule.map((race, index) => (
          <RaceCard
            key={race.round}
            race={race}
            isNext={index === nextRaceIndex}
          />
        ))}
      </div>
    </div>
  )
}

export default function SchedulePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="h-8 w-64 bg-asphalt/50 rounded animate-pulse" />
            <div className="h-4 w-48 bg-asphalt/50 rounded animate-pulse mt-2" />
          </div>
          <RaceCardSkeleton />
        </div>
      }
    >
      <ScheduleContent />
    </Suspense>
  )
}
