import type { Category } from 'domain/models/category';
import type { FilterPagination, FilterSort, Pagination } from 'domain/protocol';

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
  finalPrice: string;

  priceMT: string;
  priceLT: string;

  published: boolean | string;
  highlight: boolean | string;
  inStock: boolean | string;

  totalOrder?: number;

  totalOrderMT: string;
  totalOrderLT: string;

  totalRate?: number;
  avgRate?: number;

  avgRateMT: string;
  avgRateLT: string;

  showStyle: 'CARD' | 'LIST';
  cardSize: number;

  categoryList: number[];
}

export const productFilterInitialState: ProductFilter = {
  avgRate: undefined,
  avgRateLT: '',
  avgRateMT: '',
  cardSize: 4,
  categoryList: [],
  finalPrice: '',
  highlight: '',
  inStock: '',
  limit: 6,
  name: '',
  orderBy: null,
  orderBySelect: null,
  page: 1,
  priceLT: '',
  priceMT: '',
  published: '',
  showStyle: 'LIST',
  sort: null,
  totalOrder: undefined,
  totalOrderLT: '',
  totalOrderMT: '',
  totalRate: undefined
};
