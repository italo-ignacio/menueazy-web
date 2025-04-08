import type { FilterPagination, FilterSort, Pagination } from 'domain/protocol';

export interface IngredientData {
  id: number;
  quantity: number;
  entryQuantity: number;
  priceInStock: number;
  totalPrice: number;
  unitPrice: number;

  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface FindIngredientDataQuery extends Pagination {
  content: IngredientData[];
}

export interface IngredientDataFilter extends FilterPagination, FilterSort {
  quantity: string;
}

export const ingredientDataFilterInitialState: IngredientDataFilter = {
  limit: 5,
  orderBy: null,
  orderBySelect: null,
  page: 1,
  quantity: '',
  sort: null
};
