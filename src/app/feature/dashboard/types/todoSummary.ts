export type TodoSummary = {
  vacationPendingCount: number;
  assetRequestPendingCount: number;
  assetRepairPendingCount: number;
  lateReasonRequiredCount: number;
};

export type TodoSummaryItem = {
  title: string;
  description: string;
  count: number;
  href: string;
};
