import { type FC, useEffect } from 'react';
import { MainDiv } from 'presentation/atomic-component/atom';
import { RestaurantProductCards } from 'presentation/atomic-component/organism/restaurant-product/cards';
import {
  RestaurantProductFilter,
  RestaurantProductStatistics,
  RestaurantProductTable
} from 'presentation/atomic-component/organism/restaurant-product';
import { dimensions } from 'main/config';
import { setFilter } from 'main/utils';
import { useAppSelector } from 'store';
import { useFindProductQuery } from 'infra/cache';
import { useRestaurant, useWindowDimensions } from 'data/hooks';

export const RestaurantProductContent: FC = () => {
  const { restaurantId } = useRestaurant();
  const { page, limit, name, orderBy, showStyle, sort } = useAppSelector(
    (state) => state.filter.product
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

      {showStyle === 'CARD' ? (
        <RestaurantProductCards query={productQuery} />
      ) : (
        <RestaurantProductTable query={productQuery} />
      )}
    </MainDiv>
  );
};
