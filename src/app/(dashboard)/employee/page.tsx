import Filtering from '@/components/filtering';
import TableComponent from '@/components/table/tableComponent';

const Page = async () => {
  return (
    <div>
      <Filtering />
      <main>
        <section>
          <TableComponent />
        </section>
      </main>
    </div>
  );
};

export default Page;
