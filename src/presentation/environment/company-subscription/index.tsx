import { MainDiv } from 'presentation/atomic-component/atom';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

export const CompanySubscriptionContent: FC = () => {
  const { t } = useTranslation('company');

  return (
    <MainDiv title={t('subscription.title')}>
      <div className={'flex flex-col border border-input-border-2 rounded'}>
        Company subscription
      </div>
    </MainDiv>
  );
};
