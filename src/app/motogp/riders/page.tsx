import type { Metadata } from "next"
import { getMotoGPStandings } from "@/lib/motogp"
import { getCountryFlag } from "@/lib/teamColors"

export const metadata: Metadata = {
  title: "MotoGP Rider Standings",
  description: "Full MotoGP rider championship standings for the 2025 season.",
}

const NATIONALITY_MAP: Record<string, string> = {
  ITA: "Italy",
  ESP: "Spain",
  FRA: "France",
  RSA: "South Africa",
  AUS: "Australia",
  JPN: "Japan",
  POR: "Portugal",
  USA: "USA",
  THA: "Thailand",
}

export default function MotoGPRidersPage() {
  const standings = getMotoGPStandings()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-display tracking-wide flex items-center gap-2">
          <span className="w-1.5 h-7 rounded-full inline-block bg-[#7B2D8E]" />
          MotoGP Rider Standings
        </h1>
        <p className="text-silver text-sm mt-1 ml-4">2025 World Championship</p>
      </div>

      {/* Mobile cards + Desktop table */}
      <div className="hidden sm:block overflow-hidden rounded-xl border border-asphalt bg-pit">
        <table className="w-full">
          <thead>
            <tr className="border-b border-asphalt bg-carbon">
              <th className="text-left py-3 px-4 text-[11px] text-silver uppercase tracking-wider font-semibold w-12">Pos</th>
              <th className="text-left py-3 px-4 text-[11px] text-silver uppercase tracking-wider font-semibold">#</th>
              <th className="text-left py-3 px-4 text-[11px] text-silver uppercase tracking-wider font-semibold">Rider</th>
              <th className="text-left py-3 px-4 text-[11px] text-silver uppercase tracking-wider font-semibold hidden md:table-cell">Team</th>
              <th className="text-left py-3 px-4 text-[11px] text-silver uppercase tracking-wider font-semibold hidden lg:table-cell">Bike</th>
              <th className="text-right py-3 px-4 text-[11px] text-silver uppercase tracking-wider font-semibold">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-asphalt/50">
            {standings.map((s) => {
              const isP1 = s.position === 1
              const flag = getCountryFlag(NATIONALITY_MAP[s.rider.nationality] ?? "")
              return (
                <tr key={s.rider.id} className={`hover:bg-carbon/50 transition-colors ${isP1 ? "bg-gold/[0.02]" : ""}`}>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: s.team.color }} />
                      <span className={`font-mono text-sm font-bold ${isP1 ? "text-gold" : "text-white"}`}>
                        {s.position}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-sm text-silver">{s.rider.number}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{flag}</span>
                      <span className={`font-semibold ${isP1 ? "text-gold" : "text-white"}`}>
                        {s.rider.firstName} {s.rider.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <span className="text-sm" style={{ color: s.team.color }}>{s.team.name}</span>
                  </td>
                  <td className="py-3 px-4 hidden lg:table-cell">
                    <span className="text-sm text-silver">{s.team.bike}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-mono font-bold text-white">{s.points}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile card layout */}
      <div className="sm:hidden space-y-2">
        {standings.map((s) => {
          const isP1 = s.position === 1
          const flag = getCountryFlag(NATIONALITY_MAP[s.rider.nationality] ?? "")
          return (
            <div
              key={s.rider.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-pit border border-asphalt"
            >
              <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ backgroundColor: s.team.color }} />
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold flex-shrink-0"
                style={{
                  backgroundColor: isP1 ? "rgba(255,215,0,0.12)" : "rgba(42,42,42,0.8)",
                  color: isP1 ? "#FFD700" : "#C0C0C0",
                }}
              >
                {s.position}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm truncate ${isP1 ? "text-gold" : "text-white"}`}>
                  {flag} {s.rider.firstName} {s.rider.lastName}
                  <span className="text-silver/60 font-mono text-xs ml-1.5">#{s.rider.number}</span>
                </p>
                <p className="text-xs text-silver mt-0.5 truncate">
                  <span style={{ color: s.team.color }}>{s.team.name}</span>
                  <span className="text-asphalt mx-1">·</span>
                  {s.team.bike}
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
  )
}
