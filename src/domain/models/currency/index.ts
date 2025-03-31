import type { Pagination } from 'domain/protocol';

export type CurrencyCode = 'BRL' | 'EUR' | 'USD';

export const currencyData = {
  BRL: {
    name: 'Real Brasileiro',
    symbol: 'R$'
  },
  EUR: {
    name: 'Euro',
    symbol: '€'
  },
  USD: {
    name: 'US Dollar',
    symbol: '$'
  }
};

export interface Currency {
  id: number;
  code: string;
  name: string;
  symbol: string;

  createdAt: Date;
  updatedAt: Date;
  finishedAt?: Date;
}

export interface FindCurrencyQuery extends Pagination {
  content: Currency[];
}
