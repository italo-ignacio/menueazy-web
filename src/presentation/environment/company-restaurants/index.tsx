/* eslint-disable react/jsx-props-no-spreading */
import {
  CompanyRestaurantCards,
  CompanyRestaurantFilter,
  CompanyRestaurantStatistics
} from 'presentation/atomic-component/organism/company-restaurant';
import { MainDiv } from 'presentation/atomic-component/atom';
import { useFindRestaurantQuery } from 'infra/cache';
import type { FC } from 'react';

export const CompanyRestaurantsContent: FC = () => {
  const restaurantQuery = useFindRestaurantQuery({});

  return (
    <MainDiv>
      <CompanyRestaurantStatistics />
      <CompanyRestaurantFilter totalElements={restaurantQuery.data?.totalElements} />
      <CompanyRestaurantCards query={restaurantQuery} />
    </MainDiv>
  );
};
