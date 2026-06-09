import Filtering from '@/components/filtering';
import { SearchComponent } from '@/components/SearchComponent';
import TableComponent from '@/components/table/tableComponent';
import { getFilterParams } from '@/lib/getFilterparams';

interface Props {
  searchParams: Promise<{
    keyword?: string;
    page?: string;
    limit?: string;
  }>;
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const filters = getFilterParams(params);

  return (
    <div>
      <div className="flex justify-between">
        <SearchComponent />
        <Filtering />
      </div>

      <main>
        <section>
          <TableComponent keyword={filters.keyword} page={filters.page} />
        </section>
      </main>
    </div>
  );
}
