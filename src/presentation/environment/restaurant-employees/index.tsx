import { MainDiv } from 'presentation/atomic-component/atom';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

export const RestaurantEmployeesContent: FC = () => {
  const { t } = useTranslation('restaurant');

  return (
    <MainDiv title={t('employees.title')}>
      <div className={'flex flex-col'} />
    </MainDiv>
  );
};
