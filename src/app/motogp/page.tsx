import type { Metadata } from "next"
import Link from "next/link"
import { getMotoGPStandings, getMotoGPTeams } from "@/lib/motogp"
import { getCountryFlag } from "@/lib/teamColors"

export const metadata: Metadata = {
  title: "MotoGP Overview",
  description: "MotoGP rider standings and team information for the 2025 season.",
}

export default function MotoGPPage() {
  const standings = getMotoGPStandings()
  const teams = getMotoGPTeams()
  const top5 = standings.slice(0, 5)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#7B2D8E]/20 via-carbon to-pit p-8 sm:p-12 border border-[#7B2D8E]/20">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#7B2D8E]/5 rounded-full blur-3xl -mr-24 -mt-24" />
        <div className="relative z-10 text-center">
          <span className="text-[#7B2D8E] text-sm font-bold uppercase tracking-widest">MotoGP 2025</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-wide mt-2">
            Grand Prix Motorcycle Racing
          </h1>
          <p className="text-silver mt-3 max-w-xl mx-auto text-sm sm:text-base">
            The premier class of motorcycle road racing. Follow rider standings, teams, and bike manufacturers.
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <Link
              href="/motogp/riders"
              className="px-5 py-2.5 rounded-lg bg-[#7B2D8E] text-white text-sm font-semibold hover:bg-[#6B1D7E] transition-colors"
            >
              Rider Standings
            </Link>
            <Link
              href="/motogp/teams"
              className="px-5 py-2.5 rounded-lg bg-pit border border-asphalt text-silver text-sm font-semibold hover:text-white hover:border-silver/30 transition-colors"
            >
              All Teams
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-asphalt bg-pit p-4 text-center">
          <p className="text-2xl font-bold font-mono text-white">{standings.length}</p>
          <p className="text-xs text-silver mt-1 uppercase tracking-wider">Riders</p>
        </div>
        <div className="rounded-xl border border-asphalt bg-pit p-4 text-center">
          <p className="text-2xl font-bold font-mono text-white">{teams.length}</p>
          <p className="text-xs text-silver mt-1 uppercase tracking-wider">Teams</p>
        </div>
        <div className="rounded-xl border border-asphalt bg-pit p-4 text-center">
          <p className="text-2xl font-bold font-mono text-white">4</p>
          <p className="text-xs text-silver mt-1 uppercase tracking-wider">Manufacturers</p>
        </div>
        <div className="rounded-xl border border-asphalt bg-pit p-4 text-center">
          <p className="text-2xl font-bold font-mono text-[#7B2D8E]">{standings[0]?.rider.lastName ?? "—"}</p>
          <p className="text-xs text-silver mt-1 uppercase tracking-wider">Points Leader</p>
        </div>
      </div>

      {/* Two column: Top riders + Teams */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Top 5 Riders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white font-display tracking-wide flex items-center gap-2">
              <span className="w-1 h-5 rounded-full inline-block bg-[#7B2D8E]" />
              Rider Standings
            </h2>
            <Link href="/motogp/riders" className="text-sm text-[#7B2D8E] hover:underline">View all</Link>
          </div>
          <div className="space-y-2">
            {top5.map((s) => {
              const flag = getCountryFlag(s.rider.nationality === "ITA" ? "Italy" : s.rider.nationality === "ESP" ? "Spain" : s.rider.nationality === "FRA" ? "France" : s.rider.nationality === "RSA" ? "South Africa" : s.rider.nationality === "AUS" ? "Australia" : s.rider.nationality === "JPN" ? "Japan" : s.rider.nationality === "POR" ? "Portugal" : s.rider.nationality === "USA" ? "USA" : s.rider.nationality === "THA" ? "Thailand" : "")
              return (
                <div
                  key={s.rider.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-pit border border-asphalt hover:border-[#7B2D8E]/30 transition-all"
                >
                  <div
                    className="w-1 self-stretch rounded-full flex-shrink-0"
                    style={{ backgroundColor: s.team.color }}
                  />
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold flex-shrink-0"
                    style={{
                      backgroundColor: s.position === 1 ? "rgba(255,215,0,0.12)" : "rgba(42,42,42,0.8)",
                      color: s.position === 1 ? "#FFD700" : "#C0C0C0",
                    }}
                  >
                    {s.position}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm truncate ${s.position === 1 ? "text-gold" : "text-white"}`}>
                      {flag} {s.rider.firstName} {s.rider.lastName}
                    </p>
                    <p className="text-xs text-silver mt-0.5" style={{ color: s.team.color }}>
                      {s.team.name}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-mono font-bold text-white">{s.points}</p>
                    <p className="text-[10px] text-silver">pts</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Teams */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white font-display tracking-wide flex items-center gap-2">
              <span className="w-1 h-5 rounded-full inline-block bg-[#7B2D8E]" />
              Teams
            </h2>
            <Link href="/motogp/teams" className="text-sm text-[#7B2D8E] hover:underline">View all</Link>
          </div>
          <div className="space-y-2">
            {teams.map((t) => {
              const teamRiders = standings.filter((s) => s.team.id === t.id)
              const totalPts = teamRiders.reduce((sum, r) => sum + r.points, 0)
              const flag = getCountryFlag(t.country)
              return (
                <Link key={t.id} href={`/motogp/teams#${t.id}`}>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-pit border border-asphalt hover:border-[#7B2D8E]/30 transition-all">
                    <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ backgroundColor: t.color }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm truncate">{t.name}</p>
                      <p className="text-xs text-silver mt-0.5">{flag} {t.bike} · {t.base}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-mono font-bold text-white text-sm">{totalPts}</p>
                      <p className="text-[10px] text-silver">pts</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
