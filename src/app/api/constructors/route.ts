import { NextResponse } from "next/server"
import { getConstructorStandings } from "@/lib/ergast"

export async function GET() {
  const standings = await getConstructorStandings()
  if (!standings) {
    return NextResponse.json(
      { error: "Failed to fetch constructor standings" },
      { status: 500 }
    )
  }
  return NextResponse.json(standings)
}
