import type { Address } from 'domain/models/address';
import type { FilterPagination, FilterSort, Pagination } from 'domain/protocol';
import type { OpeningHour } from 'domain/models/opening-hour';
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
  openingHourList: OpeningHour[];
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
}

export const restaurantFilterInitialState: RestaurantFilter = {
  name: '',
  orderBy: null,
  orderBySelect: null,
  page: 1,
  sort: null
};
