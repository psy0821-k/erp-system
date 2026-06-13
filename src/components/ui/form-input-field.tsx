import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { LucideIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';

interface FormInputFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  autoComplete?: string;
  icon?: LucideIcon;
  type?: string;
}

export function FormInputField<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  autoComplete,
  icon: Icon,
  type = 'text',
}: FormInputFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>

          <div className="relative">
            {Icon && <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />}

            <Input
              {...field}
              id={name}
              type={type}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              autoComplete={autoComplete}
              className={Icon ? 'h-11 pl-10' : 'h-11'}
            />
          </div>

          {fieldState.invalid && <FieldError className="text-red-600" errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
