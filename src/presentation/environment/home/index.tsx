import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

export const HomeContent: FC = () => {
  const { t } = useTranslation('home');

  return (
    <div className={'flex flex-col w-full'}>
      <span>{t('title')}</span>
    </div>
  );
};
