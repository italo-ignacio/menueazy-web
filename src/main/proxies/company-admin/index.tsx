import { LoadingPage } from 'presentation/atomic-component/atom/loading/loading-page';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addCompanyChecked } from 'store/first-access/slice';
import { api } from 'infra/http';
import { apiPaths, paths } from 'main/config';
import { decryptData, encryptData } from 'main/utils/crypto';
import { logout, setRedirectPath, setUser } from 'store/persist/slice';
import { useAppSelector } from 'store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useTokenIsExpired } from 'main/utils/token';
import type { FC } from 'react';
import type { User } from 'domain/models';

export const CompanyAdminRoute: FC = () => {
  const isExpired = useTokenIsExpired();

  const { companyUrl } = useParams() as { companyUrl: string };

  const { cCh } = useAppSelector((state) => state.cH);

  const { isLoading, accessToken, user } = useAppSelector((state) => state.persist);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserCompany = async (): Promise<void> => {
      if (!cCh?.some((item) => decryptData(item) === companyUrl))
        try {
          const response = await api.post<{ canAccess: boolean; user: User }>({
            body: { companyUrl },
            route: apiPaths.checkUserCompany
          });

          if (response?.canAccess) {
            dispatch(addCompanyChecked(encryptData(companyUrl)));
            dispatch(setUser({ user: response.user }));
          }
        } catch {
          navigate(paths.companyUrl(companyUrl));
        }
    };

    const checkToken = async (): Promise<void> => {
      if (accessToken === null || user === null) {
        navigate(paths.companyUrl(companyUrl));
        return;
      }

      if (isExpired) {
        dispatch(setRedirectPath(location.pathname));
        dispatch(logout());
        navigate(paths.companyUrl(companyUrl));
        return;
      }

      setTimeout(() => dispatch(setRedirectPath(null)), 1000);

      await checkUserCompany();
    };

    checkToken();
  }, [isExpired, accessToken]);

  if (isExpired) return null;

  return isLoading || !cCh?.some((item) => decryptData(item) === companyUrl) ? (
    <LoadingPage />
  ) : (
    <Outlet />
  );
};
