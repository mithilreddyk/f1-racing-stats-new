import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getMotoQualifyingResult, getMotoEvents } from "@/lib/motogp"
import { getMotoTeamColor, getMotoCountryFlagFromIso } from "@/lib/motoColors"
import { MotoHeroSkeleton } from "@/components/motogp/MotoSkeleton"

interface QualifyingPageProps {
  params: Promise<{ round: string }>
}

export async function generateMetadata({ params }: QualifyingPageProps): Promise<Metadata> {
  const { round } = await params
  const data = await getMotoQualifyingResult(parseInt(round, 10))
  return {
    title: data ? `${data.event.name} Qualifying` : "Qualifying",
  }
}

async function QualifyingContent({ round }: { round: string }) {
  const roundNum = parseInt(round, 10)
  const data = await getMotoQualifyingResult(roundNum)

  if (!data) notFound()

  const { event, session, result } = data
  const classification = result.classification ?? []
  const flag = getMotoCountryFlagFromIso(event.country?.iso ?? "")

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-silver mb-1">
          <Link href={`/motogp/race/${round}`} className="hover:text-white transition-colors">
            Race Results
          </Link>
          <span className="text-asphalt">|</span>
          <span className="text-scarlet">Qualifying</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{flag}</span>
          <h1 className="text-3xl font-bold text-white font-display tracking-wide">
            {event.name} — Qualifying
          </h1>
        </div>
        <p className="text-silver text-sm mt-1">
          Grid positions determined by fastest lap
        </p>
        {session.condition && (
          <div className="flex items-center gap-4 text-xs text-silver/60 mt-2">
            <span>Track: {session.condition.track}°C</span>
            <span>Air: {session.condition.air}°C</span>
            {session.condition.humidity && <span>Humidity: {session.condition.humidity}%</span>}
            {session.condition.weather && <span>Weather: {session.condition.weather}</span>}
          </div>
        )}
      </div>

      {classification.length === 0 ? (
        <div className="rounded-xl border border-asphalt bg-pit p-12 text-center">
          <p className="text-silver text-lg">No qualifying results available</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-asphalt bg-pit">
          <table className="w-full">
            <thead>
              <tr className="border-b border-asphalt bg-carbon">
                <th className="text-left py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold w-12">Pos</th>
                <th className="text-left py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold">Rider</th>
                <th className="text-left py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold hidden sm:table-cell">Team</th>
                <th className="text-right py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold">Time</th>
                <th className="text-right py-3 px-4 text-xs text-silver uppercase tracking-wider font-semibold">Gap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-asphalt/50">
              {classification.map((entry) => {
                const pos = entry.position
                const isP1 = pos === 1
                const teamColor = getMotoTeamColor(entry.team?.name ?? "")
                return (
                  <tr key={entry.rider.id} className="hover:bg-carbon/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-1 h-8 rounded-full flex-shrink-0"
                          style={{ backgroundColor: teamColor }}
                        />
                        <span className={`font-mono text-sm font-bold ${isP1 ? "text-gold" : "text-white"}`}>
                          {pos}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        href={`/motogp/riders/${entry.rider.riders_id}`}
                        className="font-semibold text-white hover:text-scarlet transition-colors"
                      >
                        {entry.rider.full_name}
                      </Link>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <span className="text-sm" style={{ color: teamColor }}>
                        {entry.team?.name ?? ""}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-sm text-white">
                      {entry.time ?? ""}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-sm text-silver">
                      {entry.gap?.first ?? ""}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8 rounded-xl border border-asphalt bg-pit p-4">
        <p className="text-xs text-silver leading-relaxed">
          <span className="text-white font-semibold">How Qualifying Works:</span>{" "}
          Riders compete in qualifying sessions to set the fastest lap time. The
          rider with the fastest time starts from pole position (P1).
        </p>
      </div>
    </div>
  )
}

export default async function QualifyingPage({ params }: QualifyingPageProps) {
  const { round } = await params
  return (
    <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-8"><MotoHeroSkeleton /></div>}>
      <QualifyingContent round={round} />
    </Suspense>
  )
}
