import EmployeeListClient from '../../feature/employees/components/employeesListClient';
import Link from 'next/link';
import EmployeeSearch from '@/app/feature/employees/components/EmployeeSearch';
import EmployeeFiltering from '@/components/filtering/employeeFiltering';

export default async function Page() {
  return (
    <div>
      <section>
        <h2 className="text-4xl font-bold my-4">직원 리스트</h2>
        <div className="mt-12 flex justify-between">
          <EmployeeSearch />
          <div className="flex gap-4 items-start">
            <EmployeeFiltering />
            <Link href="/sign-up" className="bg-blue-700 p-2  text-white font-semibold rounded-2xl">
              직원 등록하기
            </Link>
          </div>
        </div>
        <EmployeeListClient />
      </section>
    </div>
  );
}
