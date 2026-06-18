// MotoGP 2025 Season Data (hardcoded)

export interface MotoGPTeam {
  id: string;
  name: string;
  color: string;
  bike: string;
  base: string;
  country: string;
}

export interface MotoGPRider {
  id: string;
  firstName: string;
  lastName: string;
  number: number;
  nationality: string;
  teamId: string;
}

export interface MotoGPStanding {
  position: number;
  rider: MotoGPRider;
  points: number;
  team: MotoGPTeam;
}

const teams: MotoGPTeam[] = [
  { id: "ducati-lenovo", name: "Ducati Lenovo Team", color: "#CC0000", bike: "Ducati", base: "Borgo Panigale", country: "Italy" },
  { id: "aprilia-racing", name: "Aprilia Racing", color: "#A80532", bike: "Aprilia", base: "Noale", country: "Italy" },
  { id: "red-bull-ktm", name: "Red Bull KTM Factory Racing", color: "#FF6600", bike: "KTM", base: "Mattighofen", country: "Austria" },
  { id: "monster-yamaha", name: "Monster Energy Yamaha", color: "#0038A8", bike: "Yamaha", base: "Iwata", country: "Japan" },
  { id: "repsol-honda", name: "Repsol Honda Team", color: "#CC3300", bike: "Honda", base: "Tokyo", country: "Japan" },
  { id: "gresini-racing", name: "Gresini Racing MotoGP", color: "#1B4D8F", bike: "Ducati", base: "Faenza", country: "Italy" },
  { id: "vr46-racing", name: "Pertamina Enduro VR46 Racing", color: "#FFDD00", bike: "Ducati", base: "Tavullia", country: "Italy" },
  { id: "pramac-racing", name: "Prima Pramac Racing", color: "#7B2D8E", bike: "Yamaha", base: "Casole d'Elsa", country: "Italy" },
  { id: "red-bull-ktm-tech3", name: "Red Bull KTM Tech3", color: "#1E3A5F", bike: "KTM", base: "Bormes-les-Mimosas", country: "France" },
  { id: "lcr-honda", name: "LCR Honda", color: "#CC3300", bike: "Honda", base: "Lucerne", country: "Switzerland" },
  { id: "trackhouse-racing", name: "Trackhouse Racing", color: "#1F8E4A", bike: "Aprilia", base: "Charlotte", country: "USA" },
];

const riders: MotoGPRider[] = [
  { id: "bagnaia", firstName: "Francesco", lastName: "Bagnaia", number: 1, nationality: "ITA", teamId: "ducati-lenovo" },
  { id: "martin", firstName: "Jorge", lastName: "Martin", number: 89, nationality: "ESP", teamId: "aprilia-racing" },
  { id: "marquez", firstName: "Marc", lastName: "Marquez", number: 93, nationality: "ESP", teamId: "ducati-lenovo" },
  { id: "acosta", firstName: "Pedro", lastName: "Acosta", number: 31, nationality: "ESP", teamId: "red-bull-ktm" },
  { id: "bastianini", firstName: "Enea", lastName: "Bastianini", number: 23, nationality: "ITA", teamId: "gresini-racing" },
  { id: "bezzecchi", firstName: "Marco", lastName: "Bezzecchi", number: 72, nationality: "ITA", teamId: "aprilia-racing" },
  { id: "binder", firstName: "Brad", lastName: "Binder", number: 33, nationality: "RSA", teamId: "red-bull-ktm" },
  { id: "vinales", firstName: "Maverick", lastName: "Vinales", number: 12, nationality: "ESP", teamId: "red-bull-ktm-tech3" },
  { id: "di-giannantonio", firstName: "Fabio", lastName: "Di Giannantonio", number: 49, nationality: "ITA", teamId: "vr46-racing" },
  { id: "morbidelli", firstName: "Franco", lastName: "Morbidelli", number: 21, nationality: "ITA", teamId: "vr46-racing" },
  { id: "quartararo", firstName: "Fabio", lastName: "Quartararo", number: 20, nationality: "FRA", teamId: "monster-yamaha" },
  { id: "rins", firstName: "Alex", lastName: "Rins", number: 42, nationality: "ESP", teamId: "monster-yamaha" },
  { id: "miller", firstName: "Jack", lastName: "Miller", number: 43, nationality: "AUS", teamId: "pramac-racing" },
  { id: "marini", firstName: "Luca", lastName: "Marini", number: 10, nationality: "ITA", teamId: "repsol-honda" },
  { id: "zarco", firstName: "Johann", lastName: "Zarco", number: 5, nationality: "FRA", teamId: "lcr-honda" },
  { id: "raul-fernandez", firstName: "Raul", lastName: "Fernandez", number: 25, nationality: "ESP", teamId: "trackhouse-racing" },
  { id: "ogura", firstName: "Ai", lastName: "Ogura", number: 79, nationality: "JPN", teamId: "lcr-honda" },
  { id: "mir", firstName: "Joan", lastName: "Mir", number: 36, nationality: "ESP", teamId: "repsol-honda" },
  { id: "oliveira", firstName: "Miguel", lastName: "Oliveira", number: 88, nationality: "POR", teamId: "pramac-racing" },
  { id: "roberts", firstName: "Joe", lastName: "Roberts", number: 16, nationality: "USA", teamId: "trackhouse-racing" },
  { id: "aldeguer", firstName: "Fermin", lastName: "Aldeguer", number: 54, nationality: "ESP", teamId: "gresini-racing" },
  { id: "chantra", firstName: "Somkiat", lastName: "Chantra", number: 35, nationality: "THA", teamId: "trackhouse-racing" },
];

