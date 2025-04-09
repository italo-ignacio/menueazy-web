import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { productGeneralSchema } from 'validation/schema';
import { resolverError } from 'main/utils';
import { useForm } from 'react-hook-form';
import { useRestaurant } from 'data/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import type { Product } from 'domain/models';
import type { ProductGeneralRequest } from 'validation/schema';
import type { SubmitHandler } from 'react-hook-form';
import type { formReturn } from 'domain/protocol';

interface useProductIdGeneralProps {
  product: Product;
}

export const useProductIdGeneral = ({
  product
}: useProductIdGeneralProps): formReturn<ProductGeneralRequest> => {
  const formData = useForm<ProductGeneralRequest>({
    resolver: yupResolver(productGeneralSchema)
  });

  const { restaurantId } = useRestaurant();

  const onSubmit: SubmitHandler<ProductGeneralRequest> = async (data) => {
    try {
      await api.put({
        body: data,
        id: product.id,
        route: apiPaths.product(restaurantId)
      });
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
