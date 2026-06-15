"use client"

import { useRouter, usePathname } from "next/navigation"

interface SeasonSelectorProps {
  currentSeason: string
}

const SEASONS = Array.from({ length: 76 }, (_, i) => String(2026 - i))

export default function SeasonSelector({
  currentSeason,
}: SeasonSelectorProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (season: string) => {
    // Replace season in URL path
    const newPath = pathname.replace(/\/\d{4}/, `/${season}`)
    router.push(newPath)
  }

  // Only show on /drivers, /constructors, /schedule
  const show = ["/drivers", "/constructors", "/schedule"].some((p) =>
    pathname.startsWith(p)
  )
  if (!show) return null

  return (
    <select
      value={currentSeason}
      onChange={(e) => handleChange(e.target.value)}
      className="bg-carbon text-white text-sm rounded-lg px-3 py-2 border border-asphalt focus:border-scarlet focus:outline-none cursor-pointer"
    >
      {SEASONS.map((s) => (
        <option key={s} value={s}>
          {s} Season
        </option>
      ))}
    </select>
  )
}
