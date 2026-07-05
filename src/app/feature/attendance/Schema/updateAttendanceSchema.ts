import { z } from 'zod';

export const updateAdminAttendanceSchema = z.object({
  id: z.string(),
  status: z.enum(['PRESENT', 'LATE', 'ABSENT', 'VACATION', 'BUSINESS_TRIP']),
});

export const updateUserAttendanceSchema = z.object({
  lateReason: z.string().min(1, '지각 사유를 입력해주세요.'),
});

export type UpdateAdminAttendanceInput = z.infer<typeof updateAdminAttendanceSchema>;

export type UpdateUserAttendanceInput = z.infer<typeof updateUserAttendanceSchema>;
