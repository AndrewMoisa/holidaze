interface VenueMapProps {
  lat: number
  lng: number
  label: string
}

/** OpenStreetMap needs a bounding box; roughly a kilometre around the pin. */
const SPAN = 0.008

export function VenueMap({ lat, lng, label }: VenueMapProps) {
  const bbox = [lng - SPAN, lat - SPAN, lng + SPAN, lat + SPAN].join(',')
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`

  return (
    <div className="border-sand-200 overflow-hidden rounded-2xl border">
      <iframe
        title={`Map showing ${label}`}
        src={src}
        loading="lazy"
        className="h-[320px] w-full border-0"
      />
    </div>
  )
}
