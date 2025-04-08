import { type Ingredient, currencyData } from 'domain/models';
import { useAppSelector } from 'store';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

export const IngredientCard: FC<Ingredient> = ({ ...item }) => {
  const { t } = useTranslation('restaurant');

  const { currency } = useAppSelector((state) => state.persist);

  return (
    <div className={'flex gap-4 flex-col p-2 shadow-base border rounded'}>
      <img
        key={item.id}
        alt={' '}
        className={'w-full h-[200px] rounded-md object-cover'}
        src={item.imageUrl}
      />

      <h3>{item.name}</h3>

      <div>
        <span>{t('stock.table.inStock')}: </span>

        <span>
          <strong>{item.quantity}</strong>
          <span> {t(item.measure, { count: item.quantity, ns: 'common' })}</span>
        </span>
      </div>

      <div>
        <span>{t('stock.table.priceInStock')}: </span>

        <span>
          {currencyData[currency].symbol} <strong>{item.totalPrice.toFixed(2)}</strong>
        </span>
      </div>

      <div>
        <span>{t('stock.table.totalPrice')}: </span>

        <span>
          {currencyData[currency].symbol} <strong>{item.priceInStock.toFixed(2)}</strong>
        </span>
      </div>
    </div>
  );
};
