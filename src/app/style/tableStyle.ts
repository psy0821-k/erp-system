export const tableStyle = {
  wrapper: 'overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950',
  header: 'border-b border-slate-200 bg-slate-100 text-black dark:border-slate-800 dark:bg-slate-700 dark:text-white',
  row: 'border-b border-slate-200 text-center transition-colors hover:bg-slate-50/50 dark:border-slate-800 dark:hover:bg-slate-900/70',
  employeeRow: 'flex flex-col gap-2 border-slate-100 px-6 py-4 text-center md:table-row md:px-0 md:py-0 dark:border-slate-800',
  cell: 'px-6 py-4 text-slate-700 dark:text-slate-200',

  employeeNumber: 'w-full text-center font-mono text-xs text-slate-600 md:w-[15%] dark:text-slate-300',
  employeeName: 'w-full text-center text-base font-bold text-slate-800 md:w-[15%] md:text-sm dark:text-slate-100',
  employeeDepartment: 'w-full text-center text-sm text-slate-600 md:w-[20%] dark:text-slate-300',
  employeeRole: 'w-full text-sm text-slate-500 md:w-[15%] md:text-center dark:text-slate-400',
  date: 'text-center font-mono text-slate-600 dark:text-slate-300',
};

export const cardStyle = {
  wrapper: 'overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900',

  toolbar:
    'flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row',
  pageHeader: 'mb-6 mt-4 flex flex-col gap-4 border-b border-slate-200 pb-6 dark:border-slate-800 md:flex-row md:items-center md:justify-between',
  sectionHeader: 'flex items-center gap-2 border-b border-slate-100 bg-slate-50/30 p-5 dark:border-slate-800 dark:bg-slate-900/70',
} as const;

export const filterStyle = {
  wrapper: 'mb-6 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900',
  area: 'flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between',
};
