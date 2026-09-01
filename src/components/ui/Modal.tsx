import type { ReactNode } from 'react'
import { Button } from './Button'

interface ModalProps {
  title: string
  children?: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  isConfirming?: boolean
  variant?: 'primary' | 'danger'
}

export function Modal({
  title,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isConfirming = false,
  variant = 'primary',
}: ModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="bg-ink-900/40 fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-ink-900 text-lg font-semibold">{title}</h2>
        {children && <div className="text-ink-900/70 mt-2 text-sm">{children}</div>}
        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isConfirming}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={variant}
            onClick={onConfirm}
            disabled={isConfirming}
          >
            {isConfirming ? 'Please wait…' : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
