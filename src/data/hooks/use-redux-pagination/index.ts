import { setFilter } from 'main/utils';
import type { FilterSliceState } from 'store/filters/slice';

export const useReduxPagination = (
  entity: keyof FilterSliceState
): {
  handleChangePage: (event: unknown, newPage: number) => void;
} => {
  const handleChangePage = (_event: unknown, newPage: number): void => {
    setFilter(entity, { page: newPage });
  };

  return { handleChangePage };
};
