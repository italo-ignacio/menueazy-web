import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { QueryName, apiPaths } from 'main/config';
import { api } from 'infra/http';
import { queryClient } from 'infra/lib';
import { resetProduct } from 'store/product/slice';
import { resolverError } from 'main/utils';
import { useAppSelector } from 'store';
import { useDispatch } from 'react-redux';
import { useRestaurant } from 'data/hooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { FC, ReactNode } from 'react';

interface MassActionDataProps {
  published?: boolean;
  inStock?: boolean;
  highlight?: boolean;
  delete?: boolean;
}

export const RestaurantProductMassAction: FC = () => {
  const [massActionData, setMassActionData] = useState<MassActionDataProps>({});
  const { t } = useTranslation('restaurant');
  const { restaurantId } = useRestaurant();

  const dispatch = useDispatch();

  const { productSelected } = useAppSelector((state) => state.product);

  interface ItemProps {
    title: string;
    data: keyof MassActionDataProps;
    value: boolean;
  }

  const handleApply = async (): Promise<void> => {
    try {
      await api.put({
        body: { ...massActionData, ids: Object.values(productSelected).map((item) => item.id) },
        id: 'multiple',
        route: apiPaths.product(restaurantId)
      });

      queryClient.invalidateQueries(QueryName.product);
    } catch (error) {
      resolverError(error);
    }
  };
  const item = (items: ItemProps[]): ReactNode => {
    return (
      <div className={'flex flex-col gap-2'}>
        {items.map(({ data, title, value }) => (
          <div
            key={title}
            className={`bg-gray-200 text-center border-2 min-w-max rounded hover:bg-gray-250 cursor-pointer p-1 px-2 ${massActionData[data] === value ? 'border-primary' : 'border-gray-350'}`}
            onClick={(): void => {
              if (massActionData[data] === value)
                setMassActionData({ ...massActionData, [data]: undefined });
              else setMassActionData({ ...massActionData, [data]: value });
            }}
          >
            {title}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={
        'flex flex-col gap-3 px-6 fixed bottom-2 left-1/2 -translate-x-1/2 bg-white border border-gray-350 p-4 rounded shadow-lg'
      }
    >
      <div className={'flex items-center'}>
        <h2 className={'text-xl text-center w-full'}>{t('product.table.massActions')}</h2>

        <IconButton
          onClick={(): void => {
            dispatch(resetProduct());
          }}
        >
          <Close />
        </IconButton>
      </div>

      <div className={'flex gap-5'}>
        {item([
          { data: 'published', title: t('product.table.publish'), value: true },
          { data: 'published', title: t('product.table.unpublish'), value: false }
        ])}

        {item([
          { data: 'inStock', title: t('product.table.inStock'), value: true },
          { data: 'inStock', title: t('product.table.outOfStock'), value: false }
        ])}

        {item([
          { data: 'highlight', title: t('product.table.highlight'), value: true },
          { data: 'highlight', title: t('product.table.removeHighlight'), value: false }
        ])}

        <div className={'flex flex-col gap-2'}>
          <div
            className={
              'bg-danger text-white p-1 rounded text-center hover:bg-danger/85 cursor-pointer border px-2'
            }
          >
            {t('product.table.deleteProduct')}
          </div>

          <div
            className={
              'bg-primary rounded text-white p-1 text-center hover:bg-primary/85 cursor-pointer border px-2'
            }
            onClick={handleApply}
          >
            {t('apply', { ns: 'common' })}
          </div>
        </div>
      </div>
    </div>
  );
};
