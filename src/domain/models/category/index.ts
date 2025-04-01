import type { FilterPagination, FilterSort, Pagination } from 'domain/protocol';
import type { Role } from 'domain/enums';

export interface Category {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FindCategoryQuery extends Pagination {
  content: Category[];
}

export interface CategoryFilter extends FilterPagination, FilterSort {
  name: string;
  email: string;
  role: Role[];
}

export const categoryFilterInitialState: CategoryFilter = {
  email: '',
  name: '',
  page: 1,
  role: [],
  sort: null,
  sortBy: null
};
