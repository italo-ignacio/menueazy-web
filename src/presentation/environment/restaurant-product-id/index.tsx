import { MainDiv } from 'presentation/atomic-component/atom';

import { Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { paths } from 'main/config';
import { useFindOneProductQuery } from 'infra/cache';
import { useRestaurant } from 'data/hooks';
import type { FC } from 'react';

export const RestaurantProductIdContent: FC = () => {
  const { restaurantId, restaurantUrl } = useRestaurant();
  const { id } = useParams() as { id: string };

  const productQuery = useFindOneProductQuery({
    id,
    restaurantId
  });

  return (
    <MainDiv>
      <div>{productQuery.data?.id}</div>

      <Link to={paths.restaurantProductEdit(restaurantUrl, id)}>
        <Button>Edit</Button>
      </Link>
    </MainDiv>
  );
};
