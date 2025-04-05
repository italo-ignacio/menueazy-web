import type { SelectValues } from 'presentation/atomic-component/atom/select';

export type Sort = 'asc' | 'desc' | null;

export interface FilterSort {
  sort: Sort;
  orderBy: string | null;
  orderBySelect: SelectValues | null;
}
