/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/jsx-props-no-spreading */
import { Pagination } from 'presentation/atomic-component/molecule';
import { RestaurantCard } from 'presentation/atomic-component/atom';
import type { FC } from 'react';
import type { FindRestaurantQuery } from 'domain/models';
import type { UseQueryResult } from 'react-query';

interface CompanyRestaurantCardsProps {
  query: UseQueryResult<FindRestaurantQuery>;
  handleChangePage: (newPage: number) => void;
  page: number;
}

export const CompanyRestaurantCards: FC<CompanyRestaurantCardsProps> = ({
  query,
  handleChangePage,
  page
}) => {
  return (
    <div className={'flex flex-col gap-4 relative'}>
      <div className={'min-h-[calc(100dvh-44dvh)] gap-y-6 shadow-base p-4 bg-white'}>
        <div className={'flex flex-wrap w-full gap-x-[2%] gap-y-5'}>
          {query.data?.content?.map((item) => <RestaurantCard key={item.id} {...item} />)}
        </div>
      </div>

      <Pagination
        handleChangePage={handleChangePage}
        page={page}
        totalElements={query.data?.totalElements}
        totalPages={query.data?.totalPages}
      />
    </div>
  );
};
