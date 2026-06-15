import { NextResponse } from "next/server"
import { getSchedule } from "@/lib/ergast"

export async function GET() {
  const schedule = await getSchedule()
  if (!schedule) {
    return NextResponse.json(
      { error: "Failed to fetch schedule" },
      { status: 500 }
    )
  }
  return NextResponse.json(schedule)
}
