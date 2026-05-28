export const getBadgeStyle = (status: string) => {
  switch (status) {
    case '긴급':
      return 'bg-red-500 text-white';

    case '신규':
      return 'bg-blue-500 text-white';

    case '일반':
      return 'bg-green-500 text-black dark:bg-gray-700 dark:text-white';

    default:
      return `bg-[var(--primary)] text-white font-bold text-center pl-2 pr-2 font-[14px]`;
  }
};
