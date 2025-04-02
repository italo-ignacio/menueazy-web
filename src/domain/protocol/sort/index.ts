export type Sort = 'asc' | 'desc' | null;

export interface FilterSort {
  sort: Sort;
  orderBy: string | null;
}
