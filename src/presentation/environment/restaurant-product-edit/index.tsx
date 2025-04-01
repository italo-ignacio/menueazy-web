import { MainDiv } from 'presentation/atomic-component/atom';
import { useFindOneProductQuery } from 'infra/cache';
import { useParams } from 'react-router-dom';
import { useRestaurant } from 'data/hooks';
import type { FC } from 'react';

export const RestaurantProductEditContent: FC = () => {
  const { restaurantId } = useRestaurant();
  const { id } = useParams() as { id: string };

  const productQuery = useFindOneProductQuery({
    id,
    restaurantId
  });

  return (
    <MainDiv>
      <h2>{productQuery.data?.id}</h2>
    </MainDiv>
  );
};
