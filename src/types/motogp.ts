export interface MotoSeason {
  id: string
  year: number
  current: boolean
}

export interface MotoCountry {
  iso: string
  name: string
  flag?: string
  region_iso?: string
}

export interface MotoRider {
  id: string
  name: string
  surname: string
  nickname: string | null
  legacy_id: number
  country: MotoCountry
  birth_date: string
  birth_city: string
  years_old: number
  start_year: number
  retired_year: number | null
  retired: boolean
  published: boolean
  famous_attributes: {
    famous: string | null
    picture: string
    order: number | null
  }
  current_career_step: {
    id: string
    season: number
    number: number
    sponsored_team: string
    team: MotoTeamInfo
    category: {
      id: string
      name: string
      legacy_id: number
    }
    in_grid: boolean
    short_nickname: string
    current: boolean
    pictures: {
      profile: { main: string | null; secondary: string | null }
      bike: { main: string | null; secondary: string | null }
      helmet: { main: string | null; secondary: string | null }
      number: string | null
      portrait: string | null
    }
    type: string
  }
}

export interface MotoTeamRider {
  id: string
  name: string
  surname: string
  nickname: string | null
  legacy_id: number
  country: MotoCountry
  birth_date: string
  birth_city: string
  years_old: number
  start_year: number
  retired_year: number | null
  retired: boolean
  published: boolean
  famous_attributes: {
    famous: string | null
    picture: string
    order: number | null
  }
  current_career_step: {
    id: string
    season: number
    number: number
    sponsored_team: string
    team: MotoTeamInfo
    category: {
      id: string
      name: string
      legacy_id: number
    }
    in_grid: boolean
    short_nickname: string
    current: boolean
    pictures: {
      profile: { main: string | null; secondary: string | null }
      bike: { main: string | null; secondary: string | null }
      helmet: { main: string | null; secondary: string | null }
      number: string | null
      portrait: string | null
    }
    type: string
  }
}

export interface MotoTeamInfo {
  id: string
  name: string
  legacy_id: number
  type: string
  color?: string
  text_color?: string
  background_picture?: string | null
  picture?: string | null
  constructor?: {
    id: string
    name: string
    legacy_id: number
  }
  category?: {
    id: string
    name: string
    legacy_id: number
  }
  published?: boolean
}

export interface MotoTeam {
  id: string
  name: string
  legacy_id: number
  color: string
  text_color: string
  type: string
  background_picture: string | null
  picture: string | null
  constructor: {
    id: string
    name: string
    legacy_id: number
  }
  category: {
    id: string
    name: string
    legacy_id: number
  }
  published: boolean
  riders: MotoTeamRider[]
}

export interface MotoEvent {
  id: string
  name: string
  sponsored_name: string
  short_name: string
  additional_name: string
  country: MotoCountry
  circuit: {
    id: string
    name: string
    legacy_id: number
    place: string
    nation: string
  }
  season: {
    id: string
    year: number
    current: boolean
  }
  date_start: string
  date_end: string
  status: string
  test: boolean
  legacy_id: { categoryId: number; eventId: number }[]
  event_files?: Record<string, { url: string; menu_position: number }>
  results_api_event_uuid?: string
  toad_api_uuid?: string
}

export interface MotoSession {
  id: string
  date: string
  number: number | null
  condition?: {
    track: string
    air: string
    humidity: string
    ground: string
    weather: string
  }
  circuit?: string
  type: string
  status: string
  category: {
    id: string
    legacy_id: number
    name: string
  }
  event: {
    id: string
    name: string
    sponsored_name: string
    short_name: string
    test: boolean
    season: string
    circuit: {
      id: string
      name: string
      legacy_id: number
      place: string
      nation: string
    }
    country: MotoCountry
  }
  session_files?: Record<string, { url: string; menu_position: number }>
}

export interface MotoClassificationEntry {
  id: string
  position: number
  rider: {
    id: string
    full_name: string
    country: MotoCountry
    legacy_id: number
    riders_id: string
    number: number
    riders_api_uuid: string
  }
  team?: {
    id: string
    name: string
    legacy_id: number
    season?: { id: string; year: number; current: boolean }
  }
  constructor?: {
    id: string
    name: string
    legacy_id: number
  }
  average_speed?: number
  gap?: { first: string; lap: string }
  total_laps?: number
  time?: string
  points: number
  status?: string
}

export interface MotoSessionResult {
  classification: MotoClassificationEntry[]
  records?: {
    type: string
    rider: { full_name: string }
    bestLap?: { number: number | null; time: string }
    speed?: string
    isNewRecord?: boolean
  }[]
}

export interface MotoStandingEntry {
  id: string
  position: number
  rider: {
    id: string
    full_name: string
    country: MotoCountry
    legacy_id: number
    riders_id: string
    number: number
    riders_api_uuid: string
  }
  team?: {
    id: string
    name: string
    legacy_id: number
    season?: { id: string; year: number; current: boolean }
  }
  constructor?: {
    id: string
    name: string
    legacy_id: number
  }
  session: string
  points: number
  race_wins: number
  podiums: number
  last_positions?: Record<string, number | null>
  sprint_wins?: number
  sprint_podiums?: number
  position_change?: number | null
}

export interface MotoStandings {
  classification: MotoStandingEntry[]
  file?: string
}

export interface MotoRiderStats {
  season: string
  category: string
  rider: string
  constructor: string
  starts: number
  first_position: number
  second_position: number
  third_position: number
  podiums: number
  poles: number
  points: number
  position: number
}

export interface MotoRiderDetail extends MotoRider {
  stats?: MotoRiderStats[]
}
