import { projectStatusData } from '@/app/mock-data/project';
import Link from 'next/link';

const ProjectChart = () => {
  return (
    <section className="rounded-xl border p-5">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <h2 className="mb-4 text-xl font-bold">프로젝트 현황</h2>
          <span>(총 1,234 개)</span>
        </div>
        <Link href={'#'}>전체보기</Link>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {projectStatusData.map(item => (
          <article key={item.id} className={`rounded-lg border bg-card p-4 ${item.fill}`}>
            <h3 className="text-sm text-muted-foreground">{item.title}</h3>

            <p className="mt-2 text-3xl font-bold">{item.count}</p>

            <span className="mt-1 block text-xs text-muted-foreground">{item.description}</span>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProjectChart;
