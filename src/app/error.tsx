"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-4xl font-bold font-display text-scarlet mb-4">
        Something went wrong
      </h1>
      <p className="text-silver text-sm mb-8 max-w-md text-center">
        Couldn&apos;t load this page — try refreshing.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-scarlet text-white rounded-lg font-semibold hover:bg-scarlet/80 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
