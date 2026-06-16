import { Suspense } from "react"
import {
  getMotoStandings,
  getLastMotoRace,
  getNextMotoRace,
  getMotoEvents,
} from "@/lib/motogp"
import MotoHeroRace from "@/components/motogp/MotoHeroRace"
import MotoStandingsPreview from "@/components/motogp/MotoStandingsPreview"
import MotoLastRaceResult from "@/components/motogp/MotoLastRaceResult"
import { MotoHeroSkeleton } from "@/components/motogp/MotoSkeleton"

async function MotoHomeContent() {
  const [standings, lastRace, nextRace, events] = await Promise.all([
    getMotoStandings(),
    getLastMotoRace(),
    getNextMotoRace(),
    getMotoEvents(),
  ])

  const totalEvents = events.length
  const finishedEvents = events.filter((e) => e.status === "FINISHED").length
  const eventsRemaining = totalEvents - finishedEvents
  const leader = standings?.[0]
  const lastRound = lastRace
    ? events.findIndex((e) => e.id === lastRace.event.id) + 1
    : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <MotoHeroRace nextRace={nextRace} totalRaces={totalEvents} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-asphalt bg-pit p-4 text-center">
          <p className="text-2xl font-bold font-mono text-white">{totalEvents}</p>
          <p className="text-xs text-silver mt-1">Total events</p>
        </div>
        <div className="rounded-xl border border-asphalt bg-pit p-4 text-center">
          <p className="text-2xl font-bold font-mono text-white">{eventsRemaining}</p>
          <p className="text-xs text-silver mt-1">Events remaining</p>
        </div>
        <div className="rounded-xl border border-asphalt bg-pit p-4 text-center">
          <p className="text-2xl font-bold font-mono text-white">
            {leader?.points ?? 0}
          </p>
          <p className="text-xs text-silver mt-1">Leader points</p>
        </div>
        <div className="rounded-xl border border-asphalt bg-pit p-4 text-center">
          <p className="text-2xl font-bold font-mono text-white">
            {leader?.race_wins ?? 0}
          </p>
          <p className="text-xs text-silver mt-1">
            {leader ? `${leader.rider.full_name} wins` : "Wins by leader"}
          </p>
        </div>
      </div>

      <MotoStandingsPreview standings={standings} />

      <MotoLastRaceResult
        event={lastRace?.event ?? null}
        session={lastRace?.session ?? null}
        classification={lastRace?.result?.classification ?? null}
        round={lastRound}
      />
    </div>
  )
}

export default function MotoHomePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
          <MotoHeroSkeleton />
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 rounded-xl bg-pit border border-asphalt animate-pulse" />
            ))}
          </div>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-pit border border-asphalt animate-pulse" />
            ))}
          </div>
        </div>
      }
    >
      <MotoHomeContent />
    </Suspense>
  )
}
