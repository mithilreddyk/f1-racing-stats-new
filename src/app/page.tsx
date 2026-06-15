import { Suspense } from "react"
import {
  getDriverStandings,
  getConstructorStandings,
  getLastRaceResult,
  getNextRace,
  getRaceCount,
} from "@/lib/ergast"
import HeroRace from "@/components/sections/HeroRace"
import StandingsPreview from "@/components/sections/StandingsPreview"
import LastRaceResult from "@/components/sections/LastRaceResult"
import PointsCalculator from "@/components/ui/PointsCalculator"
import GlossaryTooltip from "@/components/ui/GlossaryTooltip"
import { HeroSkeleton, DriverStandingsSkeleton } from "@/components/ui/Skeleton"

async function HomeContent() {
  const [drivers, constructors, lastRace, nextRace, totalRaces] =
    await Promise.all([
      getDriverStandings(),
      getConstructorStandings(),
      getLastRaceResult(),
      getNextRace(),
      getRaceCount(),
    ])

  const currentLeader = drivers?.[0]
  const lastRound = lastRace ? parseInt(lastRace.race.round, 10) : 0
  const racesLeft = totalRaces - lastRound

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <HeroRace nextRace={nextRace} totalRaces={totalRaces} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-asphalt bg-pit p-4 text-center">
          <p className="text-2xl font-bold font-mono text-white">{totalRaces}</p>
          <GlossaryTooltip term="Grand Prix">
            <p className="text-xs text-silver mt-1">Races this season</p>
          </GlossaryTooltip>
        </div>
        <div className="rounded-xl border border-asphalt bg-pit p-4 text-center">
          <p className="text-2xl font-bold font-mono text-white">{racesLeft}</p>
          <p className="text-xs text-silver mt-1">Races remaining</p>
        </div>
        <div className="rounded-xl border border-asphalt bg-pit p-4 text-center">
          <p className="text-2xl font-bold font-mono text-white">
            {currentLeader?.points ?? 0}
          </p>
          <GlossaryTooltip term="WDC">
            <p className="text-xs text-silver mt-1">WDC leader points</p>
          </GlossaryTooltip>
        </div>
        <div className="rounded-xl border border-asphalt bg-pit p-4 text-center">
          <p className="text-2xl font-bold font-mono text-white">
            {currentLeader?.wins ?? 0}
          </p>
          <p className="text-xs text-silver mt-1">
            {currentLeader
              ? `${currentLeader.Driver.familyName} wins`
              : "Wins by leader"}
          </p>
        </div>
      </div>

      <StandingsPreview drivers={drivers} constructors={constructors} />

      <LastRaceResult
        race={lastRace?.race ?? null}
        results={lastRace?.results ?? null}
      />

      {drivers && drivers.length > 1 && (
        <div className="max-w-xs">
          <PointsCalculator
            driverStandings={drivers.map((d) => ({
              position: d.position,
              driverName: `${d.Driver.givenName} ${d.Driver.familyName}`,
              points: parseInt(d.points, 10),
            }))}
            racesRemaining={racesLeft}
          />
        </div>
      )}
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
          <HeroSkeleton />
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 rounded-xl bg-pit border border-asphalt animate-pulse" />
            ))}
          </div>
          <DriverStandingsSkeleton />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  )
}
