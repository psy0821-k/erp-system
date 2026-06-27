import { AssetStatus, AssetType } from '@/config/types/asset';

export const ASSET_REPORT_STATUS = {
  PENDING: 'PENDING',
  RECEIVED: 'RECEIVED',
  REPAIRING: 'REPAIRING',
  COMPLETED: 'COMPLETED',
  REJECTED: 'REJECTED',
} as const;

export type AssetReportStatus = (typeof ASSET_REPORT_STATUS)[keyof typeof ASSET_REPORT_STATUS];

export const ASSET_REPORT_STATUS_OPTIONS = [
  { title: '접수대기', value: ASSET_REPORT_STATUS.PENDING },
  { title: '접수완료', value: ASSET_REPORT_STATUS.RECEIVED },
  { title: '수리중', value: ASSET_REPORT_STATUS.REPAIRING },
  { title: '처리완료', value: ASSET_REPORT_STATUS.COMPLETED },
  { title: '반려', value: ASSET_REPORT_STATUS.REJECTED },
] as const;

export const ASSET_REPORT_STATUS_LABEL: Record<AssetReportStatus, string> = {
  [ASSET_REPORT_STATUS.PENDING]: '접수대기',
  [ASSET_REPORT_STATUS.RECEIVED]: '접수완료',
  [ASSET_REPORT_STATUS.REPAIRING]: '수리중',
  [ASSET_REPORT_STATUS.COMPLETED]: '처리완료',
  [ASSET_REPORT_STATUS.REJECTED]: '반려',
};

export interface AssetReport {
  id: string;
  asset_id: string;
  reporter_id: string;
  title: string;
  description: string;
  status: AssetReportStatus;
  admin_message: string | null;
  created_at: string;
  update_at: string | null;

  asset: {
    id: string;
    asset_name: string;
    asset_type: AssetType;
    serial_number: string;
    status: AssetStatus;
  };

  reporter: {
    id: string;
    name: string;
    email: string;
    employee_number: string;
    department: string;
    position: string;
  };
}

export interface CreateAssetReportInput {
  asset_id: string;
  reporter_id: string;
  title: string;
  description: string;
}

export interface UpdateAssetReportStatusInput {
  id: string;
  status: AssetReportStatus;
  admin_message?: string | null;
}

export interface AssetReportListParams {
  page?: string;
  keyword?: string;
  status?: AssetReportStatus | '';
}
