import { MainDiv } from 'presentation/atomic-component/atom';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

export const UserProfileContent: FC = () => {
  const { t } = useTranslation('company');

  return (
    <MainDiv title={t('profile.title')}>
      <div className={'flex flex-col border border-input-border-2 rounded'}>
        Company User Profile
      </div>
    </MainDiv>
  );
};
