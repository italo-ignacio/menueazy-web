import { NumberMetric } from 'presentation/atomic-component/atom';
import { currencyData } from 'domain/models';
import { useAppSelector } from 'store';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

export const RestaurantStockStatistics: FC = () => {
  const { t } = useTranslation('restaurant');
  const { currency } = useAppSelector((state) => state.persist);

  return (
    <div
      className={
        'flex divide-x-2 overflow-auto border border-gray-100 bg-white p-4 rounded shadow-base'
      }
    >
      <div className={'flex flex-col gap-2 w-full min-w-max px-4'}>
        <h3>{t('stock.statistics.totalPrice')}</h3>

        <div className={'flex gap-3 items-center'}>
          <h2 className={'font-bold text-[26px] pl-1'}>
            {currencyData[currency].symbol}180.250,99
          </h2>

          <NumberMetric number={12.8} />
        </div>
      </div>

      <div className={'flex flex-col gap-2 w-full min-w-max px-4'}>
        <h3>{t('stock.statistics.priceInStock')}</h3>

        <div className={'flex gap-3 items-center'}>
          <h2 className={'font-bold text-[26px] pl-1'}>{currencyData[currency].symbol}60.50,99</h2>
          <NumberMetric number={-6.8} />
        </div>
      </div>

      <div className={'flex flex-col gap-2 w-full min-w-max px-4'}>
        <h3>{t('stock.statistics.priceLastMonth')}</h3>

        <div className={'flex gap-3 items-center'}>
          <h2 className={'font-bold text-[26px] pl-1'}>{currencyData[currency].symbol}13.500,99</h2>
          <NumberMetric number={-3.8} />
        </div>
      </div>

      <div className={'flex flex-col gap-2 w-full min-w-max px-4'}>
        <h3>{t('stock.statistics.dailyCost')}</h3>

        <div className={'flex gap-3 items-center'}>
          <h2 className={'font-bold text-[26px] pl-1'}>{currencyData[currency].symbol}450,99</h2>
          <NumberMetric number={8.8} />
        </div>
      </div>
    </div>
  );
};
