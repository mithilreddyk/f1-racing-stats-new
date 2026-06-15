export interface Driver {
  driverId: string
  permanentNumber: string
  code: string
  url: string
  givenName: string
  familyName: string
  dateOfBirth: string
  nationality: string
}

export interface Constructor {
  constructorId: string
  url: string
  name: string
  nationality: string
}

export interface DriverStanding {
  position: string
  positionText: string
  points: string
  wins: string
  Driver: Driver
  Constructors: Constructor[]
}

export interface ConstructorStanding {
  position: string
  positionText: string
  points: string
  wins: string
  Constructor: Constructor
}

export interface Circuit {
  circuitId: string
  url: string
  circuitName: string
  Location: {
    lat: string
    long: string
    locality: string
    country: string
  }
}

export interface Race {
  season: string
  round: string
  url: string
  raceName: string
  Circuit: Circuit
  date: string
  time: string
  FirstPractice?: Session
  SecondPractice?: Session
  ThirdPractice?: Session
  Qualifying?: Session
  Sprint?: Session
  Results?: RaceResult[]
}

export interface Session {
  date: string
  time: string
}

export interface RaceResult {
  number: string
  position: string
  positionText: string
  points: string
  Driver: Driver
  Constructor: Constructor
  grid: string
  laps: string
  status: string
  Time?: {
    millis: string
    time: string
  }
  FastestLap?: {
    rank: string
    lap: string
    Time: {
      time: string
    }
    AverageSpeed: {
      units: string
      speed: string
    }
  }
}

export interface StandingsList {
  season: string
  round: string
  DriverStandings?: DriverStanding[]
  ConstructorStandings?: ConstructorStanding[]
}

export interface StandingsTable {
  season: string
  round?: string
  DriverStandings?: DriverStanding[]
  ConstructorStandings?: ConstructorStanding[]
  StandingsLists?: StandingsList[]
}

export interface RaceTable {
  season: string
  round?: string
  Races: Race[]
}

export interface MRData {
  xmlns: string
  series: string
  url: string
  limit: string
  offset: string
  total: string
  StandingsTable?: StandingsTable
  RaceTable?: RaceTable
}

export interface ErgastResponse {
  MRData: MRData
}
