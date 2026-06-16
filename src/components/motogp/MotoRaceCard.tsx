"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import type { MotoEvent } from "@/types/motogp"
import { getMotoCountryFlagFromIso } from "@/lib/motoColors"
import { formatDate, getCountdown } from "@/lib/utils"

interface MotoRaceCardProps {
  event: MotoEvent
  round: number
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

export default function MotoRaceCard({ event, round, isNext = false }: MotoRaceCardProps) {
  const eventDate = new Date(event.date_start)
  const isPast = event.status === "FINISHED"
  const flag = getMotoCountryFlagFromIso(event.country?.iso ?? "")

  return (
    <Link href={`/motogp/race/${round}`}>
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
                R{round}
              </span>
            </div>
            <h3 className="font-semibold text-white text-lg truncate group-hover:text-scarlet transition-colors">
              {event.sponsored_name || event.name}
            </h3>
            <p className="text-sm text-silver hover:text-white transition-colors">
              {event.circuit?.name}
            </p>
            <p className="text-xs text-silver/60 mt-1">
              {event.circuit?.place}, {event.circuit?.nation}
            </p>
            <p className="text-xs text-silver/60 mt-0.5">
              {formatDate(event.date_start)}
            </p>
          </div>
          <div className="flex-shrink-0">
            {!isPast && <Countdown dateStr={event.date_start} />}
          </div>
        </div>
      </div>
    </Link>
  )
}
