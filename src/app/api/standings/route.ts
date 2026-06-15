import { NextResponse } from "next/server"
import { getDriverStandings } from "@/lib/ergast"

export async function GET() {
  const standings = await getDriverStandings()
  if (!standings) {
    return NextResponse.json(
      { error: "Failed to fetch driver standings" },
      { status: 500 }
    )
  }
  return NextResponse.json(standings)
}
