import { encryptUniqueData } from 'main/utils/crypto';
import { useAppSelector } from 'store';
import { useParams } from 'react-router-dom';

export const useRestaurant = (): { id: number; url: string } => {
  const { rA } = useAppSelector((state) => state.a);
  const { restaurantUrl } = useParams() as { restaurantUrl: string };

  return {
    id: rA?.[encryptUniqueData(restaurantUrl)] ?? 0,
    url: restaurantUrl
  };
};
