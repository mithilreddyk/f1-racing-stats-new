"use client"

import { useState, useEffect } from "react"
import type { Race } from "@/types/f1"
import { getCountryFlag } from "@/lib/teamColors"
import { formatDate } from "@/lib/utils"
import { getCountdown } from "@/lib/utils"
import GlossaryTooltip from "@/components/ui/GlossaryTooltip"
import Link from "next/link"

function LiveCountdown({ dateStr }: { dateStr: string }) {
  const [countdown, setCountdown] = useState(() => getCountdown(dateStr))

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown(dateStr))
    }, 1000)
    return () => clearInterval(timer)
  }, [dateStr])

  if (countdown.isPast) {
    return <p className="text-scarlet font-bold">Race complete!</p>
  }

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
      {[
        { label: "Days", value: countdown.days },
        { label: "Hrs", value: countdown.hours },
        { label: "Min", value: countdown.minutes },
        { label: "Sec", value: countdown.seconds },
      ].map((unit) => (
        <div
          key={unit.label}
          className="bg-pit rounded-lg sm:rounded-xl border border-asphalt p-2 sm:p-3 text-center"
        >
          <p className="text-2xl sm:text-4xl font-bold font-mono text-white">
            {String(unit.value).padStart(2, "0")}
          </p>
          <p className="text-[9px] sm:text-[10px] text-silver uppercase tracking-widest mt-0.5 sm:mt-1">
            {unit.label}
          </p>
        </div>
      ))}
    </div>
  )
}

interface HeroRaceProps {
  nextRace: Race | null
  totalRaces: number
}

export default function HeroRace({ nextRace, totalRaces }: HeroRaceProps) {
  if (!nextRace) {
    return (
      <section className="relative overflow-hidden rounded-2xl border border-asphalt bg-gradient-to-br from-pit to-carbon p-8 sm:p-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white font-display tracking-wide mb-4">
          Welcome to{" "}
          <span className="text-scarlet">PIT WALL</span>
        </h1>
        <p className="text-silver text-lg max-w-2xl mx-auto">
          Your beginner-friendly guide to Formula 1. Track standings,
          explore the calendar, and learn the sport — no jargon required.
        </p>
      </section>
    )
  }

  const flag = getCountryFlag(nextRace.Circuit.Location.country)

  return (
    <section className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-scarlet/20 bg-gradient-to-br from-pit via-carbon to-pit p-5 sm:p-12">
      <div className="absolute top-0 right-0 w-64 h-64 bg-scarlet/5 rounded-full blur-3xl -mr-20 -mt-20" />
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-scarlet text-sm font-semibold uppercase tracking-widest">
            Next Race
          </span>
          <GlossaryTooltip term="Grand Prix" />
        </div>
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-3xl">{flag}</span>
          <h1 className="text-xl sm:text-4xl font-bold text-white font-display tracking-wide">
            {nextRace.raceName}
          </h1>
        </div>
        <p className="text-silver text-center mb-2">
          {nextRace.Circuit.circuitName} &middot;{" "}
          {nextRace.Circuit.Location.locality},{" "}
          {nextRace.Circuit.Location.country}
        </p>
        <p className="text-silver/60 text-sm text-center mb-8">
          {formatDate(nextRace.date)}
        </p>
        <LiveCountdown dateStr={nextRace.date} />
        <div className="mt-6 flex justify-center gap-4 text-xs text-silver">
          <span>Round {nextRace.round} of {totalRaces}</span>
          <span className="text-asphalt">|</span>
          <Link
            href={`/race/${nextRace.round}`}
            className="text-scarlet hover:underline"
          >
            Race details
          </Link>
        </div>
      </div>
    </section>
  )
}
