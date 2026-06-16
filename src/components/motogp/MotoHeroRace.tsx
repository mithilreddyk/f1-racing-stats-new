"use client"

import { useState, useEffect } from "react"
import type { MotoEvent } from "@/types/motogp"
import { getMotoCountryFlagFromIso } from "@/lib/motoColors"
import { formatDate } from "@/lib/utils"
import { getCountdown } from "@/lib/utils"
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
    <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
      {[
        { label: "Days", value: countdown.days },
        { label: "Hours", value: countdown.hours },
        { label: "Mins", value: countdown.minutes },
        { label: "Secs", value: countdown.seconds },
      ].map((unit) => (
        <div
          key={unit.label}
          className="bg-pit rounded-xl border border-asphalt p-3 text-center"
        >
          <p className="text-3xl sm:text-4xl font-bold font-mono text-white">
            {String(unit.value).padStart(2, "0")}
          </p>
          <p className="text-[10px] text-silver uppercase tracking-widest mt-1">
            {unit.label}
          </p>
        </div>
      ))}
    </div>
  )
}

interface MotoHeroRaceProps {
  nextRace: MotoEvent | null
  totalRaces: number
}

export default function MotoHeroRace({ nextRace, totalRaces }: MotoHeroRaceProps) {
  if (!nextRace) {
    return (
      <section className="relative overflow-hidden rounded-2xl border border-asphalt bg-gradient-to-br from-pit to-carbon p-8 sm:p-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white font-display tracking-wide mb-4">
          Welcome to{" "}
          <span className="text-scarlet">PIT WALL</span>
        </h1>
        <p className="text-silver text-lg max-w-2xl mx-auto">
          Your beginner-friendly guide to MotoGP. Track standings,
          explore the calendar, and learn the sport — no jargon required.
        </p>
      </section>
    )
  }

  const flag = getMotoCountryFlagFromIso(nextRace.country?.iso ?? "")

  return (
    <section className="relative overflow-hidden rounded-2xl border border-scarlet/20 bg-gradient-to-br from-pit via-carbon to-pit p-8 sm:p-12">
      <div className="absolute top-0 right-0 w-64 h-64 bg-scarlet/5 rounded-full blur-3xl -mr-20 -mt-20" />
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-scarlet text-sm font-semibold uppercase tracking-widest">
            Next Race
          </span>
        </div>
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-3xl">{flag}</span>
          <h1 className="text-2xl sm:text-4xl font-bold text-white font-display tracking-wide">
            {nextRace.sponsored_name || nextRace.name}
          </h1>
        </div>
        <p className="text-silver text-center mb-2">
          {nextRace.circuit?.name} &middot;{" "}
          {nextRace.circuit?.place}, {nextRace.circuit?.nation}
        </p>
        <p className="text-silver/60 text-sm text-center mb-8">
          {formatDate(nextRace.date_start)}
        </p>
        <LiveCountdown dateStr={nextRace.date_start} />
        <div className="mt-6 flex justify-center gap-4 text-xs text-silver">
          <span>Round {totalRaces} of {totalRaces}</span>
          <span className="text-asphalt">|</span>
          <Link
            href="/motogp/schedule"
            className="text-scarlet hover:underline"
          >
            View schedule
          </Link>
        </div>
      </div>
    </section>
  )
}
