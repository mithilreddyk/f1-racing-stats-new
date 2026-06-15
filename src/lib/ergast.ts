import type {
  ErgastResponse,
  DriverStanding,
  ConstructorStanding,
  Race,
  RaceResult,
} from "@/types/f1"

const BASE_URL = "https://api.jolpi.ca/ergast/f1"
const CURRENT_SEASON = "current"

async function fetchErgast<T>(endpoint: string): Promise<T | null> {
  try {
    const url = `${BASE_URL}${endpoint}.json`
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    if (!res.ok) {
      console.warn(`Ergast API error (${res.status}): ${endpoint}`)
      return null
    }

    const data: T = await res.json()
    return data
  } catch (error) {
    console.error(`Failed to fetch from Ergast: ${endpoint}`, error)
    return null
  }
}

export async function getDriverStandings(
  season: string = CURRENT_SEASON
): Promise<DriverStanding[] | null> {
  const data = await fetchErgast<ErgastResponse>(
    `/${season}/driverStandings`
  )
  const list = data?.MRData?.StandingsTable?.StandingsLists?.[0]
  if (!list?.DriverStandings) return null
  return list.DriverStandings
}

export async function getConstructorStandings(
  season: string = CURRENT_SEASON
): Promise<ConstructorStanding[] | null> {
  const data = await fetchErgast<ErgastResponse>(
    `/${season}/constructorStandings`
  )
  const list = data?.MRData?.StandingsTable?.StandingsLists?.[0]
  if (!list?.ConstructorStandings) return null
  return list.ConstructorStandings
}

export async function getSchedule(
  season: string = CURRENT_SEASON
): Promise<Race[] | null> {
  const data = await fetchErgast<ErgastResponse>(`/${season}`)
  if (!data?.MRData?.RaceTable?.Races) return null
  return data.MRData.RaceTable.Races
}

export async function getRaceResult(
  season: string,
  round: string
): Promise<{ race: Race; results: RaceResult[] } | null> {
  const data = await fetchErgast<ErgastResponse>(
    `/${season}/${round}/results`
  )
  const race = data?.MRData?.RaceTable?.Races?.[0]
  if (!race?.Results) return null
  return { race, results: race.Results }
}

export async function getLastRaceResult(): Promise<{
  race: Race
  results: RaceResult[]
} | null> {
  return getRaceResult(CURRENT_SEASON, "last")
}

export async function getNextRace(): Promise<Race | null> {
  const data = await fetchErgast<ErgastResponse>(`/${CURRENT_SEASON}/next`)
  return data?.MRData?.RaceTable?.Races?.[0] ?? null
}

export async function getRaceCount(): Promise<number> {
  const schedule = await getSchedule()
  if (!schedule) return 0
  return schedule.length
}

function getRaceDate(race: Race): Date {
  return new Date(`${race.date}T${race.time ?? "00:00:00Z"}`)
}

export function isRacePast(race: Race): boolean {
  return getRaceDate(race) < new Date()
}

export function isRaceFuture(race: Race): boolean {
  return getRaceDate(race) > new Date()
}

export function isRaceCurrent(race: Race): boolean {
  const raceDate = getRaceDate(race)
  const now = new Date()
  const raceEnd = new Date(raceDate.getTime() + 4 * 60 * 60 * 1000)
  return now >= raceDate && now <= raceEnd
}

export async function getQualifyingResult(
  season: string,
  round: string
): Promise<{ race: Race; results: import("@/types/f1").QualifyingResult[] } | null> {
  const data = await fetchErgast<ErgastResponse>(
    `/${season}/${round}/qualifying`
  )
  const race = data?.MRData?.RaceTable?.Races?.[0]
  if (!race?.QualifyingResults) return null
  return { race, results: race.QualifyingResults }
}

export async function getCircuits(
  limit: number = 80
): Promise<import("@/types/f1").Circuit[] | null> {
  const data = await fetchErgast<ErgastResponse>(
    `/circuits.json?limit=${limit}`
  )
  if (!data?.MRData?.CircuitTable?.Circuits) return null
  return data.MRData.CircuitTable.Circuits
}

export async function getDriverResults(
  driverId: string,
  season: string = CURRENT_SEASON
): Promise<Race[] | null> {
  const data = await fetchErgast<ErgastResponse>(
    `/drivers/${driverId}/results?limit=100`
  )
  if (!data?.MRData?.RaceTable?.Races) return null
  return data.MRData.RaceTable.Races
}

export async function getDriverAllResults(
  driverId: string
): Promise<Race[] | null> {
  const data = await fetchErgast<ErgastResponse>(
    `/drivers/${driverId}/results?limit=500`
  )
  if (!data?.MRData?.RaceTable?.Races) return null
  return data.MRData.RaceTable.Races
}

export async function getConstructorResults(
  constructorId: string,
  season: string = CURRENT_SEASON
): Promise<Race[] | null> {
  const data = await fetchErgast<ErgastResponse>(
    `/constructors/${constructorId}/results?limit=100`
  )
  if (!data?.MRData?.RaceTable?.Races) return null
  return data.MRData.RaceTable.Races
}

export async function getDriverInfo(
  driverId: string
): Promise<import("@/types/f1").Driver | null> {
  const data = await fetchErgast<ErgastResponse>(
    `/drivers/${driverId}`
  )
  const driver = data?.MRData?.DriverTable?.Drivers?.[0]
  return driver ?? null
}

export async function getCircuitInfo(
  circuitId: string
): Promise<import("@/types/f1").Circuit | null> {
  const data = await fetchErgast<ErgastResponse>(
    `/circuits/${circuitId}`
  )
  const circuit = data?.MRData?.CircuitTable?.Circuits?.[0]
  return circuit ?? null
}

export async function getRaceResultsByYear(
  season: string
): Promise<Race[] | null> {
  const data = await fetchErgast<ErgastResponse>(
    `/${season}/results?limit=500`
  )
  if (!data?.MRData?.RaceTable?.Races) return null
  return data.MRData.RaceTable.Races
}
