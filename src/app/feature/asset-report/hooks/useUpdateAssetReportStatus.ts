import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateAssetReportStatus } from '../api/assetReportApi';
import { assetReportKeys } from '../queryKeys/assetReportKeys';

export const useUpdateAssetReportStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAssetReportStatus,

    onSuccess: () => {
      toast.success('처리 상태가 변경되었습니다.');

      queryClient.invalidateQueries({
        queryKey: assetReportKeys.lists(),
      });
    },

    onError: () => {
      toast.error('처리 상태 변경에 실패했습니다.');
    },
  });
};
