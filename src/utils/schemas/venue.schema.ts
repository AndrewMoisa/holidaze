import { z } from 'zod'

const mediaItemSchema = z.object({
  url: z
    .string()
    .min(1, 'Image URL is required')
    .max(300, 'URL cannot be longer than 300 characters')
    .url('Enter a valid URL'),
  alt: z.string().max(120, 'Alt text cannot be longer than 120 characters').optional(),
})

export const venueFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce
    .number('Price must be a number')
    .min(0, 'Price cannot be negative')
    .max(10_000, 'Price cannot exceed 10,000'),
  maxGuests: z.coerce
    .number('Max guests must be a number')
    .int('Max guests must be a whole number')
    .min(1, 'Must accommodate at least 1 guest')
    .max(100, 'Cannot exceed 100 guests'),
  rating: z.coerce
    .number('Rating must be a number')
    .min(0, 'Rating cannot be less than 0')
    .max(5, 'Rating cannot exceed 5'),
  media: z.array(mediaItemSchema).max(8, 'You cannot have more than 8 images'),
  wifi: z.boolean(),
  parking: z.boolean(),
  breakfast: z.boolean(),
  pets: z.boolean(),
  address: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
  continent: z.string().optional(),
})

export type VenueFormInput = z.input<typeof venueFormSchema>
export type VenueFormValues = z.output<typeof venueFormSchema>

export const venueFormDefaultValues: VenueFormValues = {
  name: '',
  description: '',
  price: 0,
  maxGuests: 1,
  rating: 0,
  media: [],
  wifi: false,
  parking: false,
  breakfast: false,
  pets: false,
  address: '',
  city: '',
  zip: '',
  country: '',
  continent: '',
}
