import { Add, DnsOutlined, FormatListBulleted, SaveAlt } from '@mui/icons-material';
import { Button } from '@mui/material';
import { GenericFilter } from 'presentation/atomic-component/atom/generic-filter';
import { api } from 'infra/http';
import { apiPaths, paths } from 'main/config';
import { resolverError, setFilter } from 'main/utils';
import { useNavigate } from 'react-router-dom';
import { useRestaurant } from 'data/hooks';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

interface RestaurantProductFilterProps {
  totalElements?: number;
}

export const RestaurantProductFilter: FC<RestaurantProductFilterProps> = ({ totalElements }) => {
  const { restaurantId, restaurantUrl } = useRestaurant();
  const navigate = useNavigate();

  const { t } = useTranslation('restaurant');
  const addProduct = async (): Promise<void> => {
    try {
      const { id } = await api.post<{ id: number }>({
        route: apiPaths.product(restaurantId)
      });

      navigate(paths.restaurantProductEdit(restaurantUrl, id));
    } catch (error) {
      resolverError(error);
    }
  };

  return (
    <div
      className={
        'flex justify-between divide-x-2 border border-gray-100 bg-white p-6 rounded shadow-base'
      }
    >
      <div className={'flex gap-4 items-center'}>
        <GenericFilter onChange={(name) => setFilter('product', { name })} />

        {totalElements ? (
          <span className={'flex gap-1 '}>
            <span>{totalElements}</span>
            <span>{t('items', { ns: 'common' })}</span>
          </span>
        ) : null}
      </div>

      <div className={'flex ml-auto pr-5 justify-end pl-4 gap-4'}>
        <Button color={'info'} startIcon={<FormatListBulleted />}>
          {t('product.filter.name')}
        </Button>

        <Button color={'info'} startIcon={<DnsOutlined />}>
          {t('product.filter.typeList')}
        </Button>
      </div>

      <div className={'flex pl-5 gap-4'}>
        <Button color={'info'} startIcon={<SaveAlt />}>
          {t('product.filter.export')}
        </Button>

        <Button onClick={addProduct} startIcon={<Add />}>
          {t('product.filter.newProduct')}
        </Button>
      </div>
    </div>
  );
};
