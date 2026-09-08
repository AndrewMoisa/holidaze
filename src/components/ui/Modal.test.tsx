import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { Modal } from './Modal'

function Harness() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Delete
      </button>
      {open && (
        <Modal title="Delete this?" onConfirm={() => {}} onCancel={() => setOpen(false)}>
          This cannot be undone.
        </Modal>
      )}
    </>
  )
}

describe('Modal', () => {
  it('is labelled by its heading', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole('button', { name: 'Delete' }))
    expect(screen.getByRole('dialog', { name: 'Delete this?' })).toBeInTheDocument()
  })

  it('focuses the cancel button on open', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole('button', { name: 'Delete' }))
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus()
  })

  it('traps Tab inside the dialog', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole('button', { name: 'Delete' }))
    await user.tab()
    expect(screen.getByRole('button', { name: 'Confirm' })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus()
  })

  it('closes on Escape and restores focus to the opener', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    const opener = screen.getByRole('button', { name: 'Delete' })
    await user.click(opener)
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(opener).toHaveFocus()
  })

  it('locks page scroll while open', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole('button', { name: 'Delete' }))
    expect(document.body.style.overflow).toBe('hidden')
    await user.keyboard('{Escape}')
    expect(document.body.style.overflow).toBe('')
  })
})
