import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

export const HomeContent: FC = () => {
  const { t } = useTranslation('home');

  return (
    <div className={'flex flex-col gap-6 laptop:gap-10 desktop:gap-14 py-6'}>
      <h1>{t('title')}</h1>
    </div>
  );
};
