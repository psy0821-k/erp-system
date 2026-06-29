import NoticeDetailPageView from '@/app/feature/notice/components/NoticeDetailPageView';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function NoticeDetailPage({ params }: Props) {
  const { id } = await params;

  return <NoticeDetailPageView id={id} />;
}
