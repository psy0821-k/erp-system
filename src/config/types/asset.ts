export const ASSET_TYPE = {
  LAPTOP: 'LAPTOP',
  MONITOR: 'MONITOR',
  DESKTOP: 'DESKTOP',
  KEYBOARD: 'KEYBOARD',
  MOUSE: 'MOUSE',
} as const;

export type AssetType = (typeof ASSET_TYPE)[keyof typeof ASSET_TYPE];

export const ASSET_TYPE_OPTIONS = [
  { title: '노트북', value: ASSET_TYPE.LAPTOP },
  { title: '모니터', value: ASSET_TYPE.MONITOR },
  { title: '본체', value: ASSET_TYPE.DESKTOP },
  { title: '키보드', value: ASSET_TYPE.KEYBOARD },
  { title: '마우스', value: ASSET_TYPE.MOUSE },
];

export const ASSET_TYPE_LABEL: Record<AssetType, string> = {
  [ASSET_TYPE.LAPTOP]: '노트북',
  [ASSET_TYPE.MONITOR]: '모니터',
  [ASSET_TYPE.DESKTOP]: '본체',
  [ASSET_TYPE.KEYBOARD]: '키보드',
  [ASSET_TYPE.MOUSE]: '마우스',
};

export const ASSET_STATUS = {
  AVAILABLE: 'AVAILABLE',
  IN_USE: 'IN_USE',
  REPAIR: 'REPAIR',
  LOST: 'LOST',
  DISCARDED: 'DISCARDED',
} as const;

export type AssetStatus = (typeof ASSET_STATUS)[keyof typeof ASSET_STATUS];

export const ASSET_STATUS_OPTIONS = [
  { title: '사용 가능', value: ASSET_STATUS.AVAILABLE },
  { title: '사용 중', value: ASSET_STATUS.IN_USE },
  { title: '수리 중', value: ASSET_STATUS.REPAIR },
  { title: '분실', value: ASSET_STATUS.LOST },
  { title: '폐기', value: ASSET_STATUS.DISCARDED },
] as const;

export const ASSET_STATUS_LABEL: Record<AssetStatus, string> = {
  [ASSET_STATUS.AVAILABLE]: '사용 가능',
  [ASSET_STATUS.IN_USE]: '사용 중',
  [ASSET_STATUS.REPAIR]: '수리 중',
  [ASSET_STATUS.LOST]: '분실',
  [ASSET_STATUS.DISCARDED]: '폐기',
};

export interface Asset {
  id: string;
  asset_name: string;
  asset_type: AssetType;
  status: AssetStatus;
  serial_number: string | null;
  memo: string | null;
  assigned_employee_id: string | null;
  created_at: string;
}

export interface CreateAssetInput {
  asset_name: string;
  asset_type: AssetType;
  serial_number: string;
  status: AssetStatus;
  assigned_employee_id?: string | null;
  memo?: string | null;
}
