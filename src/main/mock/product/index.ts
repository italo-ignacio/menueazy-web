import { t } from 'i18next';
import type { SelectValues } from 'presentation/atomic-component/atom/select';

export interface ProductFilter {
  name: string;
  price: string;

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

export const orderByProductSelect: SelectValues[] = [
  { label: t('product.table.name', { ns: 'restaurant' }), value: 'name' },
  { label: t('product.table.price', { ns: 'restaurant' }), value: 'price' },
  { label: t('product.table.published', { ns: 'restaurant' }), value: 'published' },
  { label: t('product.table.inStock', { ns: 'restaurant' }), value: 'inStock' },
  { label: t('product.table.highlight', { ns: 'restaurant' }), value: 'highlight' },
  { label: t('product.table.bestReview', { ns: 'restaurant' }), value: 'avgRate' },
  { label: t('product.table.totalSold', { ns: 'restaurant' }), value: 'totalOrder' },
  { label: t('product.table.numberOfReview', { ns: 'restaurant' }), value: 'totalRate' }
];
