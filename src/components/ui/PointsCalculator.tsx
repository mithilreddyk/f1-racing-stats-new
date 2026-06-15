"use client"

import { useState } from "react"
import { calculatePointsNeeded } from "@/lib/predictor"

interface PointsCalculatorProps {
  driverStandings: { position: string; driverName: string; points: number }[]
  racesRemaining: number
}

export default function PointsCalculator({
  driverStandings,
  racesRemaining,
}: PointsCalculatorProps) {
  const [selectedDriver, setSelectedDriver] = useState(driverStandings[0]?.driverName ?? "")

  const driver = driverStandings.find((d) => d.driverName === selectedDriver)
  const leader = driverStandings[0]

  if (!driver || !leader || driverStandings.length < 2) {
    return (
      <div className="rounded-xl border border-asphalt bg-pit p-4">
        <p className="text-xs text-silver">Not enough data for calculations.</p>
      </div>
    )
  }

  const result = calculatePointsNeeded(
    driver.points,
    leader.points,
    racesRemaining
  )

  return (
    <div className="rounded-xl border border-asphalt bg-pit p-4">
      <h3 className="text-sm font-bold text-white mb-3 font-display tracking-wide">
        Title Fight Calculator
      </h3>
      <div className="flex gap-2 mb-3">
        <select
          value={selectedDriver}
          onChange={(e) => setSelectedDriver(e.target.value)}
          className="flex-1 bg-carbon text-white text-sm rounded-lg px-3 py-2 border border-asphalt focus:border-scarlet focus:outline-none"
        >
          {driverStandings.map((d) => (
            <option key={d.driverName} value={d.driverName}>
              {d.driverName}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center mb-3">
        <div className="bg-carbon rounded-lg p-2">
          <p className="text-lg font-bold font-mono text-white">
            {driver.points}
          </p>
          <p className="text-[10px] text-silver">Driver pts</p>
        </div>
        <div className="bg-carbon rounded-lg p-2">
          <p className="text-lg font-bold font-mono text-gold">
            {leader.points}
          </p>
          <p className="text-[10px] text-silver">Leader pts</p>
        </div>
        <div className="bg-carbon rounded-lg p-2">
          <p className="text-lg font-bold font-mono text-scarlet">
            {leader.points - driver.points}
          </p>
          <p className="text-[10px] text-silver">Gap</p>
        </div>
      </div>
      <p className="text-xs text-silver leading-relaxed">{result.scenarios}</p>
    </div>
  )
}
