import type { FilterPagination, FilterSort, Pagination } from 'domain/protocol';
import type { Role } from 'domain/enums';

export interface Address {
  id: number;
}

export interface FindAddressQuery extends Pagination {
  content: Address[];
}

export interface AddressFilter extends FilterPagination, FilterSort {
  name: string;
  email: string;
  role: Role[];
}

export const addressFilterInitialState: AddressFilter = {
  email: '',
  name: '',
  orderBy: null,
  orderBySelect: null,
  page: 1,
  role: [],
  sort: null
};
