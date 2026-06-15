import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCircuitInfo, getSchedule } from "@/lib/ergast"
import { getCountryFlag } from "@/lib/teamColors"
import CircuitMap from "@/components/ui/CircuitMap"
import { HeroSkeleton } from "@/components/ui/Skeleton"
import Link from "next/link"

interface CircuitPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: CircuitPageProps): Promise<Metadata> {
  const { id } = await params
  const circuit = await getCircuitInfo(id)
  return {
    title: circuit?.circuitName ?? "Circuit",
  }
}

async function CircuitContent({ id }: { id: string }) {
  const [circuit, schedule] = await Promise.all([
    getCircuitInfo(id),
    getSchedule(),
  ])

  if (!circuit) notFound()

  const flag = getCountryFlag(circuit.Location.country)
  const racesHere = schedule?.filter((r) => r.Circuit.circuitId === id) ?? []
  const upcoming = racesHere.filter((r) => new Date(`${r.date}T${r.time ?? "00:00:00Z"}`) > new Date())
  const past = racesHere.filter((r) => new Date(`${r.date}T${r.time ?? "00:00:00Z"}`) <= new Date())

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">{flag}</span>
          <h1 className="text-3xl font-bold text-white font-display tracking-wide">
            {circuit.circuitName}
          </h1>
        </div>
        <p className="text-silver">
          {circuit.Location.locality}, {circuit.Location.country}
        </p>
        {racesHere.length > 0 && (
          <p className="text-sm text-silver/60 mt-1">
            {racesHere.length} race{racesHere.length !== 1 ? "s" : ""} this season
          </p>
        )}
      </div>

      <CircuitMap circuitId={id} circuitName={circuit.circuitName} className="mb-8" />

      {upcoming.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white font-display tracking-wide mb-4">Upcoming Race</h2>
          {upcoming.map((race) => (
            <Link
              key={race.round}
              href={`/race/${race.round}`}
              className="block p-4 rounded-xl bg-pit border border-scarlet/30 hover:border-scarlet transition-all mb-2"
            >
              <p className="text-white font-semibold">{race.raceName}</p>
              <p className="text-sm text-silver">Round {race.round}</p>
            </Link>
          ))}
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white font-display tracking-wide mb-4">Race Results</h2>
          <div className="space-y-2">
            {past.map((race) => (
              <Link
                key={race.round}
                href={`/race/${race.round}`}
                className="flex items-center justify-between p-4 rounded-xl bg-pit border border-asphalt hover:border-silver/30 transition-all group"
              >
                <div>
                  <p className="text-white font-medium group-hover:text-scarlet transition-colors">{race.raceName}</p>
                  <p className="text-xs text-silver">Round {race.round}</p>
                </div>
                <span className="text-sm text-silver">
                  {new Date(race.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default async function CircuitPage({ params }: CircuitPageProps) {
  const { id } = await params
  return (
    <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-8"><HeroSkeleton /></div>}>
      <CircuitContent id={id} />
    </Suspense>
  )
}
