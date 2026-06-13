import { supabaseAdmin } from '@/lib/admin';

export async function POST(request: Request) {
  const values = await request.json();

  let createdUserId: string | null = null;

  try {
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: values.email,
      password: values.password,
      email_confirm: true,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('유저 생성 실패');

    createdUserId = authData.user.id;

    const { data, error } = await supabaseAdmin
      .from('employees')
      .insert({
        id: createdUserId,
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

    if (error) {
      await supabaseAdmin.auth.admin.deleteUser(createdUserId);
      throw error;
    }

    return Response.json({ data });
  } catch {
    return Response.json({ message: '직원 등록에 실패했습니다.' }, { status: 400 });
  }
}
