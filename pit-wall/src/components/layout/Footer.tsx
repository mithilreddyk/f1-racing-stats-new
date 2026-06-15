export default function Footer() {
  return (
    <footer className="border-t border-asphalt bg-carbon mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-scarlet text-lg">■</span>
            <span className="text-white font-bold tracking-widest uppercase font-display">
              PIT WALL
            </span>
          </div>
          <p className="text-silver text-sm text-center">
            Built for new F1 fans. Data sourced from{" "}
            <a
              href="https://ergast.com/mrd/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-scarlet hover:underline"
            >
              Ergast API
            </a>
            .
          </p>
          <p className="text-asphalt text-xs">
            &copy; {new Date().getFullYear()} Pit Wall. Not affiliated with
            Formula 1.
          </p>
        </div>
      </div>
    </footer>
  )
}
