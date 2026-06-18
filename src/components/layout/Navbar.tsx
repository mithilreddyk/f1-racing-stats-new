"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sports = [
  { key: "f1", label: "F1", prefix: "/", color: "#E8002D" },
  { key: "motogp", label: "MotoGP", prefix: "/motogp", color: "#7B2D8E" },
]

const f1Links = [
  { href: "/", label: "Home" },
  { href: "/drivers", label: "Drivers" },
  { href: "/constructors", label: "Teams" },
  { href: "/schedule", label: "Schedule" },
]

const motogpLinks = [
  { href: "/motogp", label: "Overview" },
  { href: "/motogp/riders", label: "Riders" },
  { href: "/motogp/teams", label: "Teams" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isMotoGP = pathname.startsWith("/motogp")
  const activeSport = isMotoGP ? "motogp" : "f1"
  const navLinks = isMotoGP ? motogpLinks : f1Links
  const accentColor = isMotoGP ? "#7B2D8E" : "#E8002D"

  return (
    <header className="sticky top-0 z-50 border-b border-asphalt/80 bg-carbon/90 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo + Sport Switcher */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-white font-bold text-lg tracking-widest uppercase"
            >
              <span style={{ color: accentColor }} className="text-xl">&#9632;</span>
              <span className="font-display hidden sm:inline">PIT WALL</span>
            </Link>

            {/* Sport pills */}
            <div className="flex items-center bg-pit rounded-full p-0.5 border border-asphalt/50">
              {sports.map((s) => (
                <Link
                  key={s.key}
                  href={s.key === "f1" ? "/" : "/motogp"}
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    activeSport === s.key
                      ? "text-white shadow-sm"
                      : "text-silver/60 hover:text-silver"
                  }`}
                  style={activeSport === s.key ? { backgroundColor: s.color } : {}}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" || link.href === "/motogp"
                  ? pathname === link.href
                  : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-silver/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-silver hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-asphalt/50 space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" || link.href === "/motogp"
                  ? pathname === link.href
                  : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-white bg-white/10"
                      : "text-silver hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="pt-2 px-4 flex gap-2">
              {sports.map((s) => (
                <Link
                  key={s.key}
                  href={s.key === "f1" ? "/" : "/motogp"}
                  onClick={() => setMobileOpen(false)}
                  className={`flex-1 text-center px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    activeSport === s.key ? "text-white" : "text-silver/60 bg-pit border border-asphalt/50"
                  }`}
                  style={activeSport === s.key ? { backgroundColor: s.color } : {}}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
