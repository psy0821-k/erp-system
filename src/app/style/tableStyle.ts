export const tableStyle = {
  wrapper: 'rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden',

  header: 'bg-slate-50/70 border-b border-slate-200',

  row: 'text-center hover:bg-slate-50/50 transition-colors border-b border-slate-200',
  employeeRow: 'flex flex-col gap-2 border-slate-100 px-6 py-4 text-center md:table-row md:px-0 md:py-0',

  cell: 'px-6 py-4',
  employeeNumber: 'w-full font-mono text-xs md:w-[15%] text-center',
  employeeName: 'w-full text-center text-base font-bold text-slate-800 md:w-[15%] md:text-sm',
  employeeDepartment: 'w-full text-center text-sm text-slate-600 md:w-[20%]',
  employeeRole: 'w-full text-sm text-slate-500 md:w-[15%] md:text-center',

  date: 'text-center font-mono text-slate-600',
};
