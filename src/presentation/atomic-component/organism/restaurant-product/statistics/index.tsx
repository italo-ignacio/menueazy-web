import { currencyData } from 'domain/models';
import { useAppSelector } from 'store';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

export const RestaurantProductStatistics: FC = () => {
  const { t } = useTranslation('restaurant');
  const { currency } = useAppSelector((state) => state.persist);

  return (
    <div className={'flex divide-x-2 overflow-auto bg-white p-4 rounded-md border border-gray-250'}>
      <div className={'flex flex-col gap-2 w-full min-w-max px-4'}>
        <h3>{t('product.statistics.paymentSuccess')}</h3>
        <h2 className={'font-bold text-2xl pl-1'}>{currencyData[currency].symbol}412.450,99</h2>
      </div>

      <div className={'flex flex-col gap-2 w-full min-w-max px-4'}>
        <h3>{t('product.statistics.paymentCanceled')}</h3>
        <h2 className={'font-bold text-2xl pl-1'}>894</h2>
      </div>

      <div className={'flex flex-col gap-2 w-full min-w-max px-4'}>
        <h3>{t('product.statistics.totalCustomer')}</h3>
        <h2 className={'font-bold text-2xl pl-1'}>2.850</h2>
      </div>

      <div className={'flex flex-col gap-2 w-full min-w-max px-4'}>
        <h3>{t('product.statistics.totalOrders')}</h3>
        <h2 className={'font-bold text-2xl pl-1'}>10.650</h2>
      </div>
    </div>
  );
};
