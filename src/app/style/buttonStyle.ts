export const buttonStyle = {
  base: 'cursor-pointer transition-colors duration-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:focus-visible:ring-slate-100',
  create: 'bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700',
  edit: 'bg-indigo-700 text-white hover:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-700',
  delete: 'bg-red-700 text-white hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700',
  submit: 'bg-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700',
  detail:
    'h-8 text-xs font-semibold rounded-xl border-slate-200 text-indigo-600 bg-white hover:bg-slate-50 hover:text-indigo-700 transition-colors shadow-sm mr-2',

  createNew:
    'inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 font-medium text-white shadow-sm shadow-indigo-100 transition-colors hover:bg-indigo-700',
  icon: 'p-2',
} as const;
