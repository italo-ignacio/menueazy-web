import { ArrowDownward, ArrowUpward, SwapVert } from '@mui/icons-material';
import type { FC } from 'react';
import type { Sort } from 'domain/protocol';

interface SortFilterProps {
  filterName: string;
  sort: Sort;
  orderBy: string | null;
  onChangeSort: (sort: Sort) => void;
}

export const SortFilter: FC<SortFilterProps> = ({ filterName, onChangeSort, sort, orderBy }) => {
  if (sort === 'desc' && orderBy === filterName)
    return (
      <div
        className={'hover:bg-gray-200 rounded-md cursor-pointer'}
        onClick={(): void => {
          if (onChangeSort) onChangeSort(null);
        }}
      >
        <ArrowUpward className={'text-gray-900 hover:cursor-pointer'} sx={{ fontSize: '22px' }} />
      </div>
    );
  if (sort === 'asc' && orderBy === filterName)
    return (
      <div
        className={'hover:bg-gray-200 rounded-md cursor-pointer'}
        onClick={(): void => {
          if (onChangeSort) onChangeSort('desc');
        }}
      >
        <ArrowDownward className={'text-gray-900 hover:cursor-pointer'} sx={{ fontSize: '22px' }} />
      </div>
    );

  return (
    <div
      className={'hover:bg-gray-200 rounded-md cursor-pointer'}
      onClick={(): void => {
        if (onChangeSort) onChangeSort('asc');
      }}
    >
      <SwapVert className={'text-gray-500 hover:cursor-pointer'} sx={{ fontSize: '22px' }} />
    </div>
  );
};
