import { z } from 'zod'
import {
  EMAIL_REGEX,
  MAX_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  NAME_REGEX,
} from '../constants'

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(MAX_NAME_LENGTH, `Name cannot be longer than ${MAX_NAME_LENGTH} characters`)
    .regex(NAME_REGEX, 'Name can only contain letters, numbers, and underscores'),
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(EMAIL_REGEX, 'You must register with a stud.noroff.no email address'),
  password: z
    .string()
    .min(
      MIN_PASSWORD_LENGTH,
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    ),
  venueManager: z.boolean(),
})

export type RegisterFormValues = z.infer<typeof registerSchema>
