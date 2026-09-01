import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  venueFormDefaultValues,
  venueFormSchema,
  type VenueFormInput,
  type VenueFormValues,
} from '../../utils/schemas/venue.schema'
import { Input } from '../ui/Input'
import { TextArea } from '../ui/TextArea'
import { Checkbox } from '../ui/Checkbox'
import { Button } from '../ui/Button'
import { ErrorMessage } from '../ui/ErrorMessage'

interface VenueFormProps {
  defaultValues?: VenueFormValues
  onSubmit: (values: VenueFormValues) => Promise<void>
  submitLabel: string
  formError?: string | null
}

export function VenueForm({
  defaultValues,
  onSubmit,
  submitLabel,
  formError,
}: VenueFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VenueFormInput, unknown, VenueFormValues>({
    resolver: zodResolver(venueFormSchema),
    defaultValues: defaultValues ?? venueFormDefaultValues,
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'media' })

  const submit = async (values: VenueFormValues) => {
    try {
      await onSubmit(values)
    } catch {
      // surfaced to the user via the formError prop
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6" noValidate>
      {formError && <ErrorMessage message={formError} />}

      <Input label="Name" error={errors.name?.message} {...register('name')} />
      <TextArea
        label="Description"
        error={errors.description?.message}
        {...register('description')}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price / night"
          type="number"
          min={0}
          max={10000}
          step="0.01"
          error={errors.price?.message}
          {...register('price')}
        />
        <Input
          label="Max guests"
          type="number"
          min={1}
          max={100}
          error={errors.maxGuests?.message}
          {...register('maxGuests')}
        />
      </div>

      <Input
        label="Rating (0-5)"
        type="number"
        min={0}
        max={5}
        step="0.1"
        error={errors.rating?.message}
        {...register('rating')}
      />

      <fieldset className="space-y-2">
        <legend className="text-ink-900 text-sm font-medium">Amenities</legend>
        <div className="flex flex-wrap gap-4">
          <Checkbox label="Wifi" {...register('wifi')} />
          <Checkbox label="Parking" {...register('parking')} />
          <Checkbox label="Breakfast" {...register('breakfast')} />
          <Checkbox label="Pets allowed" {...register('pets')} />
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-ink-900 text-sm font-medium">Location (optional)</legend>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Address" {...register('address')} />
          <Input label="City" {...register('city')} />
          <Input label="Zip" {...register('zip')} />
          <Input label="Country" {...register('country')} />
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-ink-900 text-sm font-medium">Images</legend>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-2">
            <div className="flex-1 space-y-2">
              <Input
                label="Image URL"
                error={errors.media?.[index]?.url?.message}
                {...register(`media.${index}.url`)}
              />
              <Input
                label="Alt text"
                error={errors.media?.[index]?.alt?.message}
                {...register(`media.${index}.alt`)}
              />
            </div>
            <Button
              type="button"
              variant="secondary"
              onClick={() => remove(index)}
              className="mt-6"
            >
              Remove
            </Button>
          </div>
        ))}
        {fields.length < 8 && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => append({ url: '', alt: '' })}
          >
            Add image
          </Button>
        )}
        {errors.media?.message && <ErrorMessage message={errors.media.message} />}
      </fieldset>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Saving…' : submitLabel}
      </Button>
    </form>
  )
}
