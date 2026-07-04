import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { resetPassword } from '../api/resetPassword';

export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: resetPassword,

    onSuccess: () => {
      toast.success('비밀번호가 변경되었습니다. 다시 로그인해주세요.');
      router.push('/sign-in');
    },

    onError: error => {
      toast.error(error.message);
    },
  });
};
