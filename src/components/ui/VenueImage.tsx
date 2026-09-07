import { useState, type ImgHTMLAttributes } from 'react'

const PLACEHOLDER = '/images/no-image-icon.png'

interface VenueImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  alt: string
}

/**
 * Listing photos are hotlinked from wherever the host put them, and plenty of
 * those URLs are dead — a broken image is swapped for the placeholder. The
 * failed URL is tracked (rather than a boolean) so swapping to another photo
 * gets a fresh attempt.
 */
export function VenueImage({ src, alt, ...props }: VenueImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const isBroken = !src || failedSrc === src

  return (
    <img
      src={isBroken ? PLACEHOLDER : src}
      alt={alt}
      onError={() => src && setFailedSrc(src)}
      {...props}
    />
  )
}
