export function EmptyState({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="border-sand-200 rounded-lg border border-dashed px-6 py-12 text-center">
      <p className="text-ink-900 font-medium">{title}</p>
      {description && <p className="text-ink-900/60 mt-1 text-sm">{description}</p>}
    </div>
  )
}
