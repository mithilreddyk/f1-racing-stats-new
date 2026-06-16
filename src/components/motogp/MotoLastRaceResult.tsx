import type { MotoEvent, MotoSession, MotoClassificationEntry } from "@/types/motogp"
import { getMotoTeamColor, getMotoCountryFlagFromIso } from "@/lib/motoColors"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

interface MotoLastRaceResultProps {
  event: MotoEvent | null
  session: MotoSession | null
  classification: MotoClassificationEntry[] | null
  round: number
}

export default function MotoLastRaceResult({
  event,
  session,
  classification,
  round,
}: MotoLastRaceResultProps) {
  if (!event || !classification) {
    return (
      <section className="rounded-xl border border-asphalt bg-pit p-6">
        <h2 className="text-xl font-bold text-white font-display tracking-wide mb-4">
          Last Race
        </h2>
        <p className="text-silver text-sm">
          No race results available yet this season.
        </p>
      </section>
    )
  }

  const podium = classification.slice(0, 5)
  const flag = getMotoCountryFlagFromIso(event.country?.iso ?? "")

  return (
    <section className="rounded-xl border border-asphalt bg-pit p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white font-display tracking-wide">
          Last Race
        </h2>
        <Link
          href={`/motogp/race/${round}`}
          className="text-sm text-scarlet hover:underline"
        >
          Full results
        </Link>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <span className="text-lg">{flag}</span>
        <div>
          <h3 className="font-semibold text-white">{event.name}</h3>
          <p className="text-xs text-silver">
            {formatDate(event.date_start)} &middot; Round {round}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {podium.map((entry) => {
          const teamColor = getMotoTeamColor(entry.team?.name ?? "")
          const pos = entry.position
          const trophies = ["🥇", "🥈", "🥉"]
          const labels = ["1st Place", "2nd Place", "3rd Place"]

          return (
            <div
              key={entry.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-carbon border border-asphalt"
            >
              <span className="text-xl">{pos <= 3 ? trophies[pos - 1] : pos}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white">
                  {entry.rider.full_name}
                </p>
                <p className="text-xs text-silver">
                  {pos <= 3 ? labels[pos - 1] : `${ordinalSuffix(pos)}`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono text-white font-bold">
                  +{entry.points} pts
                </p>
                <p className="text-xs" style={{ color: teamColor }}>
                  {entry.team?.name ?? ""}
                </p>
                {entry.gap?.first && (
                  <p className="text-[10px] text-silver/60 mt-0.5">
                    +{entry.gap.first}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function ordinalSuffix(n: number): string {
  const s = ["th", "st", "nd", "rd"]
  const v = n % 100
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0])
}
