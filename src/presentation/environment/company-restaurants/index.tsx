/* eslint-disable react/jsx-props-no-spreading */
import {
  CompanyRestaurantCards,
  CompanyRestaurantFilter,
  CompanyRestaurantStatistics
} from 'presentation/atomic-component/organism/company-restaurant';
import { MainDiv } from 'presentation/atomic-component/atom';
import { useFindRestaurantQuery } from 'infra/cache';
import { usePagination } from 'data/hooks';
import type { FC } from 'react';

export const CompanyRestaurantsContent: FC = () => {
  const { handleChangePage, page } = usePagination();
  const restaurantQuery = useFindRestaurantQuery({ limit: 9, page });

  return (
    <MainDiv>
      <CompanyRestaurantStatistics />
      <CompanyRestaurantFilter totalElements={restaurantQuery.data?.totalElements} />

      <CompanyRestaurantCards
        handleChangePage={handleChangePage}
        page={page}
        query={restaurantQuery}
      />
    </MainDiv>
  );
};
