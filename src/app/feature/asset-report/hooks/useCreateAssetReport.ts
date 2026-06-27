import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createAssetReport } from '../api/assetReportApi';
import { assetReportKeys } from '../queryKeys/assetReportKeys';

export const useCreateAssetReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAssetReport,

    onSuccess: () => {
      toast.success('고장 신고가 등록되었습니다.');

      queryClient.invalidateQueries({
        queryKey: assetReportKeys.lists(),
      });
    },

    onError: () => {
      toast.error('고장 신고 등록에 실패했습니다.');
    },
  });
};
