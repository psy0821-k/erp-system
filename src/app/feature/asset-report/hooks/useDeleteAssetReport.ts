import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { assetReportKeys } from '../queryKeys/assetReportKeys';
import { deleteAssetReport } from '../api/assetReportApi';

export const useDeleteAssetReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAssetReport,

    onSuccess: () => {
      toast.success('고장 신고가 삭제되었습니다.');

      queryClient.invalidateQueries({
        queryKey: assetReportKeys.lists(),
      });
    },

    onError: () => {
      toast.error('고장 신고 삭제에 실패했습니다.');
    },
  });
};
