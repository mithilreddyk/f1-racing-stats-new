"use client"

import type { RacePrediction } from "@/lib/predictor"

interface PredictorPanelProps {
  prediction: RacePrediction
  circuitName: string
}

export default function PredictorPanel({
  prediction,
  circuitName,
}: PredictorPanelProps) {
  const riskColor =
    prediction.circuitRisk === "High"
      ? "text-red-400"
      : prediction.circuitRisk === "Medium"
        ? "text-yellow-400"
        : "text-green-400"

  return (
    <div className="rounded-xl border border-asphalt bg-pit p-5">
      <h3 className="text-lg font-bold text-white font-display tracking-wide mb-1">
        Race Predictor
      </h3>
      <p className="text-xs text-silver mb-4">
        Statistical forecast for {circuitName} based on historical data
      </p>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-silver uppercase tracking-wider mb-2 font-semibold">
            Top 5 Win Probability
          </p>
          <div className="space-y-1.5">
            {prediction.winnerPredictions.map((p, i) => (
              <div key={p.driverName} className="flex items-center gap-2">
                <span className="text-xs text-silver font-mono w-4">{i + 1}</span>
                <div className="flex-1 bg-carbon rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${p.probability * 3}%`,
                      backgroundColor:
                        i === 0
                          ? "#FFD700"
                          : i === 1
                            ? "#C0C0C0"
                            : i === 2
                              ? "#b45309"
                              : "#E8002D",
                    }}
                  />
                </div>
                <span className="text-xs text-white font-mono w-16 text-right">
                  {p.driverName.split(" ").pop()}
                </span>
                <span className="text-xs text-silver font-mono w-10 text-right">
                  {p.probability}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-carbon rounded-lg p-3 text-center">
            <p className="text-2xl font-bold font-mono text-white">
              {prediction.dnfProbability}%
            </p>
            <p className="text-[10px] text-silver uppercase tracking-wider mt-1">
              DNF Chance
            </p>
            <p className="text-[10px] text-silver/60">
              ~{prediction.totalDNFs.avg} drivers ({prediction.totalDNFs.min}–
              {prediction.totalDNFs.max})
            </p>
          </div>
          <div className="bg-carbon rounded-lg p-3 text-center">
            <p className="text-2xl font-bold font-mono text-white">
              {prediction.safetyCarProbability}%
            </p>
            <p className="text-[10px] text-silver uppercase tracking-wider mt-1">
              Safety Car
            </p>
          </div>
          <div className="bg-carbon rounded-lg p-3 text-center">
            <p className="text-2xl font-bold font-mono text-white">
              {prediction.redFlagProbability}%
            </p>
            <p className="text-[10px] text-silver uppercase tracking-wider mt-1">
              Red Flag
            </p>
          </div>
          <div className="bg-carbon rounded-lg p-3 text-center">
            <p className={`text-2xl font-bold font-mono ${riskColor}`}>
              {prediction.circuitRisk}
            </p>
            <p className="text-[10px] text-silver uppercase tracking-wider mt-1">
              Circuit Risk
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
