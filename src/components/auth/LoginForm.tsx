import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocation, useNavigate, type Location } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { ApiError } from '../../api/client'
import { loginSchema, type LoginFormValues } from '../../utils/schemas/auth.schema'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { ErrorMessage } from '../ui/ErrorMessage'

export function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (values: LoginFormValues) => {
    setFormError(null)
    try {
      await login(values)
      const from = (location.state as { from?: Location })?.from
      navigate(from?.pathname ?? '/', { replace: true })
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
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="Password"
        type="password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password')}
      />

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Logging in…' : 'Log in'}
      </Button>
    </form>
  )
}
