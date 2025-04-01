import { MainDiv } from 'presentation/atomic-component/atom';
import {
  RestaurantProductFilter,
  RestaurantProductStatistics,
  RestaurantProductTable
} from 'presentation/atomic-component/organism/restaurant-product';
import type { FC } from 'react';

export const RestaurantProductIdContent: FC = () => {
  return (
    <MainDiv>
      <RestaurantProductFilter />
      <RestaurantProductStatistics />
      <RestaurantProductTable />
    </MainDiv>
  );
};
