import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

interface BooleanSearchProps {
  title: string;
  value: boolean | string;
  onChange: (newValue?: boolean | string) => void;
}

export const BooleanSearch: FC<BooleanSearchProps> = ({ title, onChange, value }) => {
  const { t } = useTranslation('common');

  return (
    <div className={'flex flex-col gap-2'}>
      <span className={'min-w-max'}>{title}</span>

      <div className={'flex items-center gap-2'}>
        <div
          className={`w-full text-center p-1 px-4 rounded cursor-pointer ${value === true ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={(): void => {
            onChange(value === true ? '' : true);
          }}
        >
          {t('yes')}
        </div>

        <div
          className={`w-full text-center p-1 px-4 rounded cursor-pointer ${value === false ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={(): void => {
            onChange(value === false ? '' : false);
          }}
        >
          {t('no')}
        </div>
      </div>
    </div>
  );
};
