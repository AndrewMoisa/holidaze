export function Spinner({ label = 'Loading…' }: { label?: string }) {
  return (
    <div role="status" className="flex items-center justify-center py-10">
      <div className="border-sand-200 border-t-brand-600 h-6 w-6 animate-spin rounded-full border-2" />
      <span className="sr-only">{label}</span>
    </div>
  )
}
