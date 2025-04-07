import { QueryName, apiPaths } from 'main/config';
import { api } from 'infra/http';
import { queryClient } from 'infra/lib';
import { resolverError } from 'main/utils';
import { restaurantSchema } from 'validation/schema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { Restaurant } from 'domain/models';
import type { RestaurantRequest } from 'validation/schema';
import type { SubmitHandler } from 'react-hook-form';
import type { formReturn } from 'domain/protocol';

interface useRequestRestaurantProps {
  closeModal?: () => void;
  restaurant?: Restaurant;
}

export const useRequestRestaurant = ({
  closeModal,
  restaurant
}: useRequestRestaurantProps): formReturn<RestaurantRequest> => {
  const formData = useForm<RestaurantRequest>({
    resolver: yupResolver(restaurantSchema)
  });

  const onSubmit: SubmitHandler<RestaurantRequest> = async (data) => {
    try {
      if (restaurant)
        await api.put({
          body: data,
          id: restaurant.id,
          route: apiPaths.restaurant
        });
      else
        await api.post({
          body: data,
          route: apiPaths.restaurant
        });

      queryClient.invalidateQueries(QueryName.restaurant);

      if (closeModal) closeModal();
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
