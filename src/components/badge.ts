import { cn } from '@/lib/utils';
import { AssetStatus, ASSET_STATUS } from '@/config/types/asset';
import { PROJECT_STATUS, ProjectStatus } from '@/app/feature/project/types/projectType';
import { ATTENDANCE_STATUS, AttendanceStatus } from '@/config/types/attendanceStatus';
import { APPROVAL_STATUS, ApprovalStatus } from '@/config/types/approvalStatus';
import { ASSET_REPORT_STATUS, AssetReportStatus } from '@/app/feature/asset-report/type/assetReportType';
import { ASSET_REQUEST_STATUS, AssetRequestStatus } from '@/app/feature/asset-request/type/assetRequestType';

export const statusBadgeStyle = {
  approved: 'border-emerald-300 bg-emerald-200 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-900 dark:text-emerald-200',
  pending: 'border-amber-300 bg-amber-200 text-amber-900 dark:border-amber-700 dark:bg-amber-900 dark:text-amber-200',
  rejected: 'border-rose-300 bg-rose-200 text-rose-900 dark:border-rose-700 dark:bg-rose-900 dark:text-rose-200',
  late: 'border-orange-300 bg-orange-200 text-orange-900 dark:border-orange-700 dark:bg-orange-900 dark:text-orange-200',
  success: 'border-lime-300 bg-lime-200 text-lime-900 dark:border-lime-700 dark:bg-lime-900 dark:text-lime-200',
  muted: 'border-slate-300 bg-slate-200 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200',
  progress: 'border-sky-300 bg-sky-200 text-sky-900 dark:border-sky-700 dark:bg-sky-900 dark:text-sky-200',
  danger: 'border-red-300 bg-red-200 text-red-900 dark:border-red-700 dark:bg-red-900 dark:text-red-200',
} as const;

export type StatusBadgeVariant = keyof typeof statusBadgeStyle;

export const getStatusBadgeClassName = (variant: StatusBadgeVariant, className?: string) => {
  return cn('border font-medium', statusBadgeStyle[variant], className);
};

export const APPROVAL_BADGE_MAP: Record<ApprovalStatus, StatusBadgeVariant> = {
  [APPROVAL_STATUS.PENDING]: 'pending',
  [APPROVAL_STATUS.APPROVED]: 'approved',
  [APPROVAL_STATUS.CANCELLED]: 'danger',
  [APPROVAL_STATUS.REJECTED]: 'rejected',
};

export const ATTENDANCE_STATUS_BADGE_MAP: Record<AttendanceStatus, StatusBadgeVariant> = {
  [ATTENDANCE_STATUS.PRESENT]: 'success',
  [ATTENDANCE_STATUS.LATE]: 'late',
  [ATTENDANCE_STATUS.ABSENT]: 'danger',
  [ATTENDANCE_STATUS.BUSINESS_TRIP]: 'progress',
  [ATTENDANCE_STATUS.VACATION]: 'approved',
};

export const ASSET_STATUS_BADGE_MAP: Record<AssetStatus, StatusBadgeVariant> = {
  [ASSET_STATUS.AVAILABLE]: 'success',
  [ASSET_STATUS.IN_USE]: 'progress',
  [ASSET_STATUS.REPAIR]: 'pending',
  [ASSET_STATUS.LOST]: 'danger',
  [ASSET_STATUS.DISCARDED]: 'muted',
};

export const ASSET_REPORT_STATUS_BADGE_MAP: Record<AssetReportStatus, StatusBadgeVariant> = {
  [ASSET_REPORT_STATUS.PENDING]: 'pending',
  [ASSET_REPORT_STATUS.RECEIVED]: 'progress',
  [ASSET_REPORT_STATUS.REPAIRING]: 'late',
  [ASSET_REPORT_STATUS.COMPLETED]: 'approved',
  [ASSET_REPORT_STATUS.REJECTED]: 'rejected',
};

export const PROJECT_STATUS_BADGE_MAP: Record<ProjectStatus, StatusBadgeVariant> = {
  [PROJECT_STATUS.WAITING]: 'pending',
  [PROJECT_STATUS.IN_PROGRESS]: 'progress',
  [PROJECT_STATUS.COMPLETED]: 'success',
};

export const ASSET_REQUEST_STATUS_BADGE_MAP: Record<AssetRequestStatus, StatusBadgeVariant> = {
  [ASSET_REQUEST_STATUS.PENDING]: 'pending',
  [ASSET_REQUEST_STATUS.APPROVED]: 'approved',
  [ASSET_REQUEST_STATUS.REJECTED]: 'rejected',
  [ASSET_REQUEST_STATUS.COMPLETED]: 'success',
  [ASSET_REQUEST_STATUS.CANCELLED]: 'muted',
};
