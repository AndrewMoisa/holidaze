import { useState } from 'react'
import type { MediaItem } from '../../types/profile'
import { VenueImage } from '../ui/VenueImage'

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
    <div className="md:flex md:items-start md:gap-3">
      <div className="bg-sand-100 relative aspect-[16/9] overflow-hidden rounded-2xl md:order-last md:flex-1">
        <VenueImage
          src={active.url}
          alt={active.alt || venueName}
          className="h-full w-full object-cover"
        />
        {images.length > 1 && (
          <span className="bg-ink-900/70 absolute right-3 bottom-3 rounded-full px-2.5 py-1 text-xs font-medium text-white">
            {activeIndex + 1} / {images.length}
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto md:mt-0 md:w-20 md:shrink-0 md:flex-col md:overflow-x-visible">
          {images.map((image, index) => (
            <button
              key={image.url + index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`bg-sand-100 h-16 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                index === activeIndex ? 'border-brand-600' : 'border-transparent'
              }`}
            >
              <VenueImage
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