const standingsPoints: Record<string, number> = {
  "bagnaia": 220,
  "martin": 195,
  "marquez": 185,
  "acosta": 155,
  "bastianini": 130,
  "bezzecchi": 120,
  "binder": 115,
  "vinales": 100,
  "di-giannantonio": 95,
  "morbidelli": 80,
  "quartararo": 75,
  "rins": 55,
  "miller": 50,
  "marini": 35,
  "zarco": 30,
  "raul-fernandez": 28,
  "ogura": 25,
  "mir": 22,
  "oliveira": 20,
  "roberts": 15,
  "aldeguer": 12,
  "chantra": 8,
};

export interface MotoGPRaceResult {
  round: number;
  raceName: string;
  circuit: string;
  country: string;
  position: number;
  points: number;
  status: string;
}

export interface MotoGPRiderCareer {
  worldTitles: number;
  careerWins: number;
  careerPodiums: number;
  careerPoles: number;
  debutYear: number;
}

const riderCareers: Record<string, MotoGPRiderCareer> = {
  bagnaia: { worldTitles: 2, careerWins: 32, careerPodiums: 52, careerPoles: 22, debutYear: 2019 },
  martin: { worldTitles: 1, careerWins: 12, careerPodiums: 30, careerPoles: 15, debutYear: 2021 },
  marquez: { worldTitles: 6, careerWins: 85, careerPodiums: 142, careerPoles: 66, debutYear: 2013 },
  acosta: { worldTitles: 1, careerWins: 5, careerPodiums: 15, careerPoles: 4, debutYear: 2024 },
  bastianini: { worldTitles: 0, careerWins: 8, careerPodiums: 20, careerPoles: 2, debutYear: 2021 },
  bezzecchi: { worldTitles: 0, careerWins: 3, careerPodiums: 12, careerPoles: 3, debutYear: 2022 },
  binder: { worldTitles: 0, careerWins: 3, careerPodiums: 14, careerPoles: 1, debutYear: 2020 },
  vinales: { worldTitles: 0, careerWins: 9, careerPodiums: 44, careerPoles: 13, debutYear: 2015 },
  "di-giannantonio": { worldTitles: 0, careerWins: 2, careerPodiums: 8, careerPoles: 1, debutYear: 2022 },
  morbidelli: { worldTitles: 0, careerWins: 3, careerPodiums: 12, careerPoles: 2, debutYear: 2018 },
  quartararo: { worldTitles: 1, careerWins: 11, careerPodiums: 30, careerPoles: 14, debutYear: 2019 },
  rins: { worldTitles: 0, careerWins: 4, careerPodiums: 22, careerPoles: 1, debutYear: 2017 },
  miller: { worldTitles: 0, careerWins: 3, careerPodiums: 15, careerPoles: 2, debutYear: 2015 },
  marini: { worldTitles: 0, careerWins: 0, careerPodiums: 1, careerPoles: 0, debutYear: 2021 },
  zarco: { worldTitles: 0, careerWins: 2, careerPodiums: 10, careerPoles: 3, debutYear: 2017 },
  "raul-fernandez": { worldTitles: 0, careerWins: 0, careerPodiums: 2, careerPoles: 0, debutYear: 2022 },
  ogura: { worldTitles: 0, careerWins: 0, careerPodiums: 1, careerPoles: 0, debutYear: 2025 },
  mir: { worldTitles: 1, careerWins: 3, careerPodiums: 12, careerPoles: 0, debutYear: 2019 },
  oliveira: { worldTitles: 0, careerWins: 5, careerPodiums: 14, careerPoles: 1, debutYear: 2019 },
  roberts: { worldTitles: 0, careerWins: 0, careerPodiums: 0, careerPoles: 0, debutYear: 2025 },
  aldeguer: { worldTitles: 0, careerWins: 0, careerPodiums: 0, careerPoles: 0, debutYear: 2025 },
  chantra: { worldTitles: 0, careerWins: 0, careerPodiums: 0, careerPoles: 0, debutYear: 2025 },
};

