import Link from "next/link"
import type { DriverStanding, ConstructorStanding } from "@/types/f1"
import DriverCard from "@/components/cards/DriverCard"
import TeamCard from "@/components/cards/TeamCard"

interface StandingsPreviewProps {
  drivers: DriverStanding[] | null
  constructors: ConstructorStanding[] | null
}

export default function StandingsPreview({
  drivers,
  constructors,
}: StandingsPreviewProps) {
  const topDrivers = drivers?.slice(0, 5) ?? []
  const topConstructors = constructors?.slice(0, 3) ?? []

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white font-display tracking-wide">
            Driver Standings
          </h2>
          <Link
            href="/drivers"
            className="text-sm text-scarlet hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="space-y-2">
          {topDrivers.length > 0 ? (
            topDrivers.map((d) => (
              <DriverCard
                key={d.Driver.driverId}
                driver={d}
                position={parseInt(d.position, 10)}
              />
            ))
          ) : (
            <p className="text-silver text-sm py-8 text-center">
              Couldn&apos;t load driver standings.
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white font-display tracking-wide">
            Constructor Standings
          </h2>
          <Link
            href="/constructors"
            className="text-sm text-scarlet hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="space-y-2">
          {topConstructors.length > 0 ? (
            topConstructors.map((c) => (
              <TeamCard
                key={c.Constructor.constructorId}
                team={c}
                position={parseInt(c.position, 10)}
              />
            ))
          ) : (
            <p className="text-silver text-sm py-8 text-center">
              Couldn&apos;t load constructor standings.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
