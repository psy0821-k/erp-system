import { sendForgotPasswordEmail } from '@/app/feature/changePassword/api/forgotPassword';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: sendForgotPasswordEmail,

    onSuccess: () => {
      toast.success('비밀번호 재설정 메일을 발송했습니다.');
    },

    onError: error => {
      toast.error(error.message);
    },
  });
};
