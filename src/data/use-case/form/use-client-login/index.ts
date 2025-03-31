import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { callToast, resolverError } from 'main/utils';
import { firebaseAuth } from 'infra/lib/firebase';
import { loginSchema } from 'validation/schema';
import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { setAuth } from 'store/persist/slice';
import { useAppSelector } from 'store';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import i18n from 'i18n';
import type { LoginPayload } from 'domain/models';
import type { LoginRequest } from 'validation/schema';
import type { SubmitHandler } from 'react-hook-form';
import type { formReturn } from 'domain/protocol';

export const useClientLogin = (): formReturn<LoginRequest> => {
  const formData = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema)
  });

  const dispatch = useDispatch();
  const { redirectPath } = useAppSelector((state) => state.persist);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      const preLoginResponse = await api.post<{ hasUser: boolean }>({
        body: { email: data.email },
        route: apiPaths.default
      });

      if (!preLoginResponse.hasUser) {
        callToast.error(i18n.t('errors:invalidCredential'));
        return;
      }

      const { user } = await signInWithEmailAndPassword(firebaseAuth, data.email, data.password);

      const userJson = user.toJSON() as { stsTokenManager: { accessToken: string } };

      const response = await api.post<LoginPayload & { sendEmailVerification: boolean }>({
        body: { userIdToken: userJson?.stsTokenManager?.accessToken },
        route: apiPaths.userLogin
      });

      if (response.sendEmailVerification) {
        await sendEmailVerification(user);
        callToast.error(i18n.t('auth:checkYourEmail'), { autoClose: false });
        return;
      }

      dispatch(setAuth(response));

      navigate(redirectPath ?? response.user.company.companyUrl);
    } catch (error) {
      const err = error as { message: string; errors: { sendEmailToVerification: boolean } };
      const errorMessage = String(err?.message)?.includes('invalid-credential')
        ? i18n.t('errors:invalidCredential')
        : undefined;

      resolverError(error, errorMessage);
    }
  };

  return { ...formData, onSubmit };
};
