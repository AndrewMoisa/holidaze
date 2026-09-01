import type { Profile } from '../../../types/profile'

export function makeProfile(overrides: Partial<Profile> = {}): Profile {
  return {
    name: 'test_user',
    email: 'test_user@stud.noroff.no',
    bio: null,
    avatar: undefined,
    banner: undefined,
    venueManager: false,
    ...overrides,
  }
}
