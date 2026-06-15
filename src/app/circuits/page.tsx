import { Suspense } from "react"
import type { Metadata } from "next"
import { getCircuits } from "@/lib/ergast"
import { getCountryFlag } from "@/lib/teamColors"
import GlossaryTooltip from "@/components/ui/GlossaryTooltip"
import { DriverStandingsSkeleton } from "@/components/ui/Skeleton"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Circuits",
  description: "All Formula 1 circuits — track information, locations, and circuit maps.",
}

async function CircuitsContent() {
  const circuits = await getCircuits()

  if (!circuits || circuits.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-white font-display tracking-wide mb-4">Circuits</h1>
        <p className="text-silver">Couldn&apos;t load circuits — try refreshing.</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-display tracking-wide">Circuits</h1>
        <GlossaryTooltip term="Grand Prix">
          <p className="text-silver text-sm mt-1">All Formula 1 circuits — {circuits.length} total</p>
        </GlossaryTooltip>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {circuits.map((circuit) => {
          const flag = getCountryFlag(circuit.Location.country)
          return (
            <Link
              key={circuit.circuitId}
              href={`/circuits/${circuit.circuitId}`}
              className="group rounded-xl border border-asphalt bg-pit p-5 hover:border-scarlet/30 transition-all hover:scale-[1.02]"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{flag}</span>
                <h3 className="font-semibold text-white group-hover:text-scarlet transition-colors truncate">
                  {circuit.circuitName}
                </h3>
              </div>
              <p className="text-sm text-silver">
                {circuit.Location.locality}, {circuit.Location.country}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default function CircuitsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="h-8 w-48 bg-asphalt/50 rounded animate-pulse" />
            <div className="h-4 w-64 bg-asphalt/50 rounded animate-pulse mt-2" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-28 rounded-xl bg-pit border border-asphalt animate-pulse" />
            ))}
          </div>
        </div>
      }
    >
      <CircuitsContent />
    </Suspense>
  )
}
