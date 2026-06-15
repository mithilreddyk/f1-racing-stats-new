import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getSchedule, getQualifyingResult } from "@/lib/ergast"
import { getTeamColor, getCountryFlag } from "@/lib/teamColors"
import GlossaryTooltip from "@/components/ui/GlossaryTooltip"
import { DriverStandingsSkeleton } from "@/components/ui/Skeleton"
import Link from "next/link"

interface QualifyingPageProps {
  params: Promise<{ round: string }>
}

export async function generateMetadata({
  params,
}: QualifyingPageProps): Promise<Metadata> {
  const { round } = await params
  const schedule = await getSchedule()
  const race = schedule?.find((r) => r.round === round)
  return {
    title: race ? `${race.raceName} Qualifying` : "Qualifying",
  }
}

async function QualifyingContent({ round }: { round: string }) {
  const schedule = await getSchedule()
  const raceMeta = schedule?.find((r) => r.round === round)
  if (!raceMeta) notFound()

  const data = await getQualifyingResult(raceMeta.season, round)
  const results = data?.results ?? []
  const race = data?.race ?? raceMeta
  const flag = getCountryFlag(race.Circuit.Location.country)

  // Split into eliminated in Q1, Q2, Q3
  const q3Drivers = results.filter((r) => r.Q3)
  const q2Only = results.filter((r) => !r.Q3 && r.Q2)
  const q1Only = results.filter((r) => !r.Q2)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-silver mb-1">
          <Link href={`/race/${round}`} className="hover:text-white transition-colors">
            Race Results
          </Link>
          <span className="text-asphalt">|</span>
          <span className="text-scarlet">Qualifying</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{flag}</span>
          <h1 className="text-3xl font-bold text-white font-display tracking-wide">
            {race.raceName} — Qualifying
          </h1>
        </div>
        <GlossaryTooltip term="Pole">
          <p className="text-silver text-sm mt-1">
            Grid positions determined by fastest lap in each session
          </p>
        </GlossaryTooltip>
      </div>

      <div className="space-y-8">
        {/* Q3 — Top 10 shootout */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-3 rounded-full bg-purple-500" />
            <h2 className="text-lg font-bold text-white font-display">Q3 — Top 10 Shootout</h2>
          </div>
          <div className="overflow-hidden rounded-xl border border-asphalt bg-pit">
            <table className="w-full">
              <thead>
                <tr className="border-b border-asphalt bg-carbon">
                  <th className="text-left py-2 px-3 text-xs text-silver uppercase">Pos</th>
                  <th className="text-left py-2 px-3 text-xs text-silver uppercase">Driver</th>
                  <th className="text-left py-2 px-3 text-xs text-silver uppercase hidden sm:table-cell">Team</th>
                  <th className="text-right py-2 px-3 text-xs text-silver uppercase">Q1</th>
                  <th className="text-right py-2 px-3 text-xs text-silver uppercase">Q2</th>
                  <th className="text-right py-2 px-3 text-xs text-silver uppercase text-gold">Q3</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-asphalt/50">
                {q3Drivers.map((r) => {
                  const pos = parseInt(r.position, 10)
                  const color = getTeamColor(r.Constructor.name)
                  return (
                    <tr key={r.Driver.driverId} className="hover:bg-carbon/50 transition-colors">
                      <td className="py-2 px-3">
                        <span className={`font-mono text-sm font-bold ${pos === 1 ? "text-gold" : "text-white"}`}>
                          {r.position}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <Link href={`/drivers/${r.Driver.driverId}`} className="text-white font-semibold hover:text-scarlet transition-colors">
                          {r.Driver.familyName}
                        </Link>
                      </td>
                      <td className="py-2 px-3 hidden sm:table-cell">
                        <span className="text-sm" style={{ color }}>{r.Constructor.name}</span>
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-sm text-silver">{r.Q1}</td>
                      <td className="py-2 px-3 text-right font-mono text-sm text-silver">{r.Q2}</td>
                      <td className="py-2 px-3 text-right font-mono text-sm text-white font-bold">{r.Q3}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Q2 — Eliminated 11th–15th */}
        {q2Only.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <h2 className="text-lg font-bold text-white font-display">Q2 — Eliminated (P11–P15)</h2>
            </div>
            <div className="overflow-hidden rounded-xl border border-asphalt bg-pit">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-asphalt bg-carbon">
                    <th className="text-left py-2 px-3 text-xs text-silver uppercase">Pos</th>
                    <th className="text-left py-2 px-3 text-xs text-silver uppercase">Driver</th>
                    <th className="text-left py-2 px-3 text-xs text-silver uppercase hidden sm:table-cell">Team</th>
                    <th className="text-right py-2 px-3 text-xs text-silver uppercase">Q1</th>
                    <th className="text-right py-2 px-3 text-xs text-silver uppercase">Q2</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-asphalt/50">
                  {q2Only.map((r) => {
                    const color = getTeamColor(r.Constructor.name)
                    return (
                      <tr key={r.Driver.driverId} className="hover:bg-carbon/50 transition-colors">
                        <td className="py-2 px-3"><span className="font-mono text-sm text-white">{r.position}</span></td>
                        <td className="py-2 px-3">
                          <Link href={`/drivers/${r.Driver.driverId}`} className="text-white font-semibold hover:text-scarlet transition-colors">
                            {r.Driver.familyName}
                          </Link>
                        </td>
                        <td className="py-2 px-3 hidden sm:table-cell">
                          <span className="text-sm" style={{ color }}>{r.Constructor.name}</span>
                        </td>
                        <td className="py-2 px-3 text-right font-mono text-sm text-silver">{r.Q1}</td>
                        <td className="py-2 px-3 text-right font-mono text-sm text-silver">{r.Q2}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Q1 — Eliminated 16th–20th */}
        {q1Only.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <h2 className="text-lg font-bold text-white font-display">Q1 — Eliminated (P16–P20)</h2>
            </div>
            <div className="overflow-hidden rounded-xl border border-asphalt bg-pit">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-asphalt bg-carbon">
                    <th className="text-left py-2 px-3 text-xs text-silver uppercase">Pos</th>
                    <th className="text-left py-2 px-3 text-xs text-silver uppercase">Driver</th>
                    <th className="text-left py-2 px-3 text-xs text-silver uppercase hidden sm:table-cell">Team</th>
                    <th className="text-right py-2 px-3 text-xs text-silver uppercase">Q1</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-asphalt/50">
                  {q1Only.map((r) => {
                    const color = getTeamColor(r.Constructor.name)
                    return (
                      <tr key={r.Driver.driverId} className="hover:bg-carbon/50 transition-colors">
                        <td className="py-2 px-3"><span className="font-mono text-sm text-white">{r.position}</span></td>
                        <td className="py-2 px-3">
                          <Link href={`/drivers/${r.Driver.driverId}`} className="text-white font-semibold hover:text-scarlet transition-colors">
                            {r.Driver.familyName}
                          </Link>
                        </td>
                        <td className="py-2 px-3 hidden sm:table-cell">
                          <span className="text-sm" style={{ color }}>{r.Constructor.name}</span>
                        </td>
                        <td className="py-2 px-3 text-right font-mono text-sm text-silver">{r.Q1}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      <div className="mt-8 rounded-xl border border-asphalt bg-pit p-4">
        <GlossaryTooltip term="Pole">
          <p className="text-xs text-silver leading-relaxed">
            <span className="text-white font-semibold">How Qualifying Works:</span>{" "}
            Drivers are split into three sessions. Q1 (18 min): slowest 5 eliminated. Q2 (15 min):
            another 5 eliminated. Q3 (12 min): top 10 battle for pole position. The fastest lap in
            Q3 earns pole position and starts the race from P1.
          </p>
        </GlossaryTooltip>
      </div>
    </div>
  )
}

export default async function QualifyingPage({ params }: QualifyingPageProps) {
  const { round } = await params
  return (
    <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-8"><DriverStandingsSkeleton /></div>}>
      <QualifyingContent round={round} />
    </Suspense>
  )
}
