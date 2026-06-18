import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-asphalt/50 bg-carbon mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1.5">
              <span className="text-scarlet text-sm">&#9632;</span>
              <span className="text-white font-bold tracking-widest uppercase font-display text-sm">
                PIT WALL
              </span>
            </Link>
            <span className="text-asphalt hidden sm:inline">|</span>
            <div className="flex gap-3 text-xs">
              <Link href="/" className="text-silver/60 hover:text-silver transition-colors">F1</Link>
              <Link href="/motogp" className="text-silver/60 hover:text-silver transition-colors">MotoGP</Link>
            </div>
          </div>
          <p className="text-silver/40 text-xs text-center">
            &copy; {new Date().getFullYear()} Pit Wall. Not affiliated with Formula 1 or MotoGP.
          </p>
        </div>
      </div>
    </footer>
  )
}
