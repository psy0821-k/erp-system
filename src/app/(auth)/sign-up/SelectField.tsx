import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Controller, Control, Path } from 'react-hook-form';
import z from 'zod';
import { formSchema } from './sign-up-schema';

type SignUpFormValues = z.infer<typeof formSchema>;

type SelectOption = {
  title: string;
  value: string;
};

type FormSelectFieldProps = {
  name: Path<SignUpFormValues>;
  label: string;
  placeholder?: string;
  control: Control<SignUpFormValues>;
  options: readonly SelectOption[];
};

export const FormSelectField = ({ name, label, placeholder, control, options }: FormSelectFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{label}</FieldLabel>

          <Select value={String(field.value ?? '')} onValueChange={field.onChange}>
            <SelectTrigger className="h-11 w-full">
              <SelectValue placeholder={placeholder ?? `${label} 선택`} />
            </SelectTrigger>

            <SelectContent position="popper" className="bg-white">
              {options.map(option => (
                <SelectItem key={option.value} className="cursor-pointer hover:bg-slate-200" value={option.value}>
                  {option.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
