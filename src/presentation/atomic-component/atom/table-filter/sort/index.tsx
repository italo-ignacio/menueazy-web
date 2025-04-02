import { SortFilter } from 'presentation/atomic-component/atom/sort-filter';
import type { FC } from 'react';
import type { TableSortFilter } from 'store/filters/slice';

export interface TableSortProps {
  title: string;
  filterName: string;
  sortItem?: TableSortFilter;
}

export const TableSort: FC<TableSortProps> = ({ title, filterName, sortItem }) => {
  return (
    <div className={'flex gap-3'}>
      <h3>{title}</h3>
      {sortItem ? <SortFilter filterName={filterName} {...sortItem} /> : null}
    </div>
  );
};
