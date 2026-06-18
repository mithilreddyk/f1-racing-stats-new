import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  getMotoGPRider,
  getMotoGPTeamByRider,
  getMotoGPRiderCareer,
  getMotoGPRiderResults,
  getMotoGPStandings,
} from "@/lib/motogp"
import { getCountryFlag } from "@/lib/teamColors"
import MotoGPBikeImage from "@/components/ui/MotoGPBikeImage"

interface RiderPageProps {
  params: Promise<{ id: string }>
}

const NATIONALITY_MAP: Record<string, string> = {
  ITA: "Italy", ESP: "Spain", FRA: "France", RSA: "South Africa",
  AUS: "Australia", JPN: "Japan", POR: "Portugal", USA: "USA", THA: "Thailand",
}

export async function generateMetadata({ params }: RiderPageProps): Promise<Metadata> {
  const { id } = await params
  const rider = getMotoGPRider(id)
  return {
    title: rider ? `${rider.firstName} ${rider.lastName} — MotoGP` : "Rider",
  }
}

export default async function MotoGPRiderPage({ params }: RiderPageProps) {
  const { id } = await params
  const rider = getMotoGPRider(id)
  if (!rider) notFound()

  const team = getMotoGPTeamByRider(id)!
  const career = getMotoGPRiderCareer(id)
  const results = getMotoGPRiderResults(id)
  const standings = getMotoGPStandings()
  const standing = standings.find((s) => s.rider.id === id)
  const flag = getCountryFlag(NATIONALITY_MAP[rider.nationality] ?? "")
  const countryFlag = getCountryFlag(team.country)

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute top-0 left-0 w-full h-64 pointer-events-none"
        style={{ background: `linear-gradient(180deg, ${team.color}1a 0%, transparent 100%)` }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative">
        {/* Hero */}
        <div className="relative z-10 mb-8">
          <div className="flex items-start gap-4 sm:gap-5">
            <div
              className="flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24 rounded-2xl flex flex-col items-center justify-center gap-0.5 shadow-xl"
              style={{
                backgroundColor: `${team.color}22`,
                border: `2px solid ${team.color}55`,
                boxShadow: `0 0 40px ${team.color}22`,
              }}
            >
              <span className="text-xl sm:text-3xl font-black font-mono" style={{ color: team.color }}>
                {rider.number}
              </span>
            </div>
            <div className="pt-0.5 sm:pt-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xl sm:text-2xl">{flag}</span>
                <h1 className="text-2xl sm:text-4xl font-black text-white font-display tracking-wide leading-none">
                  {rider.firstName} {rider.lastName}
                </h1>
              </div>
              <p className="text-silver text-sm mt-1.5">
                {NATIONALITY_MAP[rider.nationality] ?? rider.nationality}
                {standing && (
                  <span className="text-[#7B2D8E] ml-2">
                    P{standing.position} · {standing.points} pts
                  </span>
                )}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span
                  className="text-xs font-mono px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: `${team.color}18`,
                    color: team.color,
                    border: `1px solid ${team.color}35`,
                  }}
                >
                  {team.name}
                </span>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-carbon text-silver border border-asphalt">
                  {team.bike}
                </span>
                {career && (
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-carbon text-silver border border-asphalt">
                    Since {career.debutYear}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Career stats */}
        {career && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-8 sm:mb-10 relative z-10">
            <div className="rounded-xl p-4 sm:p-5 text-center" style={{ background: "#1A1A1A", border: `1px solid ${team.color}25` }}>
              <p className="text-2xl sm:text-3xl font-bold font-mono text-gold">{career.worldTitles}</p>
              <p className="text-[11px] text-silver mt-1 uppercase tracking-wider">Titles</p>
            </div>
            <div className="rounded-xl p-4 sm:p-5 text-center" style={{ background: "#1A1A1A", border: `1px solid ${team.color}25` }}>
              <p className="text-2xl sm:text-3xl font-bold font-mono text-white">{career.careerWins}</p>
              <p className="text-[11px] text-silver mt-1 uppercase tracking-wider">Wins</p>
            </div>
            <div className="rounded-xl p-4 sm:p-5 text-center" style={{ background: "#1A1A1A", border: `1px solid ${team.color}25` }}>
              <p className="text-2xl sm:text-3xl font-bold font-mono text-white">{career.careerPodiums}</p>
              <p className="text-[11px] text-silver mt-1 uppercase tracking-wider">Podiums</p>
            </div>
            <div className="rounded-xl p-4 sm:p-5 text-center" style={{ background: "#1A1A1A", border: `1px solid ${team.color}25` }}>
              <p className="text-2xl sm:text-3xl font-bold font-mono text-white">{career.careerPoles}</p>
              <p className="text-[11px] text-silver mt-1 uppercase tracking-wider">Poles</p>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded-xl p-4 sm:p-5 text-center" style={{ background: "#1A1A1A", border: `1px solid ${team.color}25` }}>
              <p className="text-2xl sm:text-3xl font-bold font-mono text-white">{new Date().getFullYear() - career.debutYear + 1}</p>
              <p className="text-[11px] text-silver mt-1 uppercase tracking-wider">Seasons</p>
            </div>
          </div>
        )}

        {/* Bike */}
        <div className="mb-8 sm:mb-10 relative z-10">
          <h2 className="text-xl font-bold text-white font-display tracking-wide mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ backgroundColor: team.color }} />
            Machine
          </h2>
          <MotoGPBikeImage teamColor={team.color} teamName={team.name} bikeName={team.bike} />
        </div>

        {/* Season results */}
        <div className="relative z-10">
          <h2 className="text-xl font-bold text-white font-display tracking-wide mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ backgroundColor: team.color }} />
            2025 Results
            <span className="text-sm font-normal text-silver ml-1">({results.length} races)</span>
          </h2>

          {/* Desktop table */}
          <div className="hidden sm:block overflow-y-auto max-h-[500px] rounded-xl border border-asphalt bg-pit">
            <table className="w-full">
              <thead className="sticky top-0">
                <tr className="border-b border-asphalt bg-carbon">
                  <th className="py-2.5 px-4 text-[11px] text-silver uppercase tracking-wider text-left">Rd</th>
                  <th className="py-2.5 px-4 text-[11px] text-silver uppercase tracking-wider text-left">Race</th>
                  <th className="py-2.5 px-4 text-[11px] text-silver uppercase tracking-wider text-left hidden md:table-cell">Circuit</th>
                  <th className="py-2.5 px-4 text-[11px] text-silver uppercase tracking-wider text-right">Pos</th>
                  <th className="py-2.5 px-4 text-[11px] text-silver uppercase tracking-wider text-right">Pts</th>
                  <th className="py-2.5 px-4 text-[11px] text-silver uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-asphalt/50">
                {results.map((r) => {
                  const raceFlag = getCountryFlag(r.country)
                  return (
                    <tr key={r.round} className="hover:bg-carbon/60 transition-colors">
                      <td className="py-2.5 px-4 font-mono text-xs text-silver">{r.round}</td>
                      <td className="py-2.5 px-4 text-sm text-white">{raceFlag} {r.raceName}</td>
                      <td className="py-2.5 px-4 text-sm text-silver hidden md:table-cell">{r.circuit}</td>
                      <td className="py-2.5 px-4 text-right">
                        <span className={`font-mono text-sm font-bold ${
                          r.status === "DNF" ? "text-scarlet" :
                          r.position === 1 ? "text-gold" :
                          r.position <= 3 ? "text-white" : "text-silver"
                        }`}>
                          {r.status === "DNF" ? "DNF" : `P${r.position}`}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono text-sm text-white">
                        {r.points > 0 ? `+${r.points}` : "—"}
                      </td>
                      <td className="py-2.5 px-4 text-right text-xs text-silver">{r.status}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden space-y-2">
            {results.map((r) => {
              const raceFlag = getCountryFlag(r.country)
              return (
                <div key={r.round} className="flex items-center gap-3 p-3 rounded-xl bg-pit border border-asphalt">
                  <span className="font-mono text-xs text-silver w-6 text-center">R{r.round}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{raceFlag} {r.raceName}</p>
                    <p className="text-xs text-silver truncate">{r.circuit}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`font-mono text-sm font-bold ${
                      r.status === "DNF" ? "text-scarlet" :
                      r.position === 1 ? "text-gold" : "text-white"
                    }`}>
                      {r.status === "DNF" ? "DNF" : `P${r.position}`}
                    </p>
                    <p className="text-[10px] text-silver">{r.points > 0 ? `+${r.points} pts` : "—"}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
