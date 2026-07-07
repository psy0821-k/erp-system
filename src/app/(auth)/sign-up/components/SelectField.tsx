import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';

interface Option {
  title: string;
  value: string;
}

interface FormSelectFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  options: readonly Option[];
  placeholder?: string;
}

export function FormSelectField<T extends FieldValues>({ name, control, label, options, placeholder }: FormSelectFieldProps<T>) {
  const selectId = String(name);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={selectId}>{label}</FieldLabel>

          <select
            {...field}
            id={selectId}
            aria-invalid={fieldState.invalid}
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
          >
            <option value="">{placeholder ?? `${label} 선택`}</option>

            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.title}
              </option>
            ))}
          </select>

          {fieldState.invalid && <FieldError className="text-red-600" errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
