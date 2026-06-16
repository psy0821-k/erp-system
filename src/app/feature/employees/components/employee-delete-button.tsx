'use client';

import { Button } from '@/components/ui/button';
import { useDeleteEmployee } from '../hooks/useDeleteEmployee';

type EmployeeDeleteButtonProps = {
  id: string;
};

export default function EmployeeDeleteButton({ id }: EmployeeDeleteButtonProps) {
  const { mutate, isPending } = useDeleteEmployee();

  const handleDelete = () => {
    const confirmed = window.confirm('정말 삭제하시겠습니까?');

    if (!confirmed) return;

    mutate(id);
  };

  return (
    <Button
      type="button"
      variant="destructive"
      className=" ml-3 cursor-pointer bg-red-600 text-white "
      size="sm"
      disabled={isPending}
      onClick={handleDelete}
    >
      {isPending ? '삭제 중...' : '삭제'}
    </Button>
  );
}
