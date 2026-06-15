import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-6xl font-bold font-display text-scarlet mb-4">
        404
      </h1>
      <p className="text-xl text-white mb-2">Page not found</p>
      <p className="text-silver text-sm mb-8 max-w-md text-center">
        This page doesn&apos;t exist. Maybe it was a red flag — or it never
        made it out of the garage.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-scarlet text-white rounded-lg font-semibold hover:bg-scarlet/80 transition-colors"
      >
        Back to PIT WALL
      </Link>
    </div>
  )
}
