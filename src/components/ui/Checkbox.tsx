import { forwardRef, type InputHTMLAttributes } from 'react'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, id, ...props },
  ref,
) {
  const inputId = id ?? props.name

  return (
    <label htmlFor={inputId} className="text-ink-900 flex items-center gap-2 text-sm">
      <input
        id={inputId}
        ref={ref}
        type="checkbox"
        className="text-brand-600 focus:ring-brand-500 border-sand-200 h-4 w-4 rounded"
        {...props}
      />
      {label}
    </label>
  )
})
