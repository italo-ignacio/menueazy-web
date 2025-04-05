import { Close } from '@mui/icons-material';
import { IconButton, Rating } from '@mui/material';
import { LabelInput } from 'presentation/atomic-component/atom';
import { currencyData } from 'domain/models';
import { useAppSelector } from 'store';
import { useEffect, useState } from 'react';
import { useSearch } from 'data/hooks';
import { useTranslation } from 'react-i18next';
import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';

interface MinMaxSearchProps {
  title: string;
  type?: 'monetary' | 'number' | 'rating';
  minValue: string;
  onMinChange: (newValue?: string) => void;
  maxValue: string;
  onMaxChange: (newValue?: string) => void;
}

export const MinMaxSearch: FC<MinMaxSearchProps> = ({
  title,
  onMaxChange,
  onMinChange,
  maxValue,
  minValue,
  type = 'number'
}) => {
  const { t } = useTranslation('common');
  const { currency } = useAppSelector((state) => state.persist);

  const [minData, setMinData] = useState(minValue);
  const [maxData, setMaxData] = useState(maxValue);

  const { search: minSearch } = useSearch({ searchDebounce: minData });
  const { search: maxSearch } = useSearch({ searchDebounce: maxData });

  useEffect(() => {
    onMinChange(String(minSearch ?? ''));
  }, [minSearch]);

  useEffect(() => {
    onMaxChange(String(maxSearch ?? ''));
  }, [maxSearch]);

  const getInput = (
    value: string,
    onChange: Dispatch<SetStateAction<string>>,
    min?: boolean
  ): ReactNode => {
    if (type === 'rating')
      return (
        <span className={'flex items-center gap-2'}>
          <Rating
            onChange={(_event, newValue) => {
              onChange(String(newValue ?? ''));
            }}
            precision={0.5}
            value={value && !isNaN(Number(value)) ? Number(value) : 0}
          />

          {/*
          {value ? (
            <IconButton onClick={(): void => onChange('')}>
              <Close />
            </IconButton>
          ) : null} */}
        </span>
      );

    return (
      <LabelInput
        EndIcon={
          value ? (
            <IconButton onClick={(): void => onChange('')} tabIndex={-1}>
              <Close />
            </IconButton>
          ) : null
        }
        StartIcon={type === 'monetary' && value ? currencyData[currency].symbol : ''}
        inputProps={{ min: 0 }}
        label={min ? t('min') : t('max')}
        onChange={(event): void => {
          onChange(event.target.value);
        }}
        // type={'number'}
        value={value}
      />
    );
  };

  return (
    <div className={'flex flex-col gap-2'}>
      <span className={'min-w-max'}>{title}</span>

      <div className={'flex items-center gap-2'}>
        <div className={'max-w-[200px]'}>{getInput(maxData, setMaxData, true)}</div>
        <span className={'text-gray-600'}>-</span>
        <div className={'max-w-[200px]'}>{getInput(minData, setMinData)}</div>
      </div>
    </div>
  );
};
