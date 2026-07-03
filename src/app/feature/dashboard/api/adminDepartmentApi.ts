import { createClient } from '@/lib/client';
import { DepartmentType } from '@/config/types/department';
import { DepartmentChartItem } from '../types/dashBoardType';

export const getDepartment = async (): Promise<DepartmentChartItem[]> => {
  const supabase = createClient();

  const { data, error } = await supabase.from('employees').select('department');

  if (error) throw error;

  const departmentMap = new Map<DepartmentType, number>();

  data.forEach(employee => {
    if (!employee.department) return;

    const department = employee.department as DepartmentType;

    departmentMap.set(department, (departmentMap.get(department) ?? 0) + 1);
  });

  return Array.from(departmentMap.entries()).map(([department, count]) => ({
    department,
    count,
  }));
};
