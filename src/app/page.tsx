import { Suspense } from "react"
import Link from "next/link"
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
      <HeroRace nextRace={nextRace} totalRaces={totalRaces} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <div className="rounded-xl border border-asphalt bg-pit p-3 sm:p-4 text-center">
          <p className="text-xl sm:text-2xl font-bold font-mono text-white">{totalRaces}</p>
          <GlossaryTooltip term="Grand Prix">
            <p className="text-[11px] text-silver mt-0.5">Races this season</p>
          </GlossaryTooltip>
        </div>
        <div className="rounded-xl border border-asphalt bg-pit p-3 sm:p-4 text-center">
          <p className="text-xl sm:text-2xl font-bold font-mono text-white">{racesLeft}</p>
          <p className="text-[11px] text-silver mt-0.5">Remaining</p>
        </div>
        <div className="rounded-xl border border-asphalt bg-pit p-3 sm:p-4 text-center">
          <p className="text-xl sm:text-2xl font-bold font-mono text-white">
            {currentLeader?.points ?? 0}
          </p>
          <GlossaryTooltip term="WDC">
            <p className="text-[11px] text-silver mt-0.5">WDC leader pts</p>
          </GlossaryTooltip>
        </div>
        <div className="rounded-xl border border-asphalt bg-pit p-3 sm:p-4 text-center">
          <p className="text-xl sm:text-2xl font-bold font-mono text-white">
            {currentLeader?.wins ?? 0}
          </p>
          <p className="text-[11px] text-silver mt-0.5">
            {currentLeader
              ? `${currentLeader.Driver.familyName} wins`
              : "Leader wins"}
          </p>
        </div>
      </div>

      <StandingsPreview drivers={drivers} constructors={constructors} />

      <LastRaceResult
        race={lastRace?.race ?? null}
        results={lastRace?.results ?? null}
      />

      {/* MotoGP crosslink */}
      <Link href="/motogp">
        <div className="rounded-xl border border-[#7B2D8E]/20 bg-gradient-to-r from-[#7B2D8E]/10 to-transparent p-4 sm:p-5 flex items-center justify-between hover:border-[#7B2D8E]/40 transition-all group">
          <div>
            <p className="text-sm font-bold text-white group-hover:text-[#7B2D8E] transition-colors">
              Explore MotoGP
            </p>
            <p className="text-xs text-silver/60 mt-0.5">Rider standings, teams &amp; manufacturers</p>
          </div>
          <span className="text-silver/40 text-lg group-hover:translate-x-1 transition-transform">&rarr;</span>
        </div>
      </Link>

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
          <HeroSkeleton />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 sm:h-24 rounded-xl bg-pit border border-asphalt animate-pulse" />
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
