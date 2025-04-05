import type { FilterPagination, FilterSort } from 'domain/protocol';
import type { Role } from 'domain/enums';

export interface Category {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FindCategoryQuery {
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
  orderBy: null,
  orderBySelect: null,
  page: 1,
  role: [],
  sort: null
};
