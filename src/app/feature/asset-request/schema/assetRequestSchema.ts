import { z } from 'zod';

import { ASSET_REQUEST_STATUS } from '../type/assetRequestType';
import { ASSET_TYPE } from '@/config/types/asset';

export const createAssetRequestSchema = z.object({
  requester_id: z.string().min(1, '요청자 정보가 필요합니다.'),
  asset_type: z.enum([ASSET_TYPE.LAPTOP, ASSET_TYPE.MONITOR, ASSET_TYPE.DESKTOP, ASSET_TYPE.KEYBOARD, ASSET_TYPE.MOUSE], {
    message: '요청 물품을 선택해주세요.',
  }),
  request_title: z.string().min(2, '제목은 2자 이상 입력해주세요.').max(50, '제목은 50자 이하로 입력해주세요.'),
  reason: z.string().min(5, '요청 사유는 5자 이상 입력해주세요.').max(500, '요청 사유는 500자 이하로 입력해주세요.'),
});

export type CreateAssetRequestFormInput = z.infer<typeof createAssetRequestSchema>;

export const updateAssetRequestStatusSchema = z.object({
  id: z.string().min(1, '요청 ID가 필요합니다.'),
  status: z.enum([ASSET_REQUEST_STATUS.PENDING, ASSET_REQUEST_STATUS.APPROVED, ASSET_REQUEST_STATUS.REJECTED, ASSET_REQUEST_STATUS.COMPLETED], {
    message: '요청 상태를 선택해주세요',
  }),
  admin_message: z.string().max(300, '관리자 메세지는 300자 이하로 입력해주세요.').nullable().optional(),
});

export type UpdateAssetRequestStatusFormInput = z.infer<typeof updateAssetRequestStatusSchema>;
