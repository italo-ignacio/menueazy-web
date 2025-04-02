import { MainDiv } from 'presentation/atomic-component/atom';
import {
  RestaurantProductFilter,
  RestaurantProductStatistics,
  RestaurantProductTable
} from 'presentation/atomic-component/organism/restaurant-product';
import { useAppSelector } from 'store';
import { useFindProductQuery } from 'infra/cache';
import { useRestaurant } from 'data/hooks';
import type { FC } from 'react';

export const RestaurantProductContent: FC = () => {
  const { restaurantId } = useRestaurant();
  const { page, limit, name, orderBy, sort } = useAppSelector((state) => state.filter.product);

  const productQuery = useFindProductQuery({
    limit,
    page,
    params: { name, orderBy, sort },
    restaurantId
  });

  return (
    <MainDiv>
      <RestaurantProductStatistics />
      <RestaurantProductFilter totalElements={productQuery.data?.totalElements} />
      <RestaurantProductTable query={productQuery} />
    </MainDiv>
  );
};
