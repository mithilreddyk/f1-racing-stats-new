"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import type { Race } from "@/types/f1"
import { getCountryFlag } from "@/lib/teamColors"
import { formatDate } from "@/lib/utils"
import { getCountdown } from "@/lib/utils"

interface RaceCardProps {
  race: Race
  isNext?: boolean
}

function Countdown({ dateStr }: { dateStr: string }) {
  const [countdown, setCountdown] = useState(() => getCountdown(dateStr))

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown(dateStr))
    }, 1000)
    return () => clearInterval(timer)
  }, [dateStr])

  if (countdown.isPast) return null

  return (
    <div className="flex gap-3 text-center">
      <div className="bg-carbon rounded-lg px-2 py-1 min-w-[48px]">
        <p className="text-lg font-bold font-mono text-white">{countdown.days}</p>
        <p className="text-[10px] text-silver uppercase tracking-wider">Days</p>
      </div>
      <div className="bg-carbon rounded-lg px-2 py-1 min-w-[48px]">
        <p className="text-lg font-bold font-mono text-white">{countdown.hours}</p>
        <p className="text-[10px] text-silver uppercase tracking-wider">Hrs</p>
      </div>
      <div className="bg-carbon rounded-lg px-2 py-1 min-w-[48px]">
        <p className="text-lg font-bold font-mono text-white">{countdown.minutes}</p>
        <p className="text-[10px] text-silver uppercase tracking-wider">Min</p>
      </div>
      <div className="bg-carbon rounded-lg px-2 py-1 min-w-[48px]">
        <p className="text-lg font-bold font-mono text-white">{countdown.seconds}</p>
        <p className="text-[10px] text-silver uppercase tracking-wider">Sec</p>
      </div>
    </div>
  )
}

export default function RaceCard({ race, isNext = false }: RaceCardProps) {
  const raceDate = new Date(`${race.date}T${race.time ?? "00:00:00Z"}`)
  const isPast = raceDate < new Date()
  const flag = getCountryFlag(race.Circuit.Location.country)

  return (
    <Link href={`/race/${race.round}`}>
      <div
        className={`group relative rounded-xl border bg-pit p-5 transition-all duration-300 hover:scale-[1.01] ${
          isNext
            ? "border-scarlet/50 shadow-[0_0_15px_rgba(232,0,45,0.15)]"
            : isPast
              ? "border-asphalt hover:border-silver/30"
              : "border-asphalt hover:border-scarlet/30"
        }`}
      >
        {isNext && (
          <div className="absolute -top-[1px] -right-[1px] bg-scarlet text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-bl-lg rounded-tr-xl">
            Next Race
          </div>
        )}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{flag}</span>
              <span className="text-xs text-silver font-mono">
                R{race.round}
              </span>
            </div>
            <h3 className="font-semibold text-white text-lg truncate group-hover:text-scarlet transition-colors">
              {race.raceName}
            </h3>
            <Link
              href={`/circuits/${race.Circuit.circuitId}`}
              className="text-sm text-silver hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {race.Circuit.circuitName}
            </Link>
            <p className="text-xs text-silver/60 mt-1">
              {race.Circuit.Location.locality},{" "}
              {race.Circuit.Location.country}
            </p>
            <p className="text-xs text-silver/60 mt-0.5">
              {formatDate(race.date)}
            </p>
            {isPast && race.Results?.[0] && (
              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className="text-gold font-semibold">Winner:</span>
                <span className="text-white">
                  {race.Results[0].Driver.givenName}{" "}
                  {race.Results[0].Driver.familyName}
                </span>
              </div>
            )}
          </div>
          <div className="flex-shrink-0">
            {!isPast && <Countdown dateStr={race.date} />}
          </div>
        </div>
      </div>
    </Link>
  )
}
