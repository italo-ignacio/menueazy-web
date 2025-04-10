import { currencyData } from 'domain/models';
import { useAppSelector } from 'store';
import type { FC } from 'react';

interface PriceWithDiscountProps {
  price: number | string;
  discount?: number | string;
  startDiscountAt?: Date | null;
  finishDiscountAt?: Date | null;
}

export const PriceWithDiscount: FC<PriceWithDiscountProps> = ({
  discount,
  finishDiscountAt,
  price,
  startDiscountAt
}) => {
  const { currency } = useAppSelector((state) => state.persist);

  const hasDiscount = (): boolean => {
    if (typeof discount === 'undefined' || !discount) return false;

    const now = new Date();

    const start = startDiscountAt ? new Date(startDiscountAt) : null;
    const finish = finishDiscountAt ? new Date(finishDiscountAt) : null;

    if (start && finish) return now >= start && now <= finish;

    if (start && !finish) return now >= start;

    if (!start && finish) return now <= finish;

    return true;
  };

  const formatNumber = (number?: number | string): string => {
    if (typeof number !== 'undefined') return Number(String(number).replace(',', '.')).toFixed(2);

    return '';
  };

  return (
    <div className={'flex flex-wrap min-w-max items-end gap-1'}>
      <div className={'flex text-lg items-center gap-1'}>
        <span>{currencyData[currency].symbol}</span>
        <strong>{hasDiscount() ? formatNumber(discount) : formatNumber(price)}</strong>
      </div>

      {hasDiscount() ? (
        <span className={'text-sm ml-1 line-through'}>{formatNumber(price)}</span>
      ) : null}
    </div>
  );
};
