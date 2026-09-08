import { forwardRef, type TextareaHTMLAttributes } from 'react'
import clsx from 'clsx'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, error, id, className, ...props },
  ref,
) {
  const inputId = id ?? props.name

  return (
    <div>
      <label htmlFor={inputId} className="text-ink-900 mb-1 block text-sm font-medium">
        {label}
      </label>
      <textarea
        id={inputId}
        ref={ref}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        rows={4}
        className={clsx(
          'focus:border-brand-600 border-sand-400 w-full rounded-md border bg-white px-3 py-2 text-sm',
          error && 'border-red-600',
          className,
        )}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
})
