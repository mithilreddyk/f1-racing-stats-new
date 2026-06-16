const teamColors: Record<string, string> = {
  "Red Bull": "#3671C6",
  "Red Bull Racing": "#3671C6",
  Ferrari: "#E8002D",
  Mercedes: "#27F4D2",
  McLaren: "#FF8000",
  "Aston Martin": "#229971",
  Alpine: "#0093CC",
  "Alpine F1 Team": "#0093CC",
  Williams: "#64C4FF",
  "RB F1 Team": "#6692FF",
  "RB": "#6692FF",
  "Kick Sauber": "#52E252",
  "Stake F1 Team": "#52E252",
  Haas: "#B6BABD",
  "Haas F1 Team": "#B6BABD",
}

const teamNationality: Record<string, string> = {
  "Red Bull Racing": "Austria",
  Ferrari: "Italy",
  Mercedes: "Germany",
  McLaren: "UK",
  "Aston Martin": "UK",
  "Alpine F1 Team": "France",
  Alpine: "France",
  Williams: "UK",
  "RB F1 Team": "Italy",
  "Kick Sauber": "Switzerland",
  "Haas F1 Team": "USA",
  Haas: "USA",
}

const teamInsights: Record<string, {
  principal: string
  engine: string
  chassis: string
  base: string
  founded: string
  titles: number
}> = {
  "Red Bull Racing": {
    principal: "Christian Horner",
    engine: "Honda RBPT",
    chassis: "RB21",
    base: "Milton Keynes, UK",
    founded: "2005",
    titles: 6,
  },
  "Red Bull": {
    principal: "Christian Horner",
    engine: "Honda RBPT",
    chassis: "RB21",
    base: "Milton Keynes, UK",
    founded: "2005",
    titles: 6,
  },
  Ferrari: {
    principal: "Frédéric Vasseur",
    engine: "Ferrari",
    chassis: "SF-25",
    base: "Maranello, Italy",
    founded: "1950",
    titles: 16,
  },
  Mercedes: {
    principal: "Toto Wolff",
    engine: "Mercedes",
    chassis: "W16",
    base: "Brackley, UK",
    founded: "2010",
    titles: 8,
  },
  McLaren: {
    principal: "Andrea Stella",
    engine: "Mercedes",
    chassis: "MCL39",
    base: "Woking, UK",
    founded: "1966",
    titles: 8,
  },
  "Aston Martin": {
    principal: "Andy Cowell",
    engine: "Mercedes",
    chassis: "AMR25",
    base: "Silverstone, UK",
    founded: "2021",
    titles: 0,
  },
  Alpine: {
    principal: "Oliver Oakes",
    engine: "Renault",
    chassis: "A525",
    base: "Enstone, UK",
    founded: "2021",
    titles: 0,
  },
  "Alpine F1 Team": {
    principal: "Oliver Oakes",
    engine: "Renault",
    chassis: "A525",
    base: "Enstone, UK",
    founded: "2021",
    titles: 0,
  },
  Williams: {
    principal: "James Vowles",
    engine: "Mercedes",
    chassis: "FW47",
    base: "Grove, UK",
    founded: "1977",
    titles: 9,
  },
  "RB F1 Team": {
    principal: "Laurent Mekies",
    engine: "Honda RBPT",
    chassis: "VCARB 02",
    base: "Faenza, Italy",
    founded: "2006",
    titles: 0,
  },
  "RB": {
    principal: "Laurent Mekies",
    engine: "Honda RBPT",
    chassis: "VCARB 02",
    base: "Faenza, Italy",
    founded: "2006",
    titles: 0,
  },
  "Kick Sauber": {
    principal: "Mattia Binotto",
    engine: "Ferrari",
    chassis: "C45",
    base: "Hinwil, Switzerland",
    founded: "1993",
    titles: 0,
  },
  "Haas F1 Team": {
    principal: "Ayao Komatsu",
    engine: "Ferrari",
    chassis: "VF-25",
    base: "Kannapolis, USA",
    founded: "2016",
    titles: 0,
  },
  Haas: {
    principal: "Ayao Komatsu",
    engine: "Ferrari",
    chassis: "VF-25",
    base: "Kannapolis, USA",
    founded: "2016",
    titles: 0,
  },
}

export function getTeamColor(name: string): string {
  return teamColors[name] ?? "#888888"
}

export function getTeamInsights(name: string) {
  return teamInsights[name]
}

export function getTeamNationality(name: string): string {
  return teamNationality[name] ?? ""
}

export const COUNTRY_FLAGS: Record<string, string> = {
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
  Bahrain: "🇧🇭",
  "Saudi Arabia": "🇸🇦",
  UAE: "🇦🇪",
  Azerbaijan: "🇦🇿",
  Hungary: "🇭🇺",
  Belgium: "🇧🇪",
  Portugal: "🇵🇹",
  Qatar: "🇶🇦",
  "South Africa": "🇿🇦",
  Turkey: "🇹🇷",
  Russia: "🇷🇺",
  Finland: "🇫🇮",
  Argentina: "🇦🇷",
  India: "🇮🇳",
  Korea: "🇰🇷",
  Malaysia: "🇲🇾",
  "New Zealand": "🇳🇿",
  Poland: "🇵🇱",
  Venezuela: "🇻🇪",
  Thailand: "🇹🇭",
  Denmark: "🇩🇰",
  Indonesia: "🇮🇩",
  Ireland: "🇮🇪",
  Sweden: "🇸🇪",
  Colombia: "🇨🇴",
  Czech: "🇨🇿",
  Morocco: "🇲🇦",
  Vietnam: "🇻🇳",
  "St. Kitts and Nevis": "🇰🇳",
  Uruguay: "🇺🇾",
  Zimbabwe: "🇿🇼",
  Namibia: "🇳🇦",
}

export function getCountryFlag(country: string): string {
  return COUNTRY_FLAGS[country] ?? ""
}
