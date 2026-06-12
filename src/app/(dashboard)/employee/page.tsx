import Filtering from '@/components/filtering';
import { SearchComponent } from '@/components/SearchComponent';
import EmployeeListClient from './components/employeesListClient';
import Link from 'next/link';

export default async function Page() {
  return (
    <div>
      <div className="flex justify-between">
        <SearchComponent />
        <div className="flex gap-4 items-start">
          <Filtering />
          <Link href="/sign-up" className="bg-blue-700 p-2  text-white font-semibold rounded-2xl">
            직원 등록하기
          </Link>
        </div>
      </div>

      <main>
        <section>
          <EmployeeListClient />
        </section>
      </main>
    </div>
  );
}
