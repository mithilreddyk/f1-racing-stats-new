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
  const currentResults = allResults ?? []

  // Stats
  const totalRaces = allResults?.length ?? 0
  const wins = allResults?.filter((r) => r.Results?.[0]?.position === "1").length ?? 0
  const podiums = allResults?.filter((r) => {
    const p = parseInt(r.Results?.[0]?.position ?? "99", 10)
    return p <= 3
  }).length ?? 0
  const dnfs = allResults?.filter((r) => r.Results?.[0]?.status !== "Finished" && !r.Results?.[0]?.status.startsWith("+")).length ?? 0

  return (
    <div className="relative">
      <div
        className="absolute top-0 left-0 w-full h-48 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, ${teamColor}22 0%, transparent 100%)`,
        }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      <TeamCarBg teamColor={teamColor} />
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold font-display text-white shadow-lg"
          style={{
            backgroundColor: teamColor,
            boxShadow: `0 0 30px ${teamColor}44`,
          }}
        >
          {driver.code}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">{flag}</span>
            <h1 className="text-3xl font-bold text-white font-display tracking-wide">
              {driver.givenName} {driver.familyName}
            </h1>
          </div>
          <p className="text-silver text-sm">
            {driver.nationality} &middot; Born {driver.dateOfBirth}
            {currentStanding && (
              <>
                <span className="text-asphalt mx-2">|</span>
                <span className="text-scarlet">
                  P{currentStanding.position} in standings ({currentStanding.points} pts)
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 relative z-10">
        <div className="bg-pit border border-asphalt rounded-xl p-4 text-center">
          <p className="text-2xl font-bold font-mono text-white">{totalRaces}</p>
          <p className="text-xs text-silver">Races</p>
        </div>
        <div className="bg-pit border border-asphalt rounded-xl p-4 text-center">
          <p className="text-2xl font-bold font-mono text-gold">{wins}</p>
          <p className="text-xs text-silver">Wins</p>
        </div>
        <div className="bg-pit border border-asphalt rounded-xl p-4 text-center">
          <p className="text-2xl font-bold font-mono text-white">{podiums}</p>
          <p className="text-xs text-silver">Podiums</p>
        </div>
        <div className="bg-pit border border-asphalt rounded-xl p-4 text-center">
          <p className="text-2xl font-bold font-mono text-scarlet">{dnfs}</p>
          <p className="text-xs text-silver">DNFs</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-white font-display tracking-wide mb-4 relative z-10">
        All Results ({currentResults.length})
      </h2>
      <div className="overflow-y-auto max-h-[600px] rounded-xl border border-asphalt bg-pit relative z-10">
        <table className="w-full">
          <thead>
            <tr className="border-b border-asphalt bg-carbon">
              <th className="py-2 px-3 text-xs text-silver uppercase text-left">Season</th>
              <th className="py-2 px-3 text-xs text-silver uppercase text-left">Race</th>
              <th className="py-2 px-3 text-xs text-silver uppercase text-left">Team</th>
              <th className="py-2 px-3 text-xs text-silver uppercase text-right">Pos</th>
              <th className="py-2 px-3 text-xs text-silver uppercase text-right hidden sm:table-cell">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-asphalt/50">
            {currentResults.map((race) => {
              const result = race.Results?.[0]
              if (!result) return null
              const pos = parseInt(result.position, 10)
              const color = getTeamColor(result.Constructor.name)
              return (
                <tr key={`${race.season}-${race.round}`} className="hover:bg-carbon/50 transition-colors">
                  <td className="py-2 px-3 font-mono text-xs text-silver">{race.season}</td>
                  <td className="py-2 px-3">
                    <Link href={`/race/${race.round}`} className="text-white text-sm hover:text-scarlet transition-colors">
                      {race.raceName}
                    </Link>
                  </td>
                  <td className="py-2 px-3 text-sm" style={{ color }}>{result.Constructor.name}</td>
                  <td className="py-2 px-3 text-right">
                    <span className={`font-mono text-sm font-bold ${pos === 1 ? "text-gold" : pos <= 3 ? "text-white" : "text-silver"}`}>
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

export default async function DriverPage({ params }: DriverPageProps) {
  const { id } = await params
  return (
    <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-8"><HeroSkeleton /></div>}>
      <DriverContent id={id} />
    </Suspense>
  )
}
