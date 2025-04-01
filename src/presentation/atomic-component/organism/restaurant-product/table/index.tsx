import { Pagination } from 'presentation/atomic-component/molecule';
import { ProductTableBody } from 'presentation/atomic-component/molecule/table/body';
import { ProductTableHeader } from 'presentation/atomic-component/molecule/table/header';
import { RestaurantProductMassAction } from 'presentation/atomic-component/organism/restaurant-product/mass-action';
import { TableTemplate } from 'presentation/atomic-component/atom';
import { useAppSelector } from 'store';
import { useFindProductQuery } from 'infra/cache';
import { useReduxPagination, useRestaurant } from 'data/hooks';
import type { FC } from 'react';

export const RestaurantProductTable: FC = () => {
  const { restaurantId } = useRestaurant();
  const { handleChangePage, handleChangeLimit } = useReduxPagination('product');
  const { page, limit } = useAppSelector((state) => state.filter.product);

  const productQuery = useFindProductQuery({ limit, page, restaurantId });
  const { productSelected } = useAppSelector((state) => state.product);

  return (
    <div className={'flex flex-col gap-4 relative'}>
      <TableTemplate
        tableBody={<ProductTableBody query={productQuery} />}
        tableHeader={<ProductTableHeader query={productQuery} />}
      />

      {Object.values(productSelected).length ? <RestaurantProductMassAction /> : null}

      <Pagination
        handleChangeLimit={handleChangeLimit}
        handleChangePage={handleChangePage}
        limit={limit}
        page={page}
        totalElements={productQuery.data?.totalElements}
        totalPages={productQuery.data?.totalPages}
      />
    </div>
  );
};
