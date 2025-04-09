import { QueryName, apiPaths } from 'main/config';
import { api } from 'infra/http';
import { queryClient } from 'infra/lib';
import { resolverError } from 'main/utils';
import { restaurantSchema } from 'validation/schema';
import { useForm } from 'react-hook-form';
import { useRestaurant } from 'data/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import type { Product } from 'domain/models';
import type { RestaurantRequest } from 'validation/schema';
import type { SubmitHandler } from 'react-hook-form';
import type { formReturn } from 'domain/protocol';

interface useProductProps {
  product: Product;
}

export const useProduct = ({ product }: useProductProps): formReturn<RestaurantRequest> => {
  const formData = useForm<RestaurantRequest>({
    resolver: yupResolver(restaurantSchema)
  });

  const { restaurantId } = useRestaurant();

  const onSubmit: SubmitHandler<RestaurantRequest> = async (data) => {
    try {
      await api.put({
        body: data,
        id: product.id,
        route: apiPaths.product(restaurantId)
      });

      queryClient.invalidateQueries(QueryName.product);
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
