import { api } from 'infra/http';
import { apiPaths, paths } from 'main/config';
import { loginSchema } from 'validation/schema';
import { resolverError } from 'main/utils';
import { setAuth } from 'store/persist/slice';
import { useAppSelector } from 'store';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import type { LoginPayload } from 'domain/models';
import type { LoginRequest } from 'validation/schema';
import type { SubmitHandler } from 'react-hook-form';
import type { formReturn } from 'domain/protocol';

export const useUserLogin = (): formReturn<LoginRequest> => {
  const formData = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema)
  });

  const dispatch = useDispatch();
  const { redirectPath } = useAppSelector((state) => state.persist);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      const response = await api.post<LoginPayload>({
        body: data,
        route: apiPaths.userLogin
      });

      dispatch(setAuth(response));

      navigate(redirectPath ?? paths.companyUrl(response.user.company.companyUrl));
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
