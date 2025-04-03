import type { Category } from 'domain/models/category';
import type { FilterPagination, FilterSort, Pagination } from 'domain/protocol';
import type { Role } from 'domain/enums';

export interface Image {
  id: number;
  primary: boolean;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  inStock: boolean;
  discount?: number;
  startDiscountAt?: Date;
  finishDiscountAt?: Date;
  onlyInRestaurant: boolean;
  published: boolean;
  highlight: boolean;
  priceByKmInDelivery?: number;
  avgRate?: number;
  totalRate?: number;
  totalOrder?: number;
  imageList: Image[];
  categoryList: Category[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FindProductQuery extends Pagination {
  content: Product[];
}

export interface ProductFilter extends FilterPagination, FilterSort {
  name: string;
  price: string;

  priceMT?: number;
  priceLT?: number;

  published?: boolean;
  highlight?: boolean;
  inStock?: boolean;

  totalOrder?: number;
  totalRate?: number;
  avgRate?: number;

  showStyle: 'CARD' | 'LIST';
  cardSize: number;

  email: string;
  role: Role[];
}

export const productFilterInitialState: ProductFilter = {
  avgRate: undefined,
  cardSize: 4,
  email: '',
  highlight: undefined,
  inStock: undefined,
  limit: 5,
  name: '',
  orderBy: null,
  page: 1,
  price: '',
  priceLT: undefined,
  priceMT: undefined,
  published: undefined,
  role: [],
  showStyle: 'LIST',
  sort: null,
  totalOrder: undefined,
  totalRate: undefined
};
