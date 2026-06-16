const motoTeamColors: Record<string, string> = {
  "Ducati Lenovo Team": "#cc0000",
  "Aprilia Racing": "#5f259f",
  "Monster Energy Yamaha MotoGP": "#0a0a7a",
  "Red Bull KTM Factory Racing": "#ff6600",
  "Repsol Honda Team": "#ff6600",
  "Trackhouse MotoGP": "#0066cc",
  "Prima Pramac Yamaha MotoGP": "#1a1a2e",
  "Red Bull KTM Tech3": "#003366",
  "LCR Honda": "#cc0000",
  "Team VR46": "#ffff00",
  "Pertamina Enduro VR46": "#ffff00",
  "Gresini Racing MotoGP": "#9baee4",
  "BK8 Gresini Racing MotoGP": "#9baee4",
}

const motoConstructorColors: Record<string, string> = {
  Ducati: "#cc0000",
  Aprilia: "#5f259f",
  Yamaha: "#0a0a7a",
  KTM: "#ff6600",
  Honda: "#cc0000",
}

const motoTeamInsights: Record<string, {
  principal: string
  engine: string
  base: string
  founded: string
  titles: number
  bike: string
}> = {
  "Ducati Lenovo Team": {
    principal: "Luigi Dall'Igna",
    engine: "Ducati",
    base: "Bologna, Italy",
    founded: "2003",
    titles: 4,
    bike: "Desmosedici GP25",
  },
  "Aprilia Racing": {
    principal: "Massimo Rivola",
    engine: "Aprilia",
    base: "Noale, Italy",
    founded: "2022",
    titles: 0,
    bike: "RS-GP25",
  },
  "Monster Energy Yamaha MotoGP": {
    principal: "Lin Jarvis",
    engine: "Yamaha",
    base: "Lesmo, Italy",
    founded: "1999",
    titles: 7,
    bike: "YZR-M1",
  },
  "Red Bull KTM Factory Racing": {
    principal: "Pit Beirer",
    engine: "KTM",
    base: "Munderfing, Austria",
    founded: "2017",
    titles: 0,
    bike: "RC16",
  },
  "Repsol Honda Team": {
    principal: "Alberto Puig",
    engine: "Honda",
    base: "Tokyo, Japan",
    founded: "1995",
    titles: 10,
    bike: "RC213V",
  },
  "Prima Pramac Yamaha MotoGP": {
    principal: "Paolo Campinoti",
    engine: "Yamaha",
    base: "Farnetella, Italy",
    founded: "2002",
    titles: 1,
    bike: "YZR-M1",
  },
  "Trackhouse MotoGP": {
    principal: "Justin Mark",
    engine: "Aprilia",
    base: "Concord, USA",
    founded: "2024",
    titles: 0,
    bike: "RS-GP25",
  },
  "Red Bull KTM Tech3": {
    principal: "Hervé Poncharal",
    engine: "KTM",
    base: "Bormes-les-Mimosas, France",
    founded: "1990",
    titles: 0,
    bike: "RC16",
  },
  "LCR Honda": {
    principal: "Lucio Cecchinello",
    engine: "Honda",
    base: "Monte Carlo, Monaco",
    founded: "1996",
    titles: 0,
    bike: "RC213V",
  },
  "Pertamina Enduro VR46": {
    principal: "Alessio Salucci",
    engine: "Ducati",
    base: "Tavullia, Italy",
    founded: "2022",
    titles: 0,
    bike: "Desmosedici GP25",
  },
  "Team VR46": {
    principal: "Alessio Salucci",
    engine: "Ducati",
    base: "Tavullia, Italy",
    founded: "2022",
    titles: 0,
    bike: "Desmosedici GP25",
  },
  "Gresini Racing MotoGP": {
    principal: "Nadia Gresini",
    engine: "Ducati",
    base: "Faenza, Italy",
    founded: "1997",
    titles: 0,
    bike: "Desmosedici GP25",
  },
  "BK8 Gresini Racing MotoGP": {
    principal: "Nadia Gresini",
    engine: "Ducati",
    base: "Faenza, Italy",
    founded: "1997",
    titles: 0,
    bike: "Desmosedici GP25",
  },
}

export function getMotoTeamColor(name: string): string {
  return motoTeamColors[name] ?? motoConstructorColors[name] ?? "#888888"
}

export function getMotoConstructorColor(name: string): string {
  return motoConstructorColors[name] ?? "#888888"
}

export function getMotoTeamInsights(name: string) {
  return motoTeamInsights[name]
}

export const MOTO_COUNTRY_FLAGS: Record<string, string> = {
  Austria: "🇦🇹",
  Italy: "🇮🇹",
  Germany: "🇩🇪",
  UK: "🇬🇧",
  "United Kingdom": "🇬🇧",
  France: "🇫🇷",
  Switzerland: "🇨🇭",
  USA: "🇺🇸",
  Australia: "🇦🇺",
  Brazil: "🇧🇷",
  Canada: "🇨🇦",
  Netherlands: "🇳🇱",
  Mexico: "🇲🇽",
  Spain: "🇪🇸",
  Japan: "🇯🇵",
  China: "🇨🇳",
  Monaco: "🇲🇨",
  Singapore: "🇸🇬",
  Thailand: "🇹🇭",
  Qatar: "🇶🇦",
  Indonesia: "🇮🇩",
  Malaysia: "🇲🇾",
  Argentina: "🇦🇷",
  Portugal: "🇵🇹",
  Hungary: "🇭🇺",
  Czechia: "🇨🇿",
  "San Marino": "🇸🇲",
  India: "🇮🇳",
  Finland: "🇫🇮",
}

export function getMotoCountryFlag(name: string): string {
  return MOTO_COUNTRY_FLAGS[name] ?? ""
}

export function getMotoCountryFlagFromIso(iso: string): string {
  const flags: Record<string, string> = {
    ES: "🇪🇸", IT: "🇮🇹", FR: "🇫🇷", DE: "🇩🇪", GB: "🇬🇧",
    US: "🇺🇸", JP: "🇯🇵", AU: "🇦🇺", NL: "🇳🇱", AT: "🇦🇹",
    CH: "🇨🇭", BR: "🇧🇷", CA: "🇨🇦", MX: "🇲🇽", CN: "🇨🇳",
    TH: "🇹🇭", QA: "🇶🇦", ID: "🇮🇩", MY: "🇲🇾", AR: "🇦🇷",
    PT: "🇵🇹", HU: "🇭🇺", CZ: "🇨🇿", SM: "🇸🇲", IN: "🇮🇳",
    FI: "🇫🇮", ZA: "🇿🇦", RU: "🇷🇺", TR: "🇹🇷", MC: "🇲🇨",
    SG: "🇸🇬", KR: "🇰🇷", NZ: "🇳🇿", PL: "🇵🇱", VE: "🇻🇪",
    CO: "🇨🇴", IE: "🇮🇪", SE: "🇸🇪", DK: "🇩🇰", GR: "🇬🇷",
    RO: "🇷🇴", BE: "🇧🇪", HR: "🇭🇷", SK: "🇸🇰", LT: "🇱🇹",
    LV: "🇱🇻", EE: "🇪🇪", BG: "🇧🇬", RS: "🇷🇸",
  }
  return flags[iso.toUpperCase()] ?? ""
}

export function getMotoNumberColor(teamColor: string): string {
  const dark = parseInt(teamColor.replace("#", ""), 16)
  const r = (dark >> 16) & 0xff
  const g = (dark >> 8) & 0xff
  const b = dark & 0xff
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? "#1a1a2e" : "#ffffff"
}
