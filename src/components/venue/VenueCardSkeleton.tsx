export function VenueCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="border-sand-200 overflow-hidden rounded-2xl border bg-white"
    >
      <div className="shimmer aspect-[4/3]" />
      <div className="space-y-2 p-4">
        <div className="shimmer h-4 w-3/4 rounded" />
        <div className="shimmer h-3 w-1/2 rounded" />
        <div className="shimmer mt-3 h-4 w-1/3 rounded" />
      </div>
    </div>
  )
}
