import type { FilterPagination, FilterSort, Pagination } from 'domain/protocol';
import type { IngredientMeasure } from 'domain/enums';

export interface Ingredient {
  id: number;
  name: string;
  measure: IngredientMeasure;
  quantity: number;
  priceInStock: number;
  totalPrice: number;
  imageUrl?: string;
  minAlert?: number;

  createdAt: Date;
  updatedAt: Date;
}

export interface FindIngredientQuery extends Pagination {
  content: Ingredient[];
}

export interface IngredientFilter extends FilterPagination, FilterSort {
  name: string;
  quantity: string;

  quantityMT: string;
  quantityLT: string;

  priceInStock: string;

  priceInStockMT: string;
  priceInStockLT: string;

  totalPrice: string;

  totalPriceMT: string;
  totalPriceLT: string;

  showStyle: 'CARD' | 'LIST';
  cardSize: number;
}

export const ingredientFilterInitialState: IngredientFilter = {
  cardSize: 4,
  limit: 6,
  name: '',
  orderBy: null,
  orderBySelect: null,
  page: 1,
  priceInStock: '',
  priceInStockLT: '',
  priceInStockMT: '',
  quantity: '',
  quantityLT: '',
  quantityMT: '',
  showStyle: 'LIST',
  sort: null,
  totalPrice: '',
  totalPriceLT: '',
  totalPriceMT: ''
};
