export type Sort = 'asc' | 'desc' | null;

export interface FilterSort {
  sort: Sort;
  sortBy: string | null;
}
