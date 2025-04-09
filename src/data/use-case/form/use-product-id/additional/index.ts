import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { productAdditionalSchema } from 'validation/schema';
import { resolverError } from 'main/utils';
import { useForm } from 'react-hook-form';
import { useRestaurant } from 'data/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import type { Product } from 'domain/models';
import type { ProductAdditionalRequest } from 'validation/schema';
import type { SubmitHandler } from 'react-hook-form';
import type { formReturn } from 'domain/protocol';

interface useProductIdAdditionalProps {
  product: Product;
}

export const useProductIdAdditional = ({
  product
}: useProductIdAdditionalProps): formReturn<ProductAdditionalRequest> => {
  const formData = useForm<ProductAdditionalRequest>({
    resolver: yupResolver(productAdditionalSchema)
  });

  const { restaurantId } = useRestaurant();

  const onSubmit: SubmitHandler<ProductAdditionalRequest> = async (data) => {
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
