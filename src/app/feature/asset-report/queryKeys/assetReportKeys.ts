import { AssetReportListParams } from '../type/assetReportType';

export const assetReportKeys = {
  all: ['assetReports'] as const,

  lists: () => [...assetReportKeys.all, 'list'] as const,

  list: (params: AssetReportListParams) => [...assetReportKeys.lists(), params] as const,
};
