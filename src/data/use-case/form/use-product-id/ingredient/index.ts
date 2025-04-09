import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { productIngredientSchema } from 'validation/schema';
import { resolverError } from 'main/utils';
import { useForm } from 'react-hook-form';
import { useRestaurant } from 'data/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import type { Product } from 'domain/models';
import type { ProductIngredientRequest } from 'validation/schema';
import type { SubmitHandler } from 'react-hook-form';
import type { formReturn } from 'domain/protocol';

interface useProductIdIngredientProps {
  product: Product;
}

export const useProductIdIngredient = ({
  product
}: useProductIdIngredientProps): formReturn<ProductIngredientRequest> => {
  const formData = useForm<ProductIngredientRequest>({
    resolver: yupResolver(productIngredientSchema)
  });

  const { restaurantId } = useRestaurant();

  const onSubmit: SubmitHandler<ProductIngredientRequest> = async (data) => {
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
