import { useEffect, useId, useRef, type ReactNode } from 'react'
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

const FOCUSABLE = 'a[href], button:not([disabled])'

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
  const panelRef = useRef<HTMLDivElement>(null)
  // Callers pass inline arrows, so read onCancel through a ref — otherwise the
  // effect below would tear down and re-run on every parent render.
  const onCancelRef = useRef(onCancel)
  const titleId = useId()

  useEffect(() => {
    onCancelRef.current = onCancel
  }, [onCancel])

  // Same contract as MobileMenu: trap focus, close on Escape, lock the page
  // behind the overlay, and hand focus back to whatever opened the dialog.
  useEffect(() => {
    const panel = panelRef.current
    const returnFocusTo = document.activeElement as HTMLElement | null

    // Focus the first control (Cancel) rather than the destructive one.
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancelRef.current()
        return
      }
      if (event.key !== 'Tab' || !panel) return

      const focusable = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)]
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      returnFocusTo?.focus()
    }
  }, [])

  return (
    <div className="bg-ink-900/40 fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2 id={titleId} className="font-display text-ink-900 text-lg font-semibold">
          {title}
        </h2>
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
