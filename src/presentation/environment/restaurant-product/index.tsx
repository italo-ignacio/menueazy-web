import { type FC, useEffect } from 'react';
import { MainDiv } from 'presentation/atomic-component/atom';
import {
  RestaurantProductCards,
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
  const { limit, page, highlight, inStock, published, showStyle, ...filterData } = useAppSelector(
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
    params: {
      ...filterData,
      highlightBoolean: highlight,
      inStockBoolean: inStock,
      publishedBoolean: published
    },
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
