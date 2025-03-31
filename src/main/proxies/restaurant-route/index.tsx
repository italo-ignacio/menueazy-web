import { LoadingPage } from 'presentation/atomic-component/atom/loading/loading-page';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addRestaurantChecked } from 'store/access/slice';
import { api } from 'infra/http';
import { apiPaths, paths } from 'main/config';
import { callToast } from 'main/utils';
import { encryptUniqueData } from 'main/utils/crypto';
import { logout, setRedirectPath, setUser } from 'store/persist/slice';
import { useAppSelector } from 'store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useTokenIsExpired } from 'main/utils/token';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';
import type { Restaurant, User } from 'domain/models';

export const RestaurantRoute: FC = () => {
  const isExpired = useTokenIsExpired();
  const { t } = useTranslation('entity');

  const { restaurantUrl } = useParams() as { restaurantUrl: string };

  const { rA } = useAppSelector((state) => state.a);

  const { isLoading, accessToken, user } = useAppSelector((state) => state.persist);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const restaurantUrlIsChecked = rA?.[encryptUniqueData(restaurantUrl)];

  interface Res {
    restaurant: Restaurant;
  }

  const navigateLink = user?.company.companyUrl
    ? paths.companyUrl(user?.company.companyUrl)
    : paths.home;

  useEffect(() => {
    const checkUserRestaurant = async (): Promise<void> => {
      if (!restaurantUrlIsChecked)
        try {
          const response = await api.post<{ canAccess: boolean; user: Res & User }>({
            body: { restaurantUrl },
            route: apiPaths.checkUserRestaurant
          });

          if (response?.canAccess) {
            dispatch(
              addRestaurantChecked({
                [encryptUniqueData(restaurantUrl)]: response.user.restaurant.id
              })
            );
            dispatch(setUser(response.user));
          }
        } catch {
          navigate(navigateLink);
          callToast.error(`${t('restaurant')} ${t('notFound', { ns: 'errors' })}`);
        }
    };

    const checkToken = async (): Promise<void> => {
      if (accessToken === null || user === null) {
        navigate(navigateLink);
        return;
      }

      if (isExpired) {
        dispatch(setRedirectPath(location.pathname));
        dispatch(logout());
        navigate(navigateLink);
        return;
      }

      setTimeout(() => dispatch(setRedirectPath(null)), 1000);

      await checkUserRestaurant();
    };

    checkToken();
  }, [isExpired, accessToken]);

  if (isExpired) return null;

  return isLoading || !restaurantUrlIsChecked ? <LoadingPage /> : <Outlet />;
};
