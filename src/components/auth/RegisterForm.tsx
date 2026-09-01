import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { ApiError } from '../../api/client'
import { registerSchema, type RegisterFormValues } from '../../utils/schemas/auth.schema'
import { Input } from '../ui/Input'
import { Checkbox } from '../ui/Checkbox'
import { Button } from '../ui/Button'
import { ErrorMessage } from '../ui/ErrorMessage'

export function RegisterForm() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { venueManager: false },
  })

  const onSubmit = async (values: RegisterFormValues) => {
    setFormError(null)
    try {
      await registerUser(values)
      navigate('/', { replace: true })
    } catch (err) {
      setFormError(
        err instanceof ApiError ? err.message : 'Something went wrong. Try again.',
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {formError && <ErrorMessage message={formError} />}

      <Input
        label="Username"
        autoComplete="username"
        error={errors.name?.message}
        {...register('name')}
      />
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@stud.noroff.no"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="Password"
        type="password"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Checkbox
        label="I'm registering as a venue manager"
        {...register('venueManager')}
      />

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Creating account…' : 'Sign up'}
      </Button>
    </form>
  )
}
