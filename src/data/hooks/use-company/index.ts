import { encryptUniqueData } from 'main/utils/crypto';
import { useAppSelector } from 'store';
import { useParams } from 'react-router-dom';

export const useCompany = (): { companyId: number; companyUrl: string } => {
  const { cA } = useAppSelector((state) => state.a);
  const { companyUrl } = useParams() as { companyUrl: string };

  return {
    companyId: cA?.[encryptUniqueData(companyUrl)] ?? 0,
    companyUrl
  };
};
