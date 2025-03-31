import { UserLoginForm } from 'presentation/atomic-component/molecule/form';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

export const AuthContent: FC = () => {
  const { t } = useTranslation('auth');

  return (
    <div
      className={
        'flex flex-col gap-4 p-12 rounded mx-auto h-full justify-center items-center border '
      }
    >
      <div className={'hidden laptop:flex flex-col gap-2 text-center'}>
        <h2 className={'font-semibold text-4xl'}>{t('welcome', { ns: 'common' })}</h2>
        <p>{t('loginToYourAccount')}</p>
      </div>

      <div className={'flex flex-col w-full px-5 tablet:max-w-[600px] laptop:mt-9'}>
        <UserLoginForm />
      </div>
    </div>
  );
};
