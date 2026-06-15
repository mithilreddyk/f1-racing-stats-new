import { NextResponse } from "next/server"
import { getRaceResult } from "@/lib/ergast"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ round: string }> }
) {
  const { round } = await params
  const result = await getRaceResult("current", round)
  if (!result) {
    return NextResponse.json(
      { error: "Failed to fetch race result" },
      { status: 500 }
    )
  }
  return NextResponse.json(result)
}
