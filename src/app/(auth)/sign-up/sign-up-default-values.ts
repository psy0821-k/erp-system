import { z } from 'zod';
import { formSchema } from './sign-up-schema';

export const signUpDefaultValues: z.infer<typeof formSchema> = {
  name: '',
  email: '',
  password: 'Password123!',
  department: '',
  position: '',
  role: 'EMPLOYEE',
  status: 'ACTIVE',
  hire_date: '',
  authority_value: 0,
};
