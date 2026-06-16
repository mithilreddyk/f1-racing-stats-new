import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getConstructorStandings, getConstructorResults, getDriverStandings } from "@/lib/ergast"
import { getTeamColor, getCountryFlag, getTeamInsights } from "@/lib/teamColors"
import { getStatusDisplay } from "@/lib/utils"
import { HeroSkeleton } from "@/components/ui/Skeleton"
import TeamCarBg from "@/components/ui/TeamCarBg"
import TeamCarImage from "@/components/ui/TeamCarImage"
import Link from "next/link"

interface ConstructorPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ConstructorPageProps): Promise<Metadata> {
  const { id } = await params
  const standings = await getConstructorStandings()
  const team = standings?.find((c) => c.Constructor.constructorId === id)
  return {
    title: team?.Constructor.name ?? "Team",
  }
}

async function ConstructorContent({ id }: { id: string }) {
  const [standings, results, driverStandings] = await Promise.all([
    getConstructorStandings(),
    getConstructorResults(id),
    getDriverStandings(),
  ])

  const team = standings?.find((c) => c.Constructor.constructorId === id)
  if (!team) notFound()

  const color = getTeamColor(team.Constructor.name)
  const flag = getCountryFlag(team.Constructor.nationality)
  const insights = getTeamInsights(team.Constructor.name)
  const teamDrivers = driverStandings
    ?.filter((d) => d.Constructors[0]?.constructorId === id)
    .sort((a, b) => parseInt(a.position, 10) - parseInt(b.position, 10))

  const isP1 = parseInt(team.position, 10) === 1
  const recentResults = results ?? []

  return (
    <div className="relative min-h-screen">
      {/* Hero gradient */}
      <div
        className="absolute top-0 left-0 w-full h-64 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, ${color}1a 0%, transparent 100%)`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        <TeamCarBg teamColor={color} />

        {/* ─── HERO ─── */}
        <div className="relative z-10 mb-8">
          <div className="flex items-start gap-5">
            {/* Team logo block */}
            <div
              className="flex-shrink-0 w-24 h-24 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-xl"
              style={{
                backgroundColor: `${color}22`,
                border: `2px solid ${color}55`,
                boxShadow: `0 0 40px ${color}22`,
              }}
            >
              <span className="text-2xl font-black font-display tracking-wider" style={{ color }}>
                {team.Constructor.name.slice(0, 3).toUpperCase()}
              </span>
              <span className="text-[10px] font-mono text-silver opacity-60">P{team.position}</span>
            </div>

            <div className="pt-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-2xl">{flag}</span>
                <h1 className="text-4xl font-black text-white font-display tracking-wide leading-none">
                  {team.Constructor.name}
                </h1>
                {isP1 && (
                  <span className="text-[10px] font-bold text-gold uppercase tracking-widest bg-gold/10 border border-gold/25 px-2.5 py-1 rounded-full">
                    LEADERS
                  </span>
                )}
              </div>
              <p className="text-silver text-sm mt-2">
                {team.Constructor.nationality} · World Constructors&apos; Championship
              </p>
              {insights && (
                <div className="flex flex-wrap gap-2 mt-3">
                  <span
                    className="text-xs font-mono px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: `${color}18`,
                      color: color,
                      border: `1px solid ${color}35`,
                    }}
                  >
                    {insights.engine} Power Unit
                  </span>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-carbon text-silver border border-asphalt">
                    {insights.chassis}
                  </span>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-carbon text-silver border border-asphalt">
                    {insights.base}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── STATS CARDS ─── */}
        <div className="grid grid-cols-3 gap-3 mb-8 relative z-10">
          <div
            className="rounded-xl p-5 text-center"
            style={{ background: "#1A1A1A", border: `1px solid ${color}25` }}
          >
            <p className="text-3xl font-bold font-mono text-white">{team.points}</p>
            <p className="text-xs text-silver mt-1 uppercase tracking-wider">Points</p>
          </div>
          <div
            className="rounded-xl p-5 text-center"
            style={{ background: "#1A1A1A", border: `1px solid ${color}25` }}
          >
            <p className="text-3xl font-bold font-mono text-gold">{team.wins}</p>
            <p className="text-xs text-silver mt-1 uppercase tracking-wider">Wins</p>
          </div>
          <div
            className="rounded-xl p-5 text-center"
            style={{ background: "#1A1A1A", border: `1px solid ${color}25` }}
          >
            <p className="text-3xl font-bold font-mono text-white">{teamDrivers?.length ?? 0}</p>
            <p className="text-xs text-silver mt-1 uppercase tracking-wider">Drivers</p>
          </div>
        </div>

        {/* ─── DRIVERS ─── */}
        {teamDrivers && teamDrivers.length > 0 && (
          <div className="mb-10 relative z-10">
            <h2 className="text-xl font-bold text-white font-display tracking-wide mb-4 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full inline-block" style={{ backgroundColor: color }} />
              Drivers
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {teamDrivers.map((d) => (
                <Link
                  key={d.Driver.driverId}
                  href={`/drivers/${d.Driver.driverId}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-pit border border-asphalt hover:border-scarlet/30 transition-all group"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: `${color}18`, color: color, border: `1px solid ${color}35` }}
                  >
                    {d.position}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold group-hover:text-scarlet transition-colors truncate">
                      {d.Driver.givenName} {d.Driver.familyName}
                    </p>
                    <p className="text-xs text-silver">{d.Driver.nationality}</p>
                  </div>
                  <div className="ml-auto text-right flex-shrink-0">
                    <p className="font-mono font-bold text-white text-lg leading-none">{d.points}</p>
                    <p className="text-[11px] text-silver mt-0.5">pts</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ─── CAR IMAGE ─── */}
        <div className="mb-10 relative z-10">
          <h2 className="text-xl font-bold text-white font-display tracking-wide mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ backgroundColor: color }} />
            2025 Car
          </h2>
          <TeamCarImage teamName={team.Constructor.name} teamColor={color} />
        </div>

        {/* ─── TEAM INSIGHTS ─── */}
        {insights && (
          <div className="mb-10 relative z-10">
            <h2 className="text-xl font-bold text-white font-display tracking-wide mb-4 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full inline-block" style={{ backgroundColor: color }} />
              Team Profile
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-pit border border-asphalt rounded-xl p-4">
                <p className="text-[11px] text-silver uppercase tracking-wider mb-1.5">Team Principal</p>
                <p className="text-sm font-semibold text-white">{insights.principal}</p>
              </div>
              <div className="bg-pit border border-asphalt rounded-xl p-4">
                <p className="text-[11px] text-silver uppercase tracking-wider mb-1.5">Power Unit</p>
                <p className="text-sm font-semibold" style={{ color }}>{insights.engine}</p>
              </div>
              <div className="bg-pit border border-asphalt rounded-xl p-4">
                <p className="text-[11px] text-silver uppercase tracking-wider mb-1.5">Chassis</p>
                <p className="text-sm font-semibold text-white font-mono">{insights.chassis}</p>
              </div>
              <div className="bg-pit border border-asphalt rounded-xl p-4">
                <p className="text-[11px] text-silver uppercase tracking-wider mb-1.5">Base</p>
                <p className="text-sm font-semibold text-white">{insights.base}</p>
              </div>
              <div className="bg-pit border border-asphalt rounded-xl p-4">
                <p className="text-[11px] text-silver uppercase tracking-wider mb-1.5">Founded</p>
                <p className="text-sm font-semibold text-white font-mono">{insights.founded}</p>
              </div>
              <div className="bg-pit border border-asphalt rounded-xl p-4">
                <p className="text-[11px] text-silver uppercase tracking-wider mb-1.5">Constructor Titles</p>
                <p className="text-2xl font-black font-mono" style={{ color: insights.titles > 0 ? color : "#C0C0C0" }}>
                  {insights.titles}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ─── SEASON RESULTS ─── */}
        <div className="relative z-10">
          <h2 className="text-xl font-bold text-white font-display tracking-wide mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ backgroundColor: color }} />
            Season Results
            <span className="text-sm font-normal text-silver ml-1">({recentResults.length})</span>
          </h2>
          <div className="overflow-y-auto max-h-[600px] rounded-xl border border-asphalt bg-pit">
            <table className="w-full">
              <thead className="sticky top-0">
                <tr className="border-b border-asphalt bg-carbon">
                  <th className="py-2.5 px-4 text-[11px] text-silver uppercase tracking-wider text-left">Season</th>
                  <th className="py-2.5 px-4 text-[11px] text-silver uppercase tracking-wider text-left">Race</th>
                  <th className="py-2.5 px-4 text-[11px] text-silver uppercase tracking-wider text-left">Driver</th>
                  <th className="py-2.5 px-4 text-[11px] text-silver uppercase tracking-wider text-right">Pos</th>
                  <th className="py-2.5 px-4 text-[11px] text-silver uppercase tracking-wider text-right hidden sm:table-cell">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-asphalt/50">
                {recentResults.map((race) => {
                  const result = race.Results?.[0]
                  if (!result) return null
                  const pos = parseInt(result.position, 10)
                  return (
                    <tr key={`${race.season}-${race.round}`} className="hover:bg-carbon/60 transition-colors">
                      <td className="py-2.5 px-4 font-mono text-xs text-silver">{race.season}</td>
                      <td className="py-2.5 px-4">
                        <Link href={`/race/${race.round}`} className="text-white text-sm hover:text-scarlet transition-colors">
                          {race.raceName}
                        </Link>
                      </td>
                      <td className="py-2.5 px-4">
                        <Link href={`/drivers/${result.Driver.driverId}`} className="text-sm text-silver hover:text-white transition-colors">
                          {result.Driver.familyName}
                        </Link>
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

export default async function ConstructorPage({ params }: ConstructorPageProps) {
  const { id } = await params
  return (
    <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-8"><HeroSkeleton /></div>}>
      <ConstructorContent id={id} />
    </Suspense>
  )
}
