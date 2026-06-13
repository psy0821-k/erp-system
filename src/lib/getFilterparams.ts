export function getFilterParams(params: { keyword?: string; page?: string }) {
  return {
    keyword: params.keyword ?? '',
    page: Number(params.page) || 1,
  };
}
