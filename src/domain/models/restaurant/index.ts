import type { Address } from 'domain/models/address';
import type { FilterPagination, FilterSort, Pagination } from 'domain/protocol';
import type { Role } from 'domain/enums';
import type { Style } from 'domain/models/style';

export interface Restaurant {
  id: number;
  name: string;
  restaurantUrl: string;
  phone: string;
  description?: string | null;
  open: boolean;
  openForDelivery?: boolean | null;
  hasDelivery: boolean;
  logoUrl?: string;
  contactLink?: string | null;
  maxDeliveryDistanceInKm: number;
  minimumDeliveryPrice: number;
  minimumOrderPrice: number;
  priceByKmInDelivery: number;
  address?: Address | null;
  style?: Style | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface FindRestaurantQuery extends Pagination {
  content: Restaurant[];
}

export interface RestaurantFilter extends FilterPagination, FilterSort {
  name: string;
  email: string;
  role: Role[];
}

export const restaurantFilterInitialState: RestaurantFilter = {
  email: '',
  name: '',
  page: 1,
  role: [],
  sort: null,
  orderBy: null
};
