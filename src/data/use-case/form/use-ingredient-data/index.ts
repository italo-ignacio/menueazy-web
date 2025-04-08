import { QueryName, apiPaths } from 'main/config';
import { api } from 'infra/http';
import { callToast, resolverError } from 'main/utils';
import { ingredientDataSchema } from 'validation/schema';
import { queryClient } from 'infra/lib';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { useRestaurant } from 'data/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import type { Ingredient, IngredientData } from 'domain/models';
import type { IngredientDataRequest } from 'validation/schema';
import type { SubmitHandler } from 'react-hook-form';
import type { formReturn } from 'domain/protocol';

interface useIngredientDataProps {
  ingredient: Ingredient;
  closeModal?: () => void;
  ingredientData?: IngredientData;
}

export const useIngredientData = ({
  closeModal,
  ingredient,
  ingredientData
}: useIngredientDataProps): formReturn<IngredientDataRequest> => {
  const { restaurantId } = useRestaurant();
  const formData = useForm<IngredientDataRequest>({
    resolver: yupResolver(ingredientDataSchema)
  });

  const onSubmit: SubmitHandler<IngredientDataRequest> = async (data) => {
    try {
      const quantity = Number(data.quantity.replace(',', '.'));
      const unitPrice = Number(data.unitPrice.replace(',', '.'));
      const entryQuantity = Number(data?.entryQuantity?.replace(',', '.'));

      if (isNaN(quantity) || isNaN(unitPrice) || (data?.entryQuantity && isNaN(entryQuantity))) {
        callToast.error(t('invalidData', { ns: 'errors' }));
        return;
      }

      const body = {
        entryQuantity,
        expiresAt: data.expiresAt,
        quantity,
        unitPrice
      };

      if (ingredientData)
        await api.put({
          body,
          id: ingredientData.id,
          route: apiPaths.ingredientData(restaurantId, ingredient.id)
        });
      else
        await api.post({
          body,
          route: apiPaths.ingredientData(restaurantId, ingredient.id)
        });

      queryClient.invalidateQueries(QueryName.ingredient);
      queryClient.invalidateQueries(QueryName.ingredientData);

      if (closeModal) closeModal();
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
