export function HomePage() {
  return (
    <div>
      <section className="from-brand-700 to-brand-500 bg-gradient-to-br">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            Find your next stay
          </h1>
          <p className="text-sand-50 mt-2 max-w-md">
            Browse venues from hosts around the world and book your next trip.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-ink-900 text-xl font-semibold">Venues</h2>
        <p className="text-ink-900/60 mt-2">Venue listings will appear here.</p>
      </section>
    </div>
  )
}
