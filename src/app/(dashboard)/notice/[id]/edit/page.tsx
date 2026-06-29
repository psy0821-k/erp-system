import NoticeEditPageView from '@/app/feature/notice/components/NoticeEditPageView';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function NoticeEditPage({ params }: Props) {
  const { id } = await params;

  return <NoticeEditPageView id={id} />;
}
