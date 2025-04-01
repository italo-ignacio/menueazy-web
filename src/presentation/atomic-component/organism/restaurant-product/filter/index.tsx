import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { api } from 'infra/http';
import { apiPaths, paths } from 'main/config';
import { resolverError } from 'main/utils';
import { useNavigate } from 'react-router-dom';
import { useRestaurant } from 'data/hooks';
import type { FC } from 'react';

export const RestaurantProductFilter: FC = () => {
  const { restaurantId, restaurantUrl } = useRestaurant();
  const navigate = useNavigate();

  const addProduct = async (): Promise<void> => {
    try {
      const { id } = await api.post<{ id: number }>({
        route: apiPaths.product(restaurantId)
      });

      navigate(paths.restaurantProductEdit(restaurantUrl, id));
    } catch (error) {
      resolverError(error);
    }
  };

  return (
    <div className={'flex justify-between bg-white p-4 rounded-md border border-gray-250'}>
      <h2>Filtro</h2>

      <Button onClick={addProduct} startIcon={<Add />}>
        Novo produto
      </Button>
    </div>
  );
};
