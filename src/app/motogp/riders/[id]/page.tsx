import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getMotoRider, getMotoRiderStats, getMotoStandings } from "@/lib/motogp"
import { getMotoTeamColor, getMotoCountryFlagFromIso, getMotoNumberColor } from "@/lib/motoColors"
import { MotoHeroSkeleton } from "@/components/motogp/MotoSkeleton"

interface RiderPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: RiderPageProps): Promise<Metadata> {
  const { id } = await params
  const rider = await getMotoRider(id)
  return {
    title: rider ? `${rider.name} ${rider.surname}` : "Rider",
  }
}

async function RiderContent({ id }: { id: string }) {
  const rider = await getMotoRider(id)
  if (!rider) notFound()

  const [stats, standings] = await Promise.all([
    getMotoRiderStats(rider.legacy_id),
    getMotoStandings(),
  ])

  const seasonStats = stats?.[0]
  const standingEntry = standings?.find(
    (s) => s.rider.id === rider.id
  )

  const teamName = rider.current_career_step?.team?.name ?? ""
  const teamId = rider.current_career_step?.team?.id ?? ""
  const teamColor = getMotoTeamColor(teamName)
  const numberColor = getMotoNumberColor(teamColor)
  const flag = getMotoCountryFlagFromIso(rider.country?.iso ?? "")

  return (
    <div className="relative">
      <div
        className="absolute top-0 left-0 w-full h-48 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, ${teamColor}22 0%, transparent 100%)`,
        }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="flex items-center gap-2 text-sm text-silver mb-4">
          <Link href="/motogp/riders" className="hover:text-white transition-colors">
            Riders
          </Link>
          <span className="text-asphalt">|</span>
          <Link href={`/motogp/teams/${teamId}`} className="hover:text-white transition-colors">
            {teamName}
          </Link>
        </div>

        <div className="flex items-center gap-4 mb-8 relative z-10">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold font-display shadow-lg"
            style={{
              backgroundColor: teamColor,
              color: numberColor,
              boxShadow: `0 0 30px ${teamColor}44`,
            }}
          >
            {rider.current_career_step?.number}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">{flag}</span>
              <h1 className="text-3xl font-bold text-white font-display tracking-wide">
                {rider.name} {rider.surname}
              </h1>
            </div>
            <p className="text-silver text-sm">
              {rider.country?.name} &middot; {teamName}
              {standingEntry && (
                <>
                  <span className="text-asphalt mx-2">|</span>
                  <span className="text-scarlet">
                    P{standingEntry.position} in standings ({standingEntry.points} pts)
                  </span>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8 relative z-10">
          <div className="bg-pit border border-asphalt rounded-xl p-4 text-center">
            <p className="text-2xl font-bold font-mono text-white">{seasonStats?.position ?? standingEntry?.position ?? "—"}</p>
            <p className="text-xs text-silver">Position</p>
          </div>
          <div className="bg-pit border border-asphalt rounded-xl p-4 text-center">
            <p className="text-2xl font-bold font-mono text-white">{seasonStats?.points ?? 0}</p>
            <p className="text-xs text-silver">Points</p>
          </div>
          <div className="bg-pit border border-asphalt rounded-xl p-4 text-center">
            <p className="text-2xl font-bold font-mono text-white">{seasonStats?.podiums ?? 0}</p>
            <p className="text-xs text-silver">Podiums</p>
          </div>
          <div className="bg-pit border border-asphalt rounded-xl p-4 text-center">
            <p className="text-2xl font-bold font-mono text-white">{seasonStats?.poles ?? 0}</p>
            <p className="text-xs text-silver">Poles</p>
          </div>
          <div className="bg-pit border border-asphalt rounded-xl p-4 text-center">
            <p className="text-2xl font-bold font-mono text-white">{seasonStats?.starts ?? 0}</p>
            <p className="text-xs text-silver">Starts</p>
          </div>
        </div>

        {stats && stats.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-white font-display tracking-wide mb-4 relative z-10">
              Season Statistics
            </h2>
            <div className="overflow-y-auto max-h-[600px] rounded-xl border border-asphalt bg-pit relative z-10">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-asphalt bg-carbon">
                    <th className="py-2 px-3 text-xs text-silver uppercase text-left">Season</th>
                    <th className="py-2 px-3 text-xs text-silver uppercase text-left">Category</th>
                    <th className="py-2 px-3 text-xs text-silver uppercase text-left">Constructor</th>
                    <th className="py-2 px-3 text-xs text-silver uppercase text-right">Starts</th>
                    <th className="py-2 px-3 text-xs text-silver uppercase text-right">Wins</th>
                    <th className="py-2 px-3 text-xs text-silver uppercase text-right">Podiums</th>
                    <th className="py-2 px-3 text-xs text-silver uppercase text-right">Poles</th>
                    <th className="py-2 px-3 text-xs text-silver uppercase text-right">Pts</th>
                    <th className="py-2 px-3 text-xs text-silver uppercase text-right">Pos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-asphalt/50">
                  {stats.map((s) => (
                    <tr key={`${s.season}-${s.category}`} className="hover:bg-carbon/50 transition-colors">
                      <td className="py-2 px-3 font-mono text-xs text-silver">{s.season}</td>
                      <td className="py-2 px-3 text-sm text-white">{s.category}</td>
                      <td className="py-2 px-3 text-sm text-silver">{s.constructor}</td>
                      <td className="py-2 px-3 text-right font-mono text-sm text-white">{s.starts}</td>
                      <td className="py-2 px-3 text-right font-mono text-sm text-gold">{s.first_position}</td>
                      <td className="py-2 px-3 text-right font-mono text-sm text-white">{s.podiums}</td>
                      <td className="py-2 px-3 text-right font-mono text-sm text-white">{s.poles}</td>
                      <td className="py-2 px-3 text-right font-mono text-sm text-white">{s.points}</td>
                      <td className="py-2 px-3 text-right font-mono text-sm text-white">P{s.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default async function RiderPage({ params }: RiderPageProps) {
  const { id } = await params
  return (
    <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-8"><MotoHeroSkeleton /></div>}>
      <RiderContent id={id} />
    </Suspense>
  )
}
