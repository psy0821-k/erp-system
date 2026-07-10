'use client';

import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useDeleteProjectMember } from '../hooks/useDeleteProjectMember';
import { buttonStyle } from '@/app/style/buttonStyle';
import { cn } from '@/lib/utils';

interface Props {
  memberId: string;
}

export default function ProjectDeleteMemberButton({ memberId }: Props) {
  const { mutate, isPending } = useDeleteProjectMember();

  return (
    <Button
      className={cn(buttonStyle.base, buttonStyle.delete)}
      type="button"
      variant="ghost"
      size="icon"
      disabled={isPending}
      onClick={() => mutate(memberId)}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">참여자 제거</span>
    </Button>
  );
}
