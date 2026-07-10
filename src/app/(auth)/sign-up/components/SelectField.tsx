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
          <FieldLabel htmlFor={selectId} className="text-slate-700 dark:text-slate-200">
            {label}
          </FieldLabel>

          <select
            {...field}
            id={selectId}
            aria-invalid={fieldState.invalid}
            className="
              h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm
              text-slate-900 outline-none transition-colors
              focus-visible:border-slate-900 focus-visible:ring-2
              focus-visible:ring-slate-900/30
              disabled:cursor-not-allowed disabled:opacity-50
              aria-invalid:border-red-600 aria-invalid:ring-2 aria-invalid:ring-red-600/20
              dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100
              dark:focus-visible:border-slate-100
              dark:focus-visible:ring-slate-100/30
              dark:aria-invalid:border-red-500
              dark:aria-invalid:ring-red-500/30
            "
          >
            <option value="" className="bg-white text-slate-500 dark:bg-slate-950 dark:text-slate-400">
              {placeholder ?? `${label} 선택`}
            </option>

            {options.map(option => (
              <option key={option.value} value={option.value} className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
                {option.title}
              </option>
            ))}
          </select>

          {fieldState.invalid && <FieldError className="text-red-700 dark:text-red-400" errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
