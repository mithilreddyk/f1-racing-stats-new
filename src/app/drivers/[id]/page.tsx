import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getDriverInfo, getDriverAllResults, getDriverStandings } from "@/lib/ergast"
import { getTeamColor, getCountryFlag } from "@/lib/teamColors"
import { getStatusDisplay } from "@/lib/utils"
import { HeroSkeleton } from "@/components/ui/Skeleton"
import TeamCarBg from "@/components/ui/TeamCarBg"
import Link from "next/link"

interface DriverPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: DriverPageProps): Promise<Metadata> {
  const { id } = await params
  const driver = await getDriverInfo(id)
  return {
    title: driver ? `${driver.givenName} ${driver.familyName}` : "Driver",
  }
}

async function DriverContent({ id }: { id: string }) {
  const [driver, allResults, standings] = await Promise.all([
    getDriverInfo(id),
    getDriverAllResults(id),
    getDriverStandings(),
  ])

  if (!driver) notFound()

  const flag = getCountryFlag(driver.nationality)
  const currentStanding = standings?.find((s) => s.Driver.driverId === id)
  const teamColor = getTeamColor(currentStanding?.Constructors[0]?.name ?? "")
  const teamName = currentStanding?.Constructors[0]?.name ?? ""
  const currentResults = allResults ?? []

  const totalRaces = allResults?.length ?? 0
  const wins = allResults?.filter((r) => r.Results?.[0]?.position === "1").length ?? 0
  const podiums = allResults?.filter((r) => {
    const p = parseInt(r.Results?.[0]?.position ?? "99", 10)
    return p <= 3
  }).length ?? 0
  const dnfs = allResults?.filter((r) => {
    const s = r.Results?.[0]?.status ?? ""
    return s !== "Finished" && !s.startsWith("+")
  }).length ?? 0

  return (
    <div className="relative min-h-screen">
      {/* Hero gradient */}
      <div
        className="absolute top-0 left-0 w-full h-64 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, ${teamColor}1a 0%, transparent 100%)`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        <TeamCarBg teamColor={teamColor} />

        {/* ─── HERO ─── */}
        <div className="relative z-10 mb-8">
          <div className="flex items-start gap-5">
            {/* Driver code block */}
            <div
              className="flex-shrink-0 w-24 h-24 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-xl"
              style={{
                backgroundColor: `${teamColor}22`,
                border: `2px solid ${teamColor}55`,
                boxShadow: `0 0 40px ${teamColor}22`,
              }}
            >
              <span className="text-2xl font-black font-display tracking-wider" style={{ color: teamColor }}>
                {driver.code ?? driver.familyName.slice(0, 3).toUpperCase()}
              </span>
              {currentStanding && (
                <span className="text-[10px] font-mono text-silver opacity-60">P{currentStanding.position}</span>
              )}
            </div>

            <div className="pt-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-2xl">{flag}</span>
                <h1 className="text-4xl font-black text-white font-display tracking-wide leading-none">
                  {driver.givenName} {driver.familyName}
                </h1>
                {currentStanding && parseInt(currentStanding.position, 10) === 1 && (
                  <span className="text-[10px] font-bold text-gold uppercase tracking-widest bg-gold/10 border border-gold/25 px-2.5 py-1 rounded-full">
                    WDC LEADER
                  </span>
                )}
              </div>
              <p className="text-silver text-sm mt-2">
                {driver.nationality} · Born {driver.dateOfBirth}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {teamName && (
                  <span
                    className="text-xs font-mono px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: `${teamColor}18`,
                      color: teamColor,
                      border: `1px solid ${teamColor}35`,
                    }}
                  >
                    {teamName}
                  </span>
                )}
                {currentStanding && (
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-carbon text-silver border border-asphalt">
                    {currentStanding.points} pts · {currentStanding.wins} wins (2026)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ─── CAREER STATS ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 relative z-10">
          <div
            className="rounded-xl p-5 text-center"
            style={{ background: "#1A1A1A", border: `1px solid ${teamColor}25` }}
          >
            <p className="text-3xl font-bold font-mono text-white">{totalRaces}</p>
            <p className="text-xs text-silver mt-1 uppercase tracking-wider">Races</p>
          </div>
          <div
            className="rounded-xl p-5 text-center"
            style={{ background: "#1A1A1A", border: `1px solid ${teamColor}25` }}
          >
            <p className="text-3xl font-bold font-mono text-gold">{wins}</p>
            <p className="text-xs text-silver mt-1 uppercase tracking-wider">Wins</p>
          </div>
          <div
            className="rounded-xl p-5 text-center"
            style={{ background: "#1A1A1A", border: `1px solid ${teamColor}25` }}
          >
            <p className="text-3xl font-bold font-mono text-white">{podiums}</p>
            <p className="text-xs text-silver mt-1 uppercase tracking-wider">Podiums</p>
          </div>
          <div
            className="rounded-xl p-5 text-center"
            style={{ background: "#1A1A1A", border: `1px solid ${teamColor}25` }}
          >
            <p className="text-3xl font-bold font-mono text-scarlet">{dnfs}</p>
            <p className="text-xs text-silver mt-1 uppercase tracking-wider">DNFs</p>
          </div>
        </div>

        {/* ─── ALL RESULTS ─── */}
        <div className="relative z-10">
          <h2 className="text-xl font-bold text-white font-display tracking-wide mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ backgroundColor: teamColor }} />
            All Results
            <span className="text-sm font-normal text-silver ml-1">({currentResults.length})</span>
          </h2>
          <div className="overflow-y-auto max-h-[600px] rounded-xl border border-asphalt bg-pit">
            <table className="w-full">
              <thead className="sticky top-0">
                <tr className="border-b border-asphalt bg-carbon">
                  <th className="py-2.5 px-4 text-[11px] text-silver uppercase tracking-wider text-left">Season</th>
                  <th className="py-2.5 px-4 text-[11px] text-silver uppercase tracking-wider text-left">Race</th>
                  <th className="py-2.5 px-4 text-[11px] text-silver uppercase tracking-wider text-left hidden sm:table-cell">Team</th>
                  <th className="py-2.5 px-4 text-[11px] text-silver uppercase tracking-wider text-right">Pos</th>
                  <th className="py-2.5 px-4 text-[11px] text-silver uppercase tracking-wider text-right hidden sm:table-cell">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-asphalt/50">
                {currentResults.map((race) => {
                  const result = race.Results?.[0]
                  if (!result) return null
                  const pos = parseInt(result.position, 10)
                  const color = getTeamColor(result.Constructor.name)
                  return (
                    <tr key={`${race.season}-${race.round}`} className="hover:bg-carbon/60 transition-colors">
                      <td className="py-2.5 px-4 font-mono text-xs text-silver">{race.season}</td>
                      <td className="py-2.5 px-4">
                        <Link href={`/race/${race.round}`} className="text-white text-sm hover:text-scarlet transition-colors">
                          {race.raceName}
                        </Link>
                      </td>
                      <td className="py-2.5 px-4 text-sm hidden sm:table-cell" style={{ color }}>
                        {result.Constructor.name}
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <span
                          className={`font-mono text-sm font-bold ${
                            pos === 1 ? "text-gold" : pos <= 3 ? "text-white" : "text-silver"
                          }`}
                        >
                          P{result.position}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-right text-xs text-silver hidden sm:table-cell">
                        {getStatusDisplay(result.status)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function DriverPage({ params }: DriverPageProps) {
  const { id } = await params
  return (
    <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-8"><HeroSkeleton /></div>}>
      <DriverContent id={id} />
    </Suspense>
  )
}
