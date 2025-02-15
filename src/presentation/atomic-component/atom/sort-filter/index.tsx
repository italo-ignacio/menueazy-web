import { ArrowDownward, ArrowUpward, SwapVert } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import type { FC } from 'react';
import type { Sort } from 'domain/protocol';

interface SortFilterProps {
  filterName: string;
  sort: Sort;
  sortBy: string | null;
  onChangeSort: (sort: Sort) => void;
}

export const SortFilter: FC<SortFilterProps> = ({ filterName, onChangeSort, sort, sortBy }) => {
  if (sort === 'desc' && sortBy === filterName)
    return (
      <IconButton
        onClick={(): void => {
          if (onChangeSort) onChangeSort(null);
        }}
        title={'Alterar ordem'}
      >
        <ArrowUpward className={'text-gray-500 hover:cursor-pointer'} />
      </IconButton>
    );
  if (sort === 'asc' && sortBy === filterName)
    return (
      <IconButton
        onClick={(): void => {
          if (onChangeSort) onChangeSort('desc');
        }}
        title={'Alterar ordem'}
      >
        <ArrowDownward className={'text-gray-500 hover:cursor-pointer'} />
      </IconButton>
    );

  return (
    <IconButton
      onClick={(): void => {
        if (onChangeSort) onChangeSort('asc');
      }}
      title={'Alterar ordem'}
    >
      <SwapVert className={'text-gray-500 hover:cursor-pointer'} />
    </IconButton>
  );
};
