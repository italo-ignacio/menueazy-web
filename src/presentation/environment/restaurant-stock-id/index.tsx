import { MainDiv } from 'presentation/atomic-component/atom';

import { useFindOneIngredientQuery } from 'infra/cache';
import { useParams } from 'react-router-dom';
import { useRestaurant } from 'data/hooks';
import type { FC } from 'react';

export const RestaurantStockIdContent: FC = () => {
  const { restaurantId } = useRestaurant();
  const { id } = useParams() as { id: string };

  const ingredientQuery = useFindOneIngredientQuery({
    id,
    restaurantId
  });

  return (
    <MainDiv>
      <div>{ingredientQuery.data?.id}</div>
    </MainDiv>
  );
};
