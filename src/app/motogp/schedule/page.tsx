import { Suspense } from "react"
import type { Metadata } from "next"
import { getMotoEvents } from "@/lib/motogp"
import MotoRaceCard from "@/components/motogp/MotoRaceCard"
import { MotoHeroSkeleton } from "@/components/motogp/MotoSkeleton"

export const metadata: Metadata = {
  title: "MotoGP Schedule",
}

function findNextEventIndex(events: { status: string }[]): number {
  for (let i = 0; i < events.length; i++) {
    if (events[i].status !== "FINISHED") return i
  }
  return -1
}

async function MotoScheduleContent() {
  const events = await getMotoEvents()

  if (!events || events.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-white font-display tracking-wide mb-4">
          MotoGP Schedule
        </h1>
        <p className="text-silver">
          Couldn&apos;t load the schedule — try refreshing.
        </p>
      </div>
    )
  }

  const nextIndex = findNextEventIndex(events)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-display tracking-wide">
          MotoGP Schedule
        </h1>
        <p className="text-silver text-sm mt-1">
          Current season calendar — {events.length} events
        </p>
      </div>

      <div className="space-y-3">
        {events.map((event, index) => (
          <MotoRaceCard
            key={event.id}
            event={event}
            round={index + 1}
            isNext={index === nextIndex}
          />
        ))}
      </div>
    </div>
  )
}

export default function MotoSchedulePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="h-8 w-64 bg-asphalt/50 rounded animate-pulse" />
            <div className="h-4 w-48 bg-asphalt/50 rounded animate-pulse mt-2" />
          </div>
          <MotoHeroSkeleton />
        </div>
      }
    >
      <MotoScheduleContent />
    </Suspense>
  )
}
