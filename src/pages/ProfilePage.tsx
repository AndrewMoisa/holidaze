import { useAuth } from '../hooks/useAuth'
import { AvatarUploadForm } from '../components/profile/AvatarUploadForm'

export function ProfilePage() {
  const { profile } = useAuth()

  if (!profile) return null

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="flex items-center gap-4">
        <img
          src={profile.avatar?.url || '/images/no-img.svg'}
          alt={profile.avatar?.alt || profile.name}
          className="border-sand-200 h-16 w-16 rounded-full border object-cover"
        />
        <div>
          <h1 className="text-ink-900 text-2xl font-semibold">{profile.name}</h1>
          <p className="text-ink-900/60">{profile.email}</p>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-ink-900/50">Account type</dt>
          <dd className="text-ink-900">
            {profile.venueManager ? 'Venue manager' : 'Customer'}
          </dd>
        </div>
      </dl>

      <div className="mt-8">
        <h2 className="text-ink-900 mb-3 text-lg font-medium">Update avatar</h2>
        <AvatarUploadForm />
      </div>
    </div>
  )
}
