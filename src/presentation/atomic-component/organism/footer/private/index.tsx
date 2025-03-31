import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

export const PrivateFooter: FC = () => {
  const { t } = useTranslation('common');

  return (
    <footer
      className={'flex text-gray-500 text-sm text-center justify-center items-center h-[46px]'}
    >
      Menu Eazy - {new Date().getFullYear()} © {t('rightsReserved')}
    </footer>
  );
};
