import { Button } from '@mui/material';
import { api } from 'infra/http';
import { resolverError } from 'main/utils';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

export const HomeContent: FC = () => {
  const { t } = useTranslation('home');

  return (
    <div className={'flex flex-col gap-6 laptop:gap-10 desktop:gap-14 py-6'}>
      <h1>{t('title')}</h1>

      <Button
        onClick={async (): Promise<void> => {
          try {
            const res = await api.get({ route: '/test' });

            console.log(res);
          } catch (error) {
            resolverError(error);
          }
        }}
      >
        aaa
      </Button>
    </div>
  );
};
