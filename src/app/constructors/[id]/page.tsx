import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getConstructorStandings, getConstructorResults, getDriverStandings } from "@/lib/ergast"
import { getTeamColor, getCountryFlag } from "@/lib/teamColors"
import { getStatusDisplay } from "@/lib/utils"
import { HeroSkeleton } from "@/components/ui/Skeleton"
import TeamCarBg from "@/components/ui/TeamCarBg"
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
  const teamDrivers = driverStandings
    ?.filter((d) => d.Constructors[0]?.constructorId === id)
    .sort((a, b) => parseInt(a.position, 10) - parseInt(b.position, 10))

  const isP1 = parseInt(team.position, 10) === 1
  const recentResults = results ?? []

  return (
    <div className="relative">
      <div
        className="absolute top-0 left-0 w-full h-48 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, ${color}22 0%, transparent 100%)`,
        }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      <TeamCarBg teamColor={color} />
      <div className="mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-lg"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 30px ${color}44`,
            }}
          >
            {team.Constructor.name.slice(0, 3).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">{flag}</span>
              <h1 className="text-3xl font-bold text-white font-display tracking-wide">
                {team.Constructor.name}
              </h1>
              {isP1 && <span className="text-[10px] font-bold text-gold uppercase tracking-wider bg-gold/10 px-2 py-0.5 rounded-full">Leaders</span>}
            </div>
            <p className="text-silver text-sm">
              {team.Constructor.nationality} &middot; P{team.position} in WCC ({team.points} pts, {team.wins} wins)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8 relative z-10">
        <div className="bg-pit border border-asphalt rounded-xl p-4 text-center">
          <p className="text-2xl font-bold font-mono text-white">{team.points}</p>
          <p className="text-xs text-silver">Points</p>
        </div>
        <div className="bg-pit border border-asphalt rounded-xl p-4 text-center">
          <p className="text-2xl font-bold font-mono text-gold">{team.wins}</p>
          <p className="text-xs text-silver">Wins</p>
        </div>
        <div className="bg-pit border border-asphalt rounded-xl p-4 text-center">
          <p className="text-2xl font-bold font-mono text-white">{teamDrivers?.length ?? 0}</p>
          <p className="text-xs text-silver">Drivers</p>
        </div>
      </div>

      {teamDrivers && teamDrivers.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-white font-display tracking-wide mb-4 relative z-10">Drivers</h2>
          <div className="grid gap-3 sm:grid-cols-2 mb-8 relative z-10">
            {teamDrivers.map((d) => (
              <Link
                key={d.Driver.driverId}
                href={`/drivers/${d.Driver.driverId}`}
                className="flex items-center gap-3 p-4 rounded-xl bg-pit border border-asphalt hover:border-scarlet/30 transition-all group"
              >
                <span className="font-mono text-lg font-bold text-silver w-8">P{d.position}</span>
                <div>
                  <p className="text-white font-semibold group-hover:text-scarlet transition-colors">
                    {d.Driver.givenName} {d.Driver.familyName}
                  </p>
                  <p className="text-xs text-silver">{d.Driver.nationality}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="font-mono font-bold text-white">{d.points}</p>
                  <p className="text-xs text-silver">pts</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      <h2 className="text-xl font-bold text-white font-display tracking-wide mb-4 relative z-10">Season Results ({recentResults.length})</h2>
      <div className="overflow-y-auto max-h-[600px] rounded-xl border border-asphalt bg-pit relative z-10">
        <table className="w-full">
          <thead>
            <tr className="border-b border-asphalt bg-carbon">
              <th className="py-2 px-3 text-xs text-silver uppercase text-left">Season</th>
              <th className="py-2 px-3 text-xs text-silver uppercase text-left">Race</th>
              <th className="py-2 px-3 text-xs text-silver uppercase text-left">Driver</th>
              <th className="py-2 px-3 text-xs text-silver uppercase text-right">Pos</th>
              <th className="py-2 px-3 text-xs text-silver uppercase text-right hidden sm:table-cell">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-asphalt/50">
            {recentResults.map((race) => {
              const result = race.Results?.[0]
              if (!result) return null
              const pos = parseInt(result.position, 10)
              return (
                <tr key={`${race.season}-${race.round}`} className="hover:bg-carbon/50 transition-colors">
                  <td className="py-2 px-3 font-mono text-xs text-silver">{race.season}</td>
                  <td className="py-2 px-3">
                    <Link href={`/race/${race.round}`} className="text-white text-sm hover:text-scarlet transition-colors">
                      {race.raceName}
                    </Link>
                  </td>
                  <td className="py-2 px-3">
                    <Link href={`/drivers/${result.Driver.driverId}`} className="text-sm text-silver hover:text-white transition-colors">
                      {result.Driver.familyName}
                    </Link>
                  </td>
                  <td className="py-2 px-3 text-right">
                    <span className={`font-mono text-sm font-bold ${pos === 1 ? "text-gold" : "text-silver"}`}>
                      P{result.position}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-right text-xs text-silver hidden sm:table-cell">
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
