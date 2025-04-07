import { Pagination } from 'presentation/atomic-component/molecule';
import { ProductTableBody } from 'presentation/atomic-component/molecule/table/body';
import { ProductTableHeader } from 'presentation/atomic-component/molecule/table/header';
import { RestaurantProductMassAction } from 'presentation/atomic-component/organism/restaurant-product/mass-action';
import { TableTemplate } from 'presentation/atomic-component/atom';
import { useAppSelector } from 'store';
import { useReduxPagination } from 'data/hooks';
import type { FC } from 'react';
import type { FindProductQuery } from 'domain/models';
import type { UseQueryResult } from 'react-query';

interface RestaurantProductTableProps {
  query: UseQueryResult<FindProductQuery>;
}

export const RestaurantProductTable: FC<RestaurantProductTableProps> = ({ query }) => {
  const { page, limit } = useAppSelector((state) => state.filter.product);

  const { handleChangePage, handleChangeLimit } = useReduxPagination('product');
  const { productSelected } = useAppSelector((state) => state.select);

  return (
    <div className={'flex flex-col gap-4 relative'}>
      <TableTemplate
        tableBody={<ProductTableBody query={query} />}
        tableHeader={<ProductTableHeader query={query} />}
      />

      {Object.values(productSelected).length ? <RestaurantProductMassAction /> : null}

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
