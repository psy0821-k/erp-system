import { VacationCreateInput } from './vacationSchema';

interface Employee {
  id: string;
  name: string;
}

export const getVacationCreateDefaultValues = (employee: Employee | null): VacationCreateInput => ({
  name: employee?.name ?? '',
  employee_id: employee?.id ?? '',
  vacation_title: '',
  vacation_type: 'ANNUAL',
  status: 'PENDING',
  start_date: '',
  end_date: '',
  reason: '',
});
