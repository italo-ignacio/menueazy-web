import type { FilterPagination, FilterSort, Pagination } from 'domain/protocol';
import type { Role } from 'domain/enums';

export interface Style {
  id: number;
}

export interface FindStyleQuery extends Pagination {
  content: Style[];
}

export interface StyleFilter extends FilterPagination, FilterSort {
  name: string;
  email: string;
  role: Role[];
}

export const styleFilterInitialState: StyleFilter = {
  email: '',
  name: '',
  orderBy: null,
  orderBySelect: null,
  page: 1,
  role: [],
  sort: null
};
