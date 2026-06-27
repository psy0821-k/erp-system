import { z } from 'zod';

import { ASSET_REPORT_STATUS } from '../type/assetReportType';

export const createAssetReportSchema = z.object({
  asset_id: z.string().min(1, '자산을 선택해주세요.'),
  reporter_id: z.string().min(1, '신고자 정보가 필요합니다.'),
  title: z.string().min(2, '제목은 2자 이상 입력해주세요.').max(50, '제목은 50자 이하로 입력해주세요.'),
  description: z.string().min(5, '고장 내용은 5자 이상 입력해주세요.').max(500, '고장 내용은 500자 이하로 입력해주세요.'),
});

export type CreateAssetReportFormInput = z.infer<typeof createAssetReportSchema>;

export const updateAssetReportStatusSchema = z.object({
  id: z.string().min(1, '고장 신고 ID가 필요합니다.'),
  status: z.enum([
    ASSET_REPORT_STATUS.PENDING,
    ASSET_REPORT_STATUS.RECEIVED,
    ASSET_REPORT_STATUS.REPAIRING,
    ASSET_REPORT_STATUS.COMPLETED,
    ASSET_REPORT_STATUS.REJECTED,
  ]),
  admin_message: z.string().max(100, '관리자 메세지는 100자 이하로 입력해주세요.').nullable().optional(),
});

export type UpdateAssetReportStatusFormInput = z.infer<typeof updateAssetReportStatusSchema>;
