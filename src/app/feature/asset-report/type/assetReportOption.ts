import { ASSET_REPORT_STATUS } from './assetReportType';

export const ASSET_REPORT_STATUS_OPTIONS = [
  {
    title: '접수대기',
    value: ASSET_REPORT_STATUS.PENDING,
  },
  {
    title: '접수완료',
    value: ASSET_REPORT_STATUS.RECEIVED,
  },
  {
    title: '수리중',
    value: ASSET_REPORT_STATUS.REPAIRING,
  },
  {
    title: '처리완료',
    value: ASSET_REPORT_STATUS.COMPLETED,
  },
  {
    title: '반려',
    value: ASSET_REPORT_STATUS.REJECTED,
  },
];
