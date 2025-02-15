import type { Pagination } from 'domain/protocol';

export type CurrencyCode = 'BRL' | 'MXN' | 'USD';

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
