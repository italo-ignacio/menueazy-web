import { api } from 'infra/http';
import { queryClient } from 'infra/lib/react-query';
import { resolverError } from 'main/utils';
import { toast } from 'react-toastify';

interface useDeleteProps {
  id: number | string;
  route: unknown;
  closeModal: () => void;
  afterDelete?: () => void;
  queryName: string;
  successMessage: string;
  isPatch?: boolean;
}

export const useDelete = ({
  id,
  route,
  closeModal,
  afterDelete,
  queryName,
  successMessage,
  isPatch
}: useDeleteProps): { handleDelete: () => Promise<void> } => {
  const handleDelete = async (): Promise<void> => {
    try {
      if (isPatch) await api.patch({ id, route });
      else await api.delete({ id, route });

      queryClient.invalidateQueries(queryName);
      toast.success(successMessage);
      if (afterDelete) afterDelete();
      closeModal();
    } catch (error) {
      resolverError(error);
    }
  };

  return {
    handleDelete
  };
};
