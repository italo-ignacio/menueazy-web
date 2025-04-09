import { LoadingPage } from 'presentation/atomic-component/atom/loading/loading-page';
import { MainDiv } from 'presentation/atomic-component/atom';
import { ProductIdTemplate } from 'presentation/atomic-component/organism/product-id';
import { useFindOneProductQuery } from 'infra/cache';
import { useParams } from 'react-router-dom';
import { useRestaurant } from 'data/hooks';
import type { FC } from 'react';

export const RestaurantProductIdContent: FC = () => {
  const { restaurantId } = useRestaurant();
  const { id } = useParams() as { id: string };

  const productQuery = useFindOneProductQuery({ id, restaurantId });

  return (
    <MainDiv>
      {productQuery.data?.id ? (
        <ProductIdTemplate product={productQuery.data} />
      ) : (
        <LoadingPage hasShadow />
      )}
    </MainDiv>
  );
};
