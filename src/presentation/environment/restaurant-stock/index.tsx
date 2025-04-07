import { type FC, useEffect } from 'react';
import { MainDiv } from 'presentation/atomic-component/atom';
import {
  RestaurantStockCards,
  RestaurantStockFilter,
  RestaurantStockStatistics,
  RestaurantStockTable
} from 'presentation/atomic-component/organism/restaurant-stock';
import { dimensions } from 'main/config';
import { setFilter } from 'main/utils';
import { useAppSelector } from 'store';
import { useFindIngredientQuery } from 'infra/cache';
import { useRestaurant, useWindowDimensions } from 'data/hooks';

export const RestaurantStockContent: FC = () => {
  const { restaurantId } = useRestaurant();
  const { page, limit, showStyle, ...filterData } = useAppSelector(
    (state) => state.filter.ingredient
  );

  const { width } = useWindowDimensions();

  const getInitialSize = (): number => {
    if (width > dimensions.desktop) return 5;
    if (width > dimensions.laptop) return 4;

    if (width > 450) return 2;

    return 1;
  };

  useEffect(() => {
    if (width < dimensions.tablet && showStyle === 'LIST')
      setFilter('product', { cardSize: getInitialSize(), showStyle: 'CARD' });
  }, [width]);

  const ingredientQuery = useFindIngredientQuery({
    limit,
    page,
    params: filterData,
    restaurantId
  });

  return (
    <MainDiv>
      <RestaurantStockStatistics />
      <RestaurantStockFilter totalElements={ingredientQuery.data?.totalElements} />

      {showStyle === 'CARD' ? (
        <RestaurantStockCards query={ingredientQuery} />
      ) : (
        <RestaurantStockTable query={ingredientQuery} />
      )}
    </MainDiv>
  );
};
