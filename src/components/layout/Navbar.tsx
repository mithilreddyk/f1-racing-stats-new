"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import SeasonSelector from "@/components/ui/SeasonSelector"

const f1Links = [
  { href: "/", label: "Home" },
  { href: "/drivers", label: "Drivers" },
  { href: "/constructors", label: "Teams" },
  { href: "/schedule", label: "Schedule" },
]

const motoLinks = [
  { href: "/motogp", label: "Home" },
  { href: "/motogp/riders", label: "Riders" },
  { href: "/motogp/teams", label: "Teams" },
  { href: "/motogp/schedule", label: "Schedule" },
]

const isMotoPath = (pathname: string) => pathname.startsWith("/motogp")

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const currentSeason = pathname.match(/\/(\d{4})\//)?.[1] ?? "2026"

  return (
    <header className="sticky top-0 z-50 border-b border-asphalt bg-carbon/95 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 text-white font-bold text-xl tracking-widest uppercase"
          >
            <span className="text-scarlet text-2xl">■</span>
            <span className="font-display">PIT WALL</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <span className="text-[10px] text-silver/40 uppercase tracking-widest font-semibold px-2">F1</span>
            {f1Links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href) && !isMotoPath(pathname)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-scarlet bg-scarlet/10"
                      : "text-silver hover:text-white hover:bg-pit"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <span className="w-px h-6 bg-asphalt mx-2" />
            <span className="text-[10px] text-silver/40 uppercase tracking-widest font-semibold px-2">MotoGP</span>
            {motoLinks.map((link) => {
              const isActive = pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#cc0000] bg-[#cc0000]/10"
                      : "text-silver hover:text-white hover:bg-pit"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <SeasonSelector currentSeason={currentSeason} />
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-silver hover:text-white"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-asphalt pt-2 space-y-1">
            <p className="px-4 py-1 text-[10px] text-silver/40 uppercase tracking-widest font-semibold">F1</p>
            {f1Links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href) && !isMotoPath(pathname)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-scarlet bg-scarlet/10"
                      : "text-silver hover:text-white hover:bg-pit"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="border-t border-asphalt my-2" />
            <p className="px-4 py-1 text-[10px] text-silver/40 uppercase tracking-widest font-semibold">MotoGP</p>
            {motoLinks.map((link) => {
              const isActive = pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#cc0000] bg-[#cc0000]/10"
                      : "text-silver hover:text-white hover:bg-pit"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        )}
      </nav>
    </header>
  )
}
