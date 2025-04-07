/* eslint-disable react/jsx-props-no-spreading */
import { IngredientCard } from 'presentation/atomic-component/atom';
import { Pagination } from 'presentation/atomic-component/molecule';
import { useAppSelector } from 'store';
import { useReduxPagination } from 'data/hooks';
import type { FC } from 'react';
import type { FindIngredientQuery } from 'domain/models';
import type { UseQueryResult } from 'react-query';

interface RestaurantStockCardsProps {
  query: UseQueryResult<FindIngredientQuery>;
}

export const RestaurantStockCards: FC<RestaurantStockCardsProps> = ({ query }) => {
  const { page, limit, cardSize } = useAppSelector((state) => state.filter.product);

  const { handleChangePage, handleChangeLimit } = useReduxPagination('product');

  return (
    <div className={'flex flex-col gap-4 relative'}>
      <div
        className={'grid gap-4 w-full ax-w-max bg-white p-2'}
        style={{
          gridTemplateColumns: `repeat(${cardSize}, calc((100% - ${(cardSize - 1) * 16}px) / ${cardSize}))`
        }}
      >
        {query.data?.content?.map((item) => <IngredientCard key={item.id} {...item} />)}
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
