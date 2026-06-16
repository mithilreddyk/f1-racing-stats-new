import Link from "next/link"
import type { MotoStandingEntry } from "@/types/motogp"
import { getMotoTeamColor } from "@/lib/motoColors"

interface MotoStandingsPreviewProps {
  standings: MotoStandingEntry[] | null
}

export default function MotoStandingsPreview({
  standings,
}: MotoStandingsPreviewProps) {
  const topRiders = standings?.slice(0, 5) ?? []

  return (
    <div className="grid gap-8 lg:grid-cols-1">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white font-display tracking-wide">
            Rider Standings
          </h2>
          <Link
            href="/motogp/riders"
            className="text-sm text-scarlet hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="space-y-2">
          {topRiders.length > 0 ? (
            topRiders.map((entry) => {
              const teamColor = getMotoTeamColor(entry.team?.name ?? "")
              const card = (
                <div className="group flex items-center gap-4 p-3 rounded-xl bg-pit border border-asphalt hover:border-scarlet/30 transition-all duration-300">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-carbon text-white font-mono text-sm font-bold ring-1 ring-asphalt">
                    {entry.position}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">
                      {entry.rider.full_name}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-silver mt-0.5">
                      {entry.team && (
                        <span style={{ color: teamColor }}>{entry.team.name}</span>
                      )}
                      {entry.constructor && (
                        <>
                          <span className="text-asphalt">|</span>
                          <span>{entry.constructor.name}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-white font-bold font-mono text-lg">
                      {entry.points}
                      <span className="text-silver text-xs ml-1 font-normal">pts</span>
                    </div>
                  </div>
                </div>
              )

              if (entry.position <= 3) {
                return (
                  <Link key={entry.id} href={`/motogp/riders/${entry.rider.riders_id}`}>
                    {card}
                  </Link>
                )
              }

              return <div key={entry.id}>{card}</div>
            })
          ) : (
            <p className="text-silver text-sm py-8 text-center">
              Couldn&apos;t load rider standings.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
