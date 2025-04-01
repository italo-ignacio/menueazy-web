import { setFilter } from 'main/utils';
import type { FilterSliceState } from 'store/filters/slice';

export const useReduxPagination = (
  entity: keyof FilterSliceState
): {
  handleChangePage: (newPage: number) => void;
  handleChangeLimit: (newLimit: number) => void;
} => {
  const handleChangePage = (newPage: number): void => {
    setFilter(entity, { page: newPage });
  };

  const handleChangeLimit = (newLimit: number): void => {
    setFilter(entity, { limit: newLimit });
  };

  return { handleChangeLimit, handleChangePage };
};
