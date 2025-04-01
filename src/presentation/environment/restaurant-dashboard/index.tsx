import { MainDiv } from 'presentation/atomic-component/atom';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

export const RestaurantDashboardContent: FC = () => {
  const { t } = useTranslation('restaurant');

  return (
    <MainDiv title={t('dashboard.title')}>
      <div className={'flex flex-col'} />
    </MainDiv>
  );
};
