import { IngredientTableBody } from 'presentation/atomic-component/molecule/table/body';
import { IngredientTableHeader } from 'presentation/atomic-component/molecule/table/header';
import { Pagination } from 'presentation/atomic-component/molecule';
import { TableTemplate } from 'presentation/atomic-component/atom';
import { useAppSelector } from 'store';
import { useReduxPagination } from 'data/hooks';
import type { FC } from 'react';
import type { FindIngredientQuery } from 'domain/models';
import type { UseQueryResult } from 'react-query';

interface RestaurantStockTableProps {
  query: UseQueryResult<FindIngredientQuery>;
}

export const RestaurantStockTable: FC<RestaurantStockTableProps> = ({ query }) => {
  const { page, limit } = useAppSelector((state) => state.filter.ingredient);

  const { handleChangePage, handleChangeLimit } = useReduxPagination('ingredient');

  return (
    <div className={'flex flex-col gap-4 relative'}>
      <div className={'min-h-[calc(100dvh-48dvh)]  shadow-base bg-white'}>
        <TableTemplate
          tableBody={<IngredientTableBody query={query} />}
          tableHeader={<IngredientTableHeader query={query} />}
        />
      </div>

      <Pagination
        handleChangeLimit={handleChangeLimit}
        handleChangePage={handleChangePage}
        limit={limit}
        page={page}
        totalElements={query.data?.totalElements}
        totalPages={query.data?.totalPages}
      />
    </div>
  );
};
