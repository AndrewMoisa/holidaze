import { useState } from 'react'
import type { MediaItem } from '../../types/profile'

export function VenueGallery({
  media,
  venueName,
}: {
  media: MediaItem[] | null
  venueName: string
}) {
  const images =
    media && media.length > 0
      ? media
      : [{ url: '/images/no-image-icon.png', alt: venueName }]
  const [activeIndex, setActiveIndex] = useState(0)
  const active = images[activeIndex]

  return (
    <div>
      <div className="bg-sand-100 aspect-[16/9] overflow-hidden rounded-lg">
        <img
          src={active.url}
          alt={active.alt || venueName}
          className="h-full w-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image.url + index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`bg-sand-100 h-16 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                index === activeIndex ? 'border-brand-600' : 'border-transparent'
              }`}
            >
              <img
                src={image.url}
                alt={image.alt || venueName}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
