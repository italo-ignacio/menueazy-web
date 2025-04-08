/* eslint-disable react/jsx-props-no-spreading */
import { Pagination } from 'presentation/atomic-component/molecule';
import { ProductCard } from 'presentation/atomic-component/atom';
import { RestaurantProductMassAction } from 'presentation/atomic-component/organism/restaurant-product/mass-action';
import { useAppSelector } from 'store';
import { useReduxPagination } from 'data/hooks';
import type { FC } from 'react';
import type { FindProductQuery } from 'domain/models';
import type { UseQueryResult } from 'react-query';

interface RestaurantProductCardsProps {
  query: UseQueryResult<FindProductQuery>;
}

export const RestaurantProductCards: FC<RestaurantProductCardsProps> = ({ query }) => {
  const { page, limit, cardSize } = useAppSelector((state) => state.filter.product);

  const { handleChangePage, handleChangeLimit } = useReduxPagination('product');
  const { productSelected } = useAppSelector((state) => state.select);

  return (
    <div className={'flex flex-col gap-4 relative'}>
      <div className={'min-h-[calc(100dvh-48dvh)] shadow-base bg-white'}>
        <div
          className={'grid gap-4 w-full p-2'}
          style={{
            gridTemplateColumns: `repeat(${cardSize}, calc((100% - ${(cardSize - 1) * 16}px) / ${cardSize}))`
          }}
        >
          {query.data?.content?.map((item) => <ProductCard key={item.id} {...item} />)}
        </div>
      </div>

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
