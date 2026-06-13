import { z } from 'zod';
import { VACATION_TYPE } from '../type/vacationType';

export const vacationCreateSchema = z.object({
  name: z.string(),
  employee_id: z.string(),
  vacation_title: z.string().min(1, '제목을 입력하세요'),
  vacation_type: z.enum([
    VACATION_TYPE.ANNUAL,
    VACATION_TYPE.HALF_DAY_AM,
    VACATION_TYPE.HALF_DAY_PM,
    VACATION_TYPE.SICK,
    VACATION_TYPE.OFFICIAL,
    VACATION_TYPE.BUSINESS_TRIP,
    VACATION_TYPE.COMPENSATORY,
    VACATION_TYPE.ETC,
  ]),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
  start_date: z.string(),
  end_date: z.string(),
  reason: z.string().min(1, '휴가사유를 입력해주세요'),
});

export type VacationCreateInput = z.infer<typeof vacationCreateSchema>;
