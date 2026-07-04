import { z } from 'zod';

export const updateAdminAttendanceSchema = z.object({
  id: z.string(),
  status: z.enum(['PRESENT', 'LATE', 'ABSENT', 'VACATION', 'BUSINESS_TRIP']),
});

export const updateUserAttendanceSchema = z.object({
  id: z.string().min(1, '근태 ID가 없습니다.'),
  late_reason: z.string(),
});

export type UpdateAdminAttendanceInput = z.infer<typeof updateAdminAttendanceSchema>;

export type UpdateUserAttendanceInput = z.infer<typeof updateUserAttendanceSchema>;
