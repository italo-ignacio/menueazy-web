import { QueryName, apiPaths } from 'main/config';
import { api } from 'infra/http';
import { ingredientSchema } from 'validation/schema';
import { queryClient } from 'infra/lib';
import { resolverError } from 'main/utils';
import { useForm } from 'react-hook-form';
import { useRestaurant } from 'data/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import type { Ingredient } from 'domain/models';
import type { IngredientRequest } from 'validation/schema';
import type { SubmitHandler } from 'react-hook-form';
import type { formReturn } from 'domain/protocol';

interface useIngredientProps {
  closeModal?: () => void;
  ingredient?: Ingredient;
}

export const useIngredient = ({
  closeModal,
  ingredient
}: useIngredientProps): formReturn<IngredientRequest> => {
  const { restaurantId } = useRestaurant();
  const formData = useForm<IngredientRequest>({
    resolver: yupResolver(ingredientSchema)
  });

  const onSubmit: SubmitHandler<IngredientRequest> = async (data) => {
    try {
      const body = new FormData();

      body.append('name', data.name);
      body.append('measure', data.measure as unknown as string);
      body.append('removeImage', data.removeImage as unknown as string);

      if (data.minAlert) body.append('minAlert', data.minAlert as unknown as string);
      if (data.image) body.append('images', data.image as unknown as string);

      if (ingredient)
        await api.put({
          body,
          id: ingredient.id,
          isFormData: true,
          route: apiPaths.ingredient(restaurantId)
        });
      else
        await api.post({
          body,
          isFormData: true,
          route: apiPaths.ingredient(restaurantId)
        });

      queryClient.invalidateQueries(QueryName.ingredient);

      if (closeModal) closeModal();
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
