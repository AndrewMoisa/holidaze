import { z } from 'zod'

export const avatarSchema = z.object({
  url: z
    .string()
    .min(1, 'Image URL is required')
    .max(300, 'URL cannot be longer than 300 characters')
    .url('Enter a valid URL'),
  alt: z.string().max(120, 'Alt text cannot be longer than 120 characters').optional(),
})

export type AvatarFormValues = z.infer<typeof avatarSchema>
