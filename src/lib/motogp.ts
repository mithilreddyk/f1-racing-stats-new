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
