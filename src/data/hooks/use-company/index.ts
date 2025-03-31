import { encryptUniqueData } from 'main/utils/crypto';
import { useAppSelector } from 'store';
import { useParams } from 'react-router-dom';

export const useCompany = (): { id: number; url: string } => {
  const { cA } = useAppSelector((state) => state.a);
  const { companyUrl } = useParams() as { companyUrl: string };

  return {
    id: cA?.[encryptUniqueData(companyUrl)] ?? 0,
    url: companyUrl
  };
};
