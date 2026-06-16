import type {
  MotoSeason,
  MotoRider,
  MotoTeam,
  MotoEvent,
  MotoSession,
  MotoSessionResult,
  MotoStandings,
  MotoStandingEntry,
  MotoRiderStats,
} from "@/types/motogp"

const MAIN_API = "https://api.motogp.pulselive.com/motogp/v1"
const RESULTS_API = "https://api.motogp.pulselive.com/motogp/v1/results"

const MOTOGP_CATEGORY_ID = "737ab122-76e1-4081-bedb-334caaa18c70"
const MOTOGP_RESULTS_CATEGORY_ID = "e8c110ad-64aa-4e8e-8a86-f2f152f6a942"

async function fetchApi<T>(url: string): Promise<T | null> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    if (!res.ok) {
      console.warn(`MotoGP API error (${res.status}): ${url}`)
      return null
    }
    return (await res.json()) as T
  } catch (error) {
    console.error(`Failed to fetch MotoGP API: ${url}`, error)
    return null
  }
}

export async function getCurrentSeason(): Promise<MotoSeason | null> {
  const seasons = await fetchApi<MotoSeason[]>(`${MAIN_API}/results/seasons`)
  if (!seasons) return null
  return seasons.find((s) => s.current) ?? seasons[0] ?? null
}

export async function getSeasonByYear(year: number): Promise<MotoSeason | null> {
  const seasons = await fetchApi<MotoSeason[]>(`${MAIN_API}/results/seasons`)
  if (!seasons) return null
  return seasons.find((s) => s.year === year) ?? null
}

export async function getMotoRiders(
  year: number = 2026
): Promise<MotoRider[]> {
  const riders = await fetchApi<MotoRider[]>(
    `${MAIN_API}/riders?seasonYear=${year}`
  )
  if (!riders) return []
  return riders.filter(
    (r) =>
      r.current_career_step?.category?.legacy_id === 3
  )
}

export async function getMotoRider(id: string): Promise<MotoRider | null> {
  return fetchApi<MotoRider>(`${MAIN_API}/riders/${id}`)
}

export async function getMotoRiderStats(
  legacyId: number,
  year: number = 2026
): Promise<MotoRiderStats[]> {
  const stats = await fetchApi<MotoRiderStats[]>(
    `${MAIN_API}/riders/${legacyId}/statistics?seasonYear=${year}`
  )
  return stats ?? []
}

export async function getMotoTeams(
  year: number = 2026
): Promise<MotoTeam[]> {
  const teams = await fetchApi<MotoTeam[]>(
    `${MAIN_API}/teams?categoryUuid=${MOTOGP_CATEGORY_ID}&seasonYear=${year}`
  )
  if (!teams) return []
  return teams.filter((t) => t.published)
}

export async function getMotoTeamById(
  id: string,
  year: number = 2026
): Promise<MotoTeam | null> {
  const teams = await getMotoTeams(year)
  return teams.find((t) => t.id === id || t.legacy_id.toString() === id) ?? null
}

export async function getMotoEvents(year: number = 2026): Promise<MotoEvent[]> {
  const season = await getSeasonByYear(year)
  if (!season) return []
  const events = await fetchApi<MotoEvent[]>(
    `${RESULTS_API}/events?seasonUuid=${season.id}&categoryUuid=${MOTOGP_RESULTS_CATEGORY_ID}`
  )
  if (!events) return []
  return events.filter((e) => !e.test)
}

export async function getMotoEventByRound(
  round: number,
  year: number = 2026
): Promise<MotoEvent | null> {
  const events = await getMotoEvents(year)
  return events[round - 1] ?? null
}

export async function getMotoEventSessions(
  eventUuid: string
): Promise<MotoSession[]> {
  const sessions = await fetchApi<MotoSession[]>(
    `${RESULTS_API}/sessions?eventUuid=${eventUuid}&categoryUuid=${MOTOGP_RESULTS_CATEGORY_ID}`
  )
  return sessions ?? []
}

