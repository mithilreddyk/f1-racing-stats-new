export function formatTime(millis: string): string {
  const ms = parseInt(millis, 10)
  if (isNaN(ms)) return ""
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const millisRemaining = ms % 1000

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(millisRemaining).padStart(3, "0")}`
  }
  return `${minutes}:${String(seconds).padStart(2, "0")}.${String(millisRemaining).padStart(3, "0")}`
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
}

export function ordinalSuffix(n: number): string {
  const s = ["th", "st", "nd", "rd"]
  const v = n % 100
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0])
}

export function getPositionDisplay(position: string): string {
  const pos = parseInt(position, 10)
  if (isNaN(pos)) return position
  return `${ordinalSuffix(pos)}`
}

export function getCountdown(dateStr: string): {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
} {
  const target = new Date(dateStr)
  const now = new Date()
  const diff = target.getTime() - now.getTime()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  }

  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds, isPast: false }
}

export function getStatusDisplay(status: string): string {
  const statusMap: Record<string, string> = {
    Finished: "Finished",
    "+1 Lap": "Finished (1 lap down)",
    "+2 Laps": "Finished (2 laps down)",
    "+3 Laps": "Finished (3 laps down)",
    "+4 Laps": "Finished (4 laps down)",
    "+5 Laps": "Finished (5 laps down)",
    "+6 Laps": "Finished (6 laps down)",
    "+7 Laps": "Finished (7 laps down)",
    "+8 Laps": "Finished (8 laps down)",
    "+9 Laps": "Finished (9 laps down)",
    "+10 Laps": "Finished (10 laps down)",
    Retired: "Retired",
    Collision: "Retired (crash)",
    Accident: "Retired (crash)",
    Engine: "Engine failure",
    Gearbox: "Gearbox failure",
    Transmission: "Transmission failure",
    Clutch: "Clutch failure",
    Hydraulics: "Hydraulics failure",
    Electrical: "Electrical failure",
    Suspension: "Suspension failure",
    Brakes: "Brake failure",
    "Wheel bearing": "Wheel bearing failure",
    "Power loss": "Power loss",
    Overheating: "Overheating",
    Puncture: "Puncture / tire failure",
    "Driveshaft": "Driveshaft failure",
    "Fuel system": "Fuel system issue",
    "Oil leak": "Oil leak",
    "Vibrations": "Vibrations",
    Spun: "Spun off",
    Radiator: "Radiator issue",
    "Water pressure": "Water pressure issue",
    "Fuel pressure": "Fuel pressure issue",
    "Tyre": "Tire issue",
    "Wheel": "Wheel issue",
    Exhaust: "Exhaust issue",
    Differential: "Differential failure",
    "Power steering": "Power steering failure",
    "Hydraulic": "Hydraulics failure",
    Mechanical: "Mechanical failure",
  }
  return statusMap[status] ?? status
}
