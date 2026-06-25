import { ASSET_STATUS, ASSET_TYPE } from '@/config/types/asset';
import { z } from 'zod';

export const assetCreateSchema = z.object({
  asset_name: z.string().trim().min(1, '자산명을 입력해주세요.').max(50, '자산명은 50자 이하로 입력해주세요.'),

  asset_type: z.enum([ASSET_TYPE.LAPTOP, ASSET_TYPE.MONITOR, ASSET_TYPE.DESKTOP, ASSET_TYPE.KEYBOARD, ASSET_TYPE.MOUSE]),

  serial_number: z.string().trim().min(1, '시리얼 번호를 입력해주세요.'),

  status: z.enum([ASSET_STATUS.AVAILABLE, ASSET_STATUS.IN_USE, ASSET_STATUS.REPAIR, ASSET_STATUS.LOST, ASSET_STATUS.DISCARDED]),

  assigned_employee_id: z.string().nullish().optional(),

  memo: z.string().trim().max(500, '메모는 500자 이하로 입력해주세요.').nullish().optional(),
});

export type AssetCreateInput = z.infer<typeof assetCreateSchema>;

export const updateAssetSchema = assetCreateSchema.extend({
  id: z.string().min(1),
});

export type UpdateAssetInput = z.infer<typeof updateAssetSchema>;
