'use client';
import { employeesType } from '@/app/feature/employees/types/employeeType';
import EmployeeEditDialog from './employee-edit-dialog';
import EmployeeDeleteButton from './employee-delete-button';
import EmployeeDetailDialog from './EmployeeDetailDialog';

type Props = {
  employees: employeesType[];
};

const EmployeeTable = ({ employees }: Props) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="hidden md:flex items-center bg-slate-50/70 px-6 py-3.5 border-b border-slate-200 text-xs font-semibold text-slate-500 text-center">
        <div className="w-[15%]">사번</div>
        <div className="w-[15%] text-left">이름</div>
        <div className="w-[20%] text-left">부서 / 직위</div>
        <div className="w-[15%]">권한</div>
        <div className="w-[15%]">상태</div>
        <div className="w-[20%] text-right">관리</div>
      </div>

      <div className="divide-y divide-slate-100">
        {employees?.map(employee => (
          <div
            key={employee.id}
            className="flex flex-col md:flex-row md:items-center px-6 py-4 hover:bg-slate-50/50 transition-colors text-center md:text-left gap-2 md:gap-0"
          >
            <div className="w-full md:w-[15%] text-xs font-mono text-slate-400 md:text-center">{employee.employee_number}</div>

            <div className="w-full md:w-[15%] text-left font-bold text-slate-800 text-base md:text-sm">{employee.name}</div>

            <div className="w-full md:w-[20%] text-left text-sm text-slate-600">
              <span className="font-medium text-slate-700">{employee.department}</span>
              <span className="text-slate-400 mx-1.5">|</span>
              <span className="text-slate-500 text-xs">{employee.position}</span>
            </div>

            <div className="w-full md:w-[15%] md:text-center text-sm text-slate-500">
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs">{employee.role}</span>
            </div>

            <div className="w-full md:w-[15%] md:text-center">
              <span
                className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  employee.status === '재직' ? 'bg-emerald-500' : employee.status === '휴직' ? 'bg-amber-400' : 'bg-slate-300'
                }`}
              />
              <span className="text-sm font-medium text-slate-700">{employee.status}</span>
            </div>

            <div className="w-full md:w-[20%] flex items-center justify-center md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-none border-slate-100 mt-2 md:mt-0">
              <EmployeeDetailDialog employee={employee} />
              <div className="flex items-center gap-1">
                <EmployeeEditDialog employee={employee} />
                <EmployeeDeleteButton id={employee.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeTable;
