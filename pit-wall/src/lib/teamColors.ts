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

export function getTeamColor(name: string): string {
  return teamColors[name] ?? "#888888"
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
