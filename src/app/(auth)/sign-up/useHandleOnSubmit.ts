import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { createClient } from '@/lib/client';
import { formSchema } from './sign-up-schema';

export const useHandleOnSubmit = () => {
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toast('직원 등록 시도', {
      description: JSON.stringify(values, null, 2),
      position: 'bottom-right',
    });

    const supabase = createClient();

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (authError) {
      toast.error(authError.message);
      return;
    }

    if (!authData.user) {
      toast.error('회원가입 정보를 확인할 수 없습니다.');
      return;
    }

    const { data: dbData, error: dbError } = await supabase
      .from('employees')
      .insert({
        id: authData.user.id,
        name: values.name,
        email: values.email,
        department: values.department,
        position: values.position,
        employee_number: values.employee_number,
        role: values.role,
        status: 'ACTIVE',
        hire_date: values.hire_date,
        authority_level: 0,
      })
      .select()
      .single();

    if (dbError) {
      toast.error(`직원 정보 저장 실패: ${dbError.message}`);
      return;
    }

    if (dbData) {
      toast.success('직원등록에 성공했습니다');
      router.push('/employee');
    }
  };

  return { onSubmit };
};
