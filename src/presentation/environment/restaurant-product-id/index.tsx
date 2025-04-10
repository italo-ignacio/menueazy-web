import { type FC, useEffect } from 'react';
import { LoadingPage } from 'presentation/atomic-component/atom/loading/loading-page';
import { MainDiv } from 'presentation/atomic-component/atom';
import { ProductIdTemplate } from 'presentation/atomic-component/organism/product-id';
import { callToast } from 'main/utils';
import { paths } from 'main/config';
import { toast } from 'react-toastify';
import { useFindOneProductQuery } from 'infra/cache';
import { useNavigate, useParams } from 'react-router-dom';
import { useRestaurant } from 'data/hooks';

export const RestaurantProductIdContent: FC = () => {
  const { restaurantId, restaurantUrl } = useRestaurant();
  const { id } = useParams() as { id: string };

  const productQuery = useFindOneProductQuery({ id, restaurantId });

  const navigate = useNavigate();

  useEffect(() => {
    if (productQuery?.error) {
      const errorResponse = productQuery.error as { status?: string };

      if (errorResponse?.status === 'not found') {
        toast.dismiss();
        callToast.error('Produto nao foi encontrado');
        navigate(paths.restaurantProduct(restaurantUrl));
      }
    }
  }, [productQuery]);

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
