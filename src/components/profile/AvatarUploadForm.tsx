import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../hooks/useAuth'
import { ApiError } from '../../api/client'
import { avatarSchema, type AvatarFormValues } from '../../utils/schemas/profile.schema'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { ErrorMessage } from '../ui/ErrorMessage'

export function AvatarUploadForm() {
  const { updateAvatar } = useAuth()
  const [formError, setFormError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AvatarFormValues>({ resolver: zodResolver(avatarSchema) })

  const onSubmit = async (values: AvatarFormValues) => {
    setFormError(null)
    setSuccess(false)
    try {
      await updateAvatar(values.url, values.alt)
      setSuccess(true)
      reset()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : 'Failed to update avatar.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {formError && <ErrorMessage message={formError} />}
      {success && <p className="text-brand-700 text-sm">Avatar updated.</p>}

      <Input
        label="Avatar image URL"
        placeholder="https://…"
        error={errors.url?.message}
        {...register('url')}
      />
      <Input
        label="Alt text (optional)"
        error={errors.alt?.message}
        {...register('alt')}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving…' : 'Update avatar'}
      </Button>
    </form>
  )
}
