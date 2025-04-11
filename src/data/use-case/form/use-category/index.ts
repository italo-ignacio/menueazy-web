import { QueryName, apiPaths } from 'main/config';
import { api } from 'infra/http';
import { categorySchema } from 'validation/schema';
import { queryClient } from 'infra/lib';
import { resolverError } from 'main/utils';
import { useForm } from 'react-hook-form';
import { useRestaurant } from 'data/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import type { Category } from 'domain/models';
import type { CategoryRequest } from 'validation/schema';
import type { SubmitHandler } from 'react-hook-form';
import type { formReturn } from 'domain/protocol';

interface useCategoryProps {
  closeModal?: () => void;
  category?: Category;
}

export const useCategory = ({
  closeModal,
  category
}: useCategoryProps): formReturn<CategoryRequest> => {
  const formData = useForm<CategoryRequest>({
    resolver: yupResolver(categorySchema)
  });

  const { restaurantId } = useRestaurant();

  const onSubmit: SubmitHandler<CategoryRequest> = async (data) => {
    try {
      if (category)
        await api.put({
          body: data,
          id: category.id,
          route: apiPaths.category(restaurantId)
        });
      else
        await api.post({
          body: data,
          route: apiPaths.category(restaurantId)
        });

      queryClient.invalidateQueries(QueryName.category);

      if (closeModal) closeModal();
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
