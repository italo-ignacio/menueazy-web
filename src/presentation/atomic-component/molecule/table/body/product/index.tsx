import { BodyCell, ItemNotFound } from 'presentation/atomic-component/atom';
import { Button, Checkbox, IconButton, Switch, TableBody, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { NavigateNext, Star, StarOutline } from '@mui/icons-material';
import { PriceWithDiscount } from 'presentation/atomic-component/atom/price-with-discount';
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
import type { FC } from 'react';
import type { FindProductQuery } from 'domain/models';
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
  const { productSelected } = useAppSelector((state) => state.select);
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
              <div className={'flex items-center gap-3 h-12'} title={item.name}>
                <Checkbox
                  checked={!!productSelected[item.id]}
                  onChange={(event): void => {
                    if (event.target.checked)
                      dispatch(addSelectData({ data: [item], type: 'productSelected' }));
                    else dispatch(removeSelectData({ ids: [item.id], type: 'productSelected' }));
                  }}
                />

                {item.imageList?.length ? (
                  <img
                    alt={' '}
                    className={'object-fill w-[50px] max-h-[50px] rounded'}
                    src={item.imageList[0].url}
                  />
                ) : (
                  <span className={'w-[50px] h-[50px]'} />
                )}

                <div>
                  <h3 className={'font-semibold text-[15px] line-clamp-2 max-w-[300px]'}>
                    {item.name}
                  </h3>

                  <span>{t('product.table.sold', { count: item?.totalOrder ?? 0 })}</span>
                </div>
              </div>
            }
          />

          <BodyCell
            firstRow={index === 0}
            title={
              <PriceWithDiscount
                discount={item.discount}
                finishDiscountAt={item.finishDiscountAt}
                price={item.price}
                startDiscountAt={item.startDiscountAt}
              />
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
