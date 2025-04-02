import { NumberMetric } from 'presentation/atomic-component/atom';
import { currencyData } from 'domain/models';
import { useAppSelector } from 'store';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

export const RestaurantProductStatistics: FC = () => {
  const { t } = useTranslation('restaurant');
  const { currency } = useAppSelector((state) => state.persist);

  return (
    <div
      className={
        'flex divide-x-2 overflow-auto border border-gray-100 bg-white p-4 rounded shadow-base'
      }
    >
      <div className={'flex flex-col gap-2 w-full min-w-max px-4'}>
        <h3>{t('product.statistics.paymentSuccess')}</h3>

        <div className={'flex gap-3 items-center'}>
          <h2 className={'font-bold text-[26px] pl-1'}>
            {currencyData[currency].symbol}412.450,99
          </h2>

          <NumberMetric number={12.8} />
        </div>
      </div>

      <div className={'flex flex-col gap-2 w-full min-w-max px-4'}>
        <h3>{t('product.statistics.paymentCanceled')}</h3>

        <div className={'flex gap-3 items-center'}>
          <h2 className={'font-bold text-[26px] pl-1'}>894</h2>
          <NumberMetric number={-6.8} />
        </div>
      </div>

      <div className={'flex flex-col gap-2 w-full min-w-max px-4'}>
        <h3>{t('product.statistics.totalCustomer')}</h3>

        <div className={'flex gap-3 items-center'}>
          <h2 className={'font-bold text-[26px] pl-1'}>2.850</h2>
          <NumberMetric number={-3.8} />
        </div>
      </div>

      <div className={'flex flex-col gap-2 w-full min-w-max px-4'}>
        <h3>{t('product.statistics.totalOrders')}</h3>

        <div className={'flex gap-3 items-center'}>
          <h2 className={'font-bold text-[26px] pl-1'}>10.650</h2>
          <NumberMetric number={8.8} />
        </div>
      </div>
    </div>
  );
};
