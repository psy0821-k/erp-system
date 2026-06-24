import { ASSET_STATUS, ASSET_TYPE } from '@/config/types/asset';
import { AssetCreateInput } from './assetSchema';

export const assetCreateDefaultValues: AssetCreateInput = {
  asset_name: '',
  asset_type: ASSET_TYPE.LAPTOP,
  serial_number: '',
  status: ASSET_STATUS.AVAILABLE,
  assigned_employee_id: null,
  memo: null,
};
