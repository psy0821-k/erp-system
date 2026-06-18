import { createClient } from '@/lib/client';
import { ApprovalStatus, CreateVacationDTO, VacationsResponse } from '../type/vacationType';
import { useQuery } from '@tanstack/react-query';
import { vacationKeys } from '../keys/queryKeys';

const PAGE_SIZE = 10;

export const getVacations = async ({ pageParam = 0 }: { pageParam?: number }): Promise<VacationsResponse> => {
  const supabase = createClient();

  const from = pageParam * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from('vacations')
    .select(
      `
      *,
      employee:employees!vacations_employee_id_fkey (
        id,
        name,
        employee_number,
        email,
        department,
        position
      )
    `
    )
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    throw error;
  }

  return {
    vacations: data ?? [],
    nextPage: data && data.length === PAGE_SIZE ? pageParam + 1 : undefined,
    count: count ?? 0,
  };
};
export const createVacation = async (values: CreateVacationDTO) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('vacations')
    .insert({
      ...values,
      status: 'PENDING',
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getMyVacations = async (statuses?: ApprovalStatus[]) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  let query = supabase
    .from('vacations')
    .select(
      `
    *,
    employee:employees!vacations_employee_id_fkey (
      id,
      name,
      employee_number,
      email,
      department,
      position
    ),
    approver:employees!vacations_approver_id_fkey (
      id,
      name,
      email,
      department,
      position
    )
  `
    )
    .eq('employee_id', user.id);

  if (statuses?.length) {
    query = query.in('status', statuses);
  }

  const { data, error } = await query;

  if (error) return [];

  return data;
};

const getTodayKST = () => {
  const now = new Date();

  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);

  return kst.toISOString().split('T')[0];
};

export const getVacationSummary = async () => {
  const supabase = await createClient();

  const today = getTodayKST();

  const { count: todayVacationCount } = await supabase
    .from('vacations')
    .select('*', { count: 'exact', head: true })
    .lte('start_date', today)
    .gte('end_date', today)
    .eq('status', 'APPROVED');

  const { count: pendingCount } = await supabase.from('vacations').select('*', { count: 'exact', head: true }).eq('status', 'PENDING');

  const { count: approvedCount } = await supabase.from('vacations').select('*', { count: 'exact', head: true }).eq('status', 'APPROVED');

  const { count: rejectedCount } = await supabase.from('vacations').select('*', { count: 'exact', head: true }).eq('status', 'REJECTED');

  return [
    {
      title: '오늘 휴가자',
      value: todayVacationCount ?? 0,
      description: '오늘 승인된 휴가자',
    },
    {
      title: '승인 대기',
      value: pendingCount ?? 0,
      description: '처리가 필요한 휴가 신청',
    },
    {
      title: '승인 완료',
      value: approvedCount ?? 0,
      description: '승인된 휴가 신청',
    },
    {
      title: '반려',
      value: rejectedCount ?? 0,
      description: '반려된 휴가 신청',
    },
  ];
};

export function useVacationEmployees(statuses: ApprovalStatus[]) {
  return useQuery({
    queryKey: vacationKeys.list(statuses),
    queryFn: () => getMyVacations(statuses),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
