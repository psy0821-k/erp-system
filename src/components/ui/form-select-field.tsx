import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  placeholder: string;
  options: SelectOption[];
}

export function FormSelectField<T extends FieldValues>({ name, control, label, placeholder, options }: FormSelectFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>

          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="py-5" id={name}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent position="popper" className="bg-slate-50">
              <SelectGroup>
                <SelectLabel>{label}</SelectLabel>

                {options.map(option => (
                  <SelectItem key={option.value} value={option.value} className="py-1.5">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {fieldState.invalid && <FieldError className="text-red-600" errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
