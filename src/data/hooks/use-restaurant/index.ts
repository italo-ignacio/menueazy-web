import { encryptUniqueData } from 'main/utils/crypto';
import { useAppSelector } from 'store';
import { useParams } from 'react-router-dom';

export const useRestaurant = (): { restaurantId: number; restaurantUrl: string } => {
  const { rA } = useAppSelector((state) => state.a);
  const { restaurantUrl } = useParams() as { restaurantUrl: string };

  return {
    restaurantId: rA?.[encryptUniqueData(restaurantUrl)] ?? 0,
    restaurantUrl
  };
};
