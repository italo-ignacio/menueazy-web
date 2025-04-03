import { NumericInput } from 'presentation/atomic-component/atom';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

interface MinMaxSearchProps {
  title: string;
  onMinChange: (newValue?: number) => void;
  onMaxChange: (newValue?: number) => void;
}

export const MinMaxSearch: FC<MinMaxSearchProps> = ({ title, onMaxChange, onMinChange }) => {
  const { t } = useTranslation('auth');

  return (
    <div className={'flex flex-col gap-2'}>
      <span className={'min-w-max'}>{title}</span>

      <div className={'flex gap-4'}>
        <NumericInput
          label={t('min', { ns: 'common' })}
          onChange={({ floatValue }): void => {
            onMinChange(floatValue);
          }}
          type={'monetary'}
        />

        <NumericInput
          label={t('max', { ns: 'common' })}
          onChange={({ floatValue }): void => {
            onMaxChange(floatValue);
          }}
          type={'monetary'}
        />
      </div>
    </div>
  );
};
