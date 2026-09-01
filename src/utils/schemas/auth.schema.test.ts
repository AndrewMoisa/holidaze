import { describe, expect, it } from 'vitest'
import { loginSchema, registerSchema } from './auth.schema'

describe('registerSchema', () => {
  const validPayload = {
    name: 'jane_doe',
    email: 'jane@stud.noroff.no',
    password: 'password123',
    venueManager: false,
  }

  it('accepts a valid stud.noroff.no registration', () => {
    expect(registerSchema.safeParse(validPayload).success).toBe(true)
  })

  it('accepts a plain noroff.no email too', () => {
    const result = registerSchema.safeParse({ ...validPayload, email: 'jane@noroff.no' })
    expect(result.success).toBe(true)
  })

  it('rejects a non-noroff email', () => {
    const result = registerSchema.safeParse({ ...validPayload, email: 'jane@gmail.com' })
    expect(result.success).toBe(false)
  })

  it('rejects a name with spaces or punctuation', () => {
    const result = registerSchema.safeParse({ ...validPayload, name: 'jane doe!' })
    expect(result.success).toBe(false)
  })

  it('rejects a password shorter than 8 characters', () => {
    const result = registerSchema.safeParse({ ...validPayload, password: 'short' })
    expect(result.success).toBe(false)
  })
})

describe('loginSchema', () => {
  it('requires both email and password', () => {
    expect(loginSchema.safeParse({ email: '', password: '' }).success).toBe(false)
    expect(
      loginSchema.safeParse({ email: 'jane@stud.noroff.no', password: 'anything' })
        .success,
    ).toBe(true)
  })
})