export async function getMotoSessionResult(
  sessionId: string
): Promise<MotoSessionResult | null> {
  return fetchApi<MotoSessionResult>(
    `${RESULTS_API}/session/${sessionId}`
  )
}

export async function getMotoRaceResult(
  round: number,
  year: number = 2026
): Promise<{
  event: MotoEvent
  session: MotoSession
  result: MotoSessionResult
} | null> {
  const event = await getMotoEventByRound(round, year)
  if (!event) return null

  const eventUuid = event.results_api_event_uuid ?? event.toad_api_uuid
  if (!eventUuid) return null

  const sessions = await getMotoEventSessions(eventUuid)
  const raceSession = sessions.find((s) => s.type === "RAC")
  if (!raceSession) return null

  const result = await getMotoSessionResult(raceSession.id)
  if (!result) return null

  return { event, session: raceSession, result }
}

export async function getMotoQualifyingResult(
  round: number,
  year: number = 2026
): Promise<{
  event: MotoEvent
  session: MotoSession
  result: MotoSessionResult
} | null> {
  const event = await getMotoEventByRound(round, year)
  if (!event) return null

  const eventUuid = event.results_api_event_uuid ?? event.toad_api_uuid
  if (!eventUuid) return null

  const sessions = await getMotoEventSessions(eventUuid)
  const qSession = sessions.find((s) => s.type === "Q")
  if (!qSession) return null

  const result = await getMotoSessionResult(qSession.id)
  if (!result) return null

  return { event, session: qSession, result }
}

export async function getMotoSprintResult(
  round: number,
  year: number = 2026
): Promise<{
  event: MotoEvent
  session: MotoSession
  result: MotoSessionResult
} | null> {
  const event = await getMotoEventByRound(round, year)
  if (!event) return null

  const eventUuid = event.results_api_event_uuid ?? event.toad_api_uuid
  if (!eventUuid) return null

  const sessions = await getMotoEventSessions(eventUuid)
  const sprintSession = sessions.find((s) => s.type === "SPR")
  if (!sprintSession) return null

  const result = await getMotoSessionResult(sprintSession.id)
  if (!result) return null

  return { event, session: sprintSession, result }
}

export async function getMotoStandings(
  year: number = 2026
): Promise<MotoStandingEntry[] | null> {
  const season = await getSeasonByYear(year)
  if (!season) return null

  const data = await fetchApi<MotoStandings>(
    `${RESULTS_API}/standings?seasonUuid=${season.id}&categoryUuid=${MOTOGP_RESULTS_CATEGORY_ID}`
  )
  if (!data?.classification) return null
  return data.classification
}

export async function getLastMotoRace(
  year: number = 2026
): Promise<{
  event: MotoEvent
  session: MotoSession
  result: MotoSessionResult
} | null> {
  const events = await getMotoEvents(year)
  const finished = events.filter((e) => e.status === "FINISHED")
  if (finished.length === 0) return null
  const last = finished[finished.length - 1]
  const round = finished.indexOf(last) + 1
  return getMotoRaceResult(round, year)
}

export async function getNextMotoRace(
  year: number = 2026
): Promise<MotoEvent | null> {
  const events = await getMotoEvents(year)
  const upcoming = events.filter((e) => e.status !== "FINISHED")
  return upcoming[0] ?? null
}

export function getMotoRoundNumber(
  event: MotoEvent,
  events: MotoEvent[]
): number {
  return events.findIndex((e) => e.id === event.id) + 1
}

export type MotoSessionType = typeof SESSION_NAMES[keyof typeof SESSION_NAMES]

export const SESSION_NAMES: Record<string, string> = {
  FP: "Free Practice",
  PR: "Practice",
  Q: "Qualifying",
  SPR: "Sprint Race",
  WUP: "Warm Up",
  RAC: "Race",
}