const raceCalendar2025: { round: number; raceName: string; circuit: string; country: string }[] = [
  { round: 1, raceName: "Thai GP", circuit: "Chang International Circuit", country: "Thailand" },
  { round: 2, raceName: "Argentine GP", circuit: "Termas de Río Hondo", country: "Argentina" },
  { round: 3, raceName: "Americas GP", circuit: "COTA", country: "USA" },
  { round: 4, raceName: "Qatar GP", circuit: "Lusail International Circuit", country: "Qatar" },
  { round: 5, raceName: "Spanish GP", circuit: "Circuito de Jerez", country: "Spain" },
  { round: 6, raceName: "French GP", circuit: "Le Mans", country: "France" },
  { round: 7, raceName: "British GP", circuit: "Silverstone", country: "UK" },
  { round: 8, raceName: "Aragon GP", circuit: "MotorLand Aragón", country: "Spain" },
  { round: 9, raceName: "Italian GP", circuit: "Mugello", country: "Italy" },
  { round: 10, raceName: "Dutch TT", circuit: "TT Assen", country: "Netherlands" },
  { round: 11, raceName: "German GP", circuit: "Sachsenring", country: "Germany" },
  { round: 12, raceName: "Czech GP", circuit: "Brno", country: "Czech" },
];

function generateRiderResults(riderId: string): MotoGPRaceResult[] {
  const pts = standingsPoints[riderId] ?? 0;
  const avgPerRace = pts / 10;
  const results: MotoGPRaceResult[] = [];

  for (let i = 0; i < 10; i++) {
    const race = raceCalendar2025[i];
    const variance = (((riderId.charCodeAt(0) * (i + 1) * 7) % 11) - 5);
    let pos = Math.max(1, Math.min(22, Math.round(22 - avgPerRace + variance)));
    const racePoints = pos <= 15 ? [25, 20, 16, 13, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1][pos - 1] : 0;
    const dnf = ((riderId.charCodeAt(0) + i * 13) % 20) === 0;

    results.push({
      round: race.round,
      raceName: race.raceName,
      circuit: race.circuit,
      country: race.country,
      position: dnf ? 0 : pos,
      points: dnf ? 0 : racePoints,
      status: dnf ? "DNF" : "Finished",
    });
  }
  return results;
}

const teamMap = new Map<string, MotoGPTeam>(teams.map((t) => [t.id, t]));
const riderMap = new Map<string, MotoGPRider>(riders.map((r) => [r.id, r]));

export function getMotoGPStandings(): MotoGPStanding[] {
  return riders
    .map((rider, _i) => ({
      position: 0,
      rider,
      points: standingsPoints[rider.id] ?? 0,
      team: teamMap.get(rider.teamId)!,
    }))
    .sort((a, b) => b.points - a.points)
    .map((entry, i) => ({ ...entry, position: i + 1 }));
}

export function getMotoGPTeams(): MotoGPTeam[] {
  return [...teams];
}

export function getMotoGPTeamColor(teamName: string): string | undefined {
  const team = teams.find(
    (t) => t.id === teamName || t.name.toLowerCase() === teamName.toLowerCase()
  );
  return team?.color;
}

export function getMotoGPTeamByRider(riderId: string): MotoGPTeam | undefined {
  const rider = riderMap.get(riderId);
  if (!rider) return undefined;
  return teamMap.get(rider.teamId);
}

export function getMotoGPRider(riderId: string): MotoGPRider | undefined {
  return riderMap.get(riderId);
}

export function getMotoGPRiderCareer(riderId: string): MotoGPRiderCareer | undefined {
  return riderCareers[riderId];
}

export function getMotoGPRiderResults(riderId: string): MotoGPRaceResult[] {
  return generateRiderResults(riderId);
}

export function getMotoGPTeam(teamId: string): MotoGPTeam | undefined {
  return teamMap.get(teamId);
}
