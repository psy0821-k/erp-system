import Filtering from '@/components/filtering';
import { SearchComponent } from '@/components/SearchComponent';
import EmployeeListClient from './components/employeesListClient';

export default async function Page() {
  return (
    <div>
      <div className="flex justify-between">
        <SearchComponent />
        <Filtering />
      </div>

      <main>
        <section>
          <EmployeeListClient />
        </section>
      </main>
    </div>
  );
}
