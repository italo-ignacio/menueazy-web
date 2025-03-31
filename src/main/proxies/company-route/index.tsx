import { LoadingPage } from 'presentation/atomic-component/atom/loading/loading-page';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addCompanyChecked } from 'store/access/slice';
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
import type { User } from 'domain/models';

export const CompanyRoute: FC = () => {
  const isExpired = useTokenIsExpired();
  const { t } = useTranslation('entity');

  const { companyUrl } = useParams() as { companyUrl: string };

  const { cA } = useAppSelector((state) => state.a);

  const { isLoading, accessToken, user } = useAppSelector((state) => state.persist);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const companyUrlIsChecked = cA?.[encryptUniqueData(companyUrl)];

  useEffect(() => {
    const checkUserCompany = async (): Promise<void> => {
      if (!companyUrlIsChecked)
        try {
          const response = await api.post<{ canAccess: boolean; user: User }>({
            body: { companyUrl },
            route: apiPaths.checkUserCompany
          });

          if (response?.canAccess) {
            dispatch(
              addCompanyChecked({ [encryptUniqueData(companyUrl)]: response.user.company.id })
            );
            dispatch(setUser(response.user));
          }
        } catch {
          navigate(paths.login);
          callToast.error(`${t('company')} ${t('notFound', { ns: 'errors' })}`);
        }
    };

    const checkToken = async (): Promise<void> => {
      if (accessToken === null || user === null) {
        navigate(paths.login);
        return;
      }

      if (isExpired) {
        dispatch(setRedirectPath(location.pathname));
        dispatch(logout());
        navigate(paths.login);
        return;
      }

      setTimeout(() => dispatch(setRedirectPath(null)), 1000);

      await checkUserCompany();
    };

    checkToken();
  }, [isExpired, accessToken]);

  if (isExpired) return null;

  return isLoading || !companyUrlIsChecked ? <LoadingPage /> : <Outlet />;
};
