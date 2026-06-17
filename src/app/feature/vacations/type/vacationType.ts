export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export const VACATION_TYPE = {
  ANNUAL: 'ANNUAL',
  HALF_DAY_AM: 'HALF_DAY_AM',
  HALF_DAY_PM: 'HALF_DAY_PM',
  SICK: 'SICK',
  OFFICIAL: 'OFFICIAL',
  BUSINESS_TRIP: 'BUSINESS_TRIP',
  COMPENSATORY: 'COMPENSATORY',
  ETC: 'ETC',
} as const;

export type VacationType = (typeof VACATION_TYPE)[keyof typeof VACATION_TYPE];

export type Vacation = {
  id: string;
  employee_id: string;
  vacation_title: string;
  vacation_type: VacationType;
  start_date: string;
  end_date: string;
  reason: string;
  status: ApprovalStatus;
  approver_id: string | null;
  approved_at: string | null;
  result_message: string | null;
  created_at: string;

  employee: {
    id: string;
    employee_number: string;
    name: string;
    email: string;
    department: string;
    position: string;
  } | null;

  approver: {
    id: string;
    name: string;
    email: string;
    department: string;
    position: string;
  } | null;
};
export interface CreateVacationDTO {
  employee_id: string;
  name: string;
  vacation_title: string;
  vacation_type: VacationType;
  start_date: string;
  end_date: string;
  reason: string;
}

export interface VacationListParams {
  page?: number;
  keyword?: string;
  department?: string;
  status?: ApprovalStatus;
}

export type VacationsResponse = {
  vacations: Vacation[];
  nextPage?: number;
  count: number;
};
