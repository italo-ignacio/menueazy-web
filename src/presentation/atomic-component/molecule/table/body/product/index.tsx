import { BodyCell, ItemNotFound } from 'presentation/atomic-component/atom';
import { Button, Checkbox, IconButton, Switch, TableBody, TableRow } from '@mui/material';
import { type FindProductQuery, currencyData } from 'domain/models';
import { Link } from 'react-router-dom';
import { NavigateNext, Star, StarOutline } from '@mui/icons-material';
import { QueryName, apiPaths, paths } from 'main/config';
import { addProduct, removeProduct } from 'store/product/slice';
import { api } from 'infra/http';
import { colors } from 'presentation/style';
import { queryClient } from 'infra/lib';
import { resolverError } from 'main/utils';
import { useAppSelector } from 'store';
import { useDispatch } from 'react-redux';
import { useRestaurant } from 'data/hooks';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';
import type { UseQueryResult } from 'react-query';

interface ProductTableBodyProps {
  query: UseQueryResult<FindProductQuery>;
}

interface ActionDataProps {
  published?: boolean;
  inStock?: boolean;
  highlight?: boolean;
}

export const ProductTableBody: FC<ProductTableBodyProps> = ({ query }) => {
  const { currency } = useAppSelector((state) => state.persist);
  const { productSelected } = useAppSelector((state) => state.product);
  const dispatch = useDispatch();

  const { t } = useTranslation('restaurant');

  const { restaurantId, restaurantUrl } = useRestaurant();

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

  return (
    <TableBody className={'relative'}>
      {query?.data?.content?.length === 0 && !query.isFetching ? <ItemNotFound /> : null}

      {query?.data?.content?.map((item, index) => (
        <TableRow
          key={item.id}
          className={productSelected[item.id] ? 'bg-primary/5' : 'hover:bg-gray-50'}
        >
          <BodyCell
            firstRow={index === 0}
            title={
              <div className={'flex items-center gap-3 h-12'}>
                <Checkbox
                  checked={!!productSelected[item.id]}
                  onChange={(event): void => {
                    if (event.target.checked) dispatch(addProduct([item]));
                    else dispatch(removeProduct([item.id]));
                  }}
                />

                {item.imageList?.length ? (
                  <img
                    alt={' '}
                    className={'object-fill rounded-sm'}
                    height={50}
                    src={item.imageList[0].url}
                    width={50}
                  />
                ) : null}

                <div>
                  <h3 className={'font-semibold text-base'}>{item.name}</h3>
                  <span>{t('product.table.sold', { count: item?.totalOrder ?? 0 })}</span>
                </div>
              </div>
            }
          />

          <BodyCell
            firstRow={index === 0}
            title={
              <span>
                {currencyData[currency].symbol} <strong>{item.price.toFixed(2)}</strong>
              </span>
            }
          />

          <BodyCell
            firstRow={index === 0}
            title={
              <Switch
                checked={item.published}
                onChange={(event): void => {
                  handleAction(item.id, 'published', event.target.checked);
                }}
              />
            }
          />

          <BodyCell
            firstRow={index === 0}
            title={
              <Switch
                checked={item.inStock}
                onChange={(event): void => {
                  handleAction(item.id, 'inStock', event.target.checked);
                }}
              />
            }
          />

          <BodyCell
            firstRow={index === 0}
            title={
              <IconButton
                onClick={(): void => {
                  handleAction(item.id, 'highlight', !item.highlight);
                }}
              >
                {item.highlight ? <Star sx={{ color: colors.yellow }} /> : <StarOutline />}
              </IconButton>
            }
          />

          {/* <BodyCell
            firstRow={index === 0}
            title={t('product.table.sold', { count: item?.totalOrder ?? 0 })}
          /> */}

          <BodyCell
            firstRow={index === 0}
            title={
              <div className={'flex flex-wrap items-center gap-3'}>
                <div className={'flex items-center gap-1'}>
                  <Star className={'text-[#ff9100]'} color={'inherit'} />

                  {item.avgRate ? (
                    <span className={'font-bold'}>{item.avgRate.toFixed(1)}</span>
                  ) : null}
                </div>

                <div className={'flex items-center gap-1 text-gray-600'}>
                  <span>{item?.totalRate ?? 0}</span>

                  <span>
                    {item.totalRate === 1
                      ? t('product.table.review_one')
                      : t('product.table.review')}
                  </span>
                </div>
              </div>
            }
          />

          <BodyCell
            firstRow={index === 0}
            title={
              <Link to={paths.restaurantProductId(restaurantUrl, item.id)}>
                <Button color={'info'} sx={{ maxWidth: 40, minWidth: '0' }}>
                  <NavigateNext />
                </Button>
              </Link>
            }
          />
        </TableRow>
      ))}
    </TableBody>
  );
};
