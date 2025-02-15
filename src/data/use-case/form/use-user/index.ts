import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { resolverError } from 'main/utils';
import { useForm } from 'react-hook-form';
import { userSchema } from 'validation/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import type { SubmitHandler } from 'react-hook-form';
import type { User } from 'domain/models';
import type { UserRequest } from 'validation/schema';
import type { formReturn } from 'domain/protocol';

interface useUserProps {
  user?: User;
  closeModal: () => void;
}

export const useUser = ({ user, closeModal }: useUserProps): formReturn<UserRequest> => {
  const formData = useForm<UserRequest>({
    resolver: yupResolver(userSchema)
  });

  const onSubmit: SubmitHandler<UserRequest> = async (data) => {
    try {
      if (user)
        await api.post({
          body: data,
          route: apiPaths.default
        });

      closeModal();
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
