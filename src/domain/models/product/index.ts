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
  email: string;
  role: Role[];
}

export const productFilterInitialState: ProductFilter = {
  email: '',
  limit: 5,
  name: '',
  page: 1,
  role: [],
  sort: null,
  sortBy: null
};
