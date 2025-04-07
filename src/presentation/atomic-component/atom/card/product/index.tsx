import { Button, IconButton, Switch } from '@mui/material';
import {
  CheckBoxOutlineBlank,
  CheckBoxOutlined,
  NavigateNext,
  Star,
  StarOutline
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { type Product, currencyData } from 'domain/models';
import { QueryName, apiPaths, paths } from 'main/config';
import { addSelectData, removeSelectData } from 'store/select/slice';
import { api } from 'infra/http';
import { colors } from 'presentation/style';
import { queryClient } from 'infra/lib';
import { resolverError } from 'main/utils';
import { useAppSelector } from 'store';
import { useDispatch } from 'react-redux';
import { useRestaurant } from 'data/hooks';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-material-ui-carousel';
import type { FC } from 'react';

interface ActionDataProps {
  published?: boolean;
  inStock?: boolean;
  highlight?: boolean;
}

export const ProductCard: FC<Product> = ({ ...item }) => {
  const { t } = useTranslation('restaurant');
  const { currency } = useAppSelector((state) => state.persist);
  const { restaurantId, restaurantUrl } = useRestaurant();
  const { productSelected } = useAppSelector((state) => state.select);

  const dispatch = useDispatch();

  const handleAction = async (
    id: number,
    data: keyof ActionDataProps,
    value: boolean
  ): Promise<void> => {
    try {
      await api.put({
        body: { [data]: value, ids: [id] },
        id: 'multiple',
        route: apiPaths.product(restaurantId)
      });

      queryClient.invalidateQueries(QueryName.product);
    } catch (error) {
      resolverError(error);
    }
  };

  const handleClick = (): void => {
    if (productSelected[item.id])
      dispatch(removeSelectData({ ids: [item.id], type: 'productSelected' }));
    else dispatch(addSelectData({ data: [item], type: 'productSelected' }));
  };

  return (
    <div
      className={`flex gap-4 flex-col shadow-base border rounded ${productSelected[item.id] ? 'bg-primary/5' : ''}`}
    >
      <Carousel
        autoPlay={false}
        indicators={false}
        navButtonsAlwaysInvisible={item?.imageList?.length <= 1}
        swipe={true}
      >
        {item?.imageList?.map((image) => (
          <img
            key={image.id}
            alt={' '}
            className={'w-full h-[200px] rounded-md object-cover'}
            src={image.url}
          />
        ))}
      </Carousel>

      <div className={'flex flex-col pt-1 p-4 gap-3'}>
        <div className={'flex items-center gap-1'}>
          {productSelected[item.id] ? (
            <CheckBoxOutlined
              className={'cursor-pointer text-primary hover:text-primary'}
              color={'inherit'}
              onClick={handleClick}
            />
          ) : (
            <CheckBoxOutlineBlank
              className={'cursor-pointer text-gray-550 hover:text-gray-600'}
              color={'inherit'}
              onClick={handleClick}
            />
          )}

          <h2 className={'text-xl font-semibold break-words'} onClick={handleClick}>
            {item.name}
          </h2>
        </div>

        <div className={'flex gap-2 flex-wrap justify-between'}>
          <div className={'flex flex-wrap items-center gap-3'}>
            <div className={'flex items-center gap-1'}>
              <Star className={'text-[#ff9100]'} color={'inherit'} />
              {item.avgRate ? <span className={'font-bold'}>{item.avgRate.toFixed(1)}</span> : null}
            </div>

            <div className={'flex items-center gap-1 text-gray-600'}>
              <span>{item?.totalRate ?? 0}</span>

              <span>
                {item.totalRate === 1 ? t('product.table.review_one') : t('product.table.review')}
              </span>
            </div>
          </div>

          <span>{t('product.table.sold', { count: item?.totalOrder ?? 0 })}</span>
        </div>

        <div className={'flex flex-wrap flex-row justify-between gap-0.5'}>
          <div className={'flex flex-wrap items-center'}>
            <h2>{t('product.table.published')}:</h2>

            <Switch
              checked={item.published}
              onChange={(event): void => {
                handleAction(item.id, 'published', event.target.checked);
              }}
            />
          </div>

          <div className={'flex flex-wrap items-center'}>
            <h2>{t('product.table.inStock')}:</h2>

            <Switch
              checked={item.inStock}
              onChange={(event): void => {
                handleAction(item.id, 'inStock', event.target.checked);
              }}
            />
          </div>
        </div>

        <div className={'flex flex-wrap justify-between items-center gap-2'}>
          <span className={'text-xl'}>
            {currencyData[currency].symbol} <strong>{item.price.toFixed(2)}</strong>
          </span>

          <div className={'flex flex-wrap gap-2 items-center'}>
            <IconButton
              onClick={(): void => {
                handleAction(item.id, 'highlight', !item.highlight);
              }}
            >
              {item.highlight ? <Star sx={{ color: colors.yellow }} /> : <StarOutline />}
            </IconButton>

            <Link to={paths.restaurantProductId(restaurantUrl, item.id)}>
              <Button
                className={'w-full'}
                endIcon={<NavigateNext color={'error'} />}
                variant={'outlined'}
              >
                Detalhes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
