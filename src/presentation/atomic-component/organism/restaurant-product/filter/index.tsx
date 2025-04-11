import {
  Add,
  DnsOutlined,
  FormatListBulleted,
  Remove,
  SaveAlt,
  ViewModule
} from '@mui/icons-material';
import { BooleanSearch, MinMaxSearch } from 'presentation/atomic-component/molecule';
import { Button, Collapse } from '@mui/material';
import { type FC, useState } from 'react';
import { GenericFilter } from 'presentation/atomic-component/atom/generic-filter';
import { Select } from 'presentation/atomic-component/atom/select';
import { SortFilter } from 'presentation/atomic-component/atom/sort-filter';
import { api } from 'infra/http';
import { apiPaths, dimensions, paths } from 'main/config';
import { colors } from 'presentation/style';
import { orderByProductSelect } from 'main/mock/product';
import { resolverError, setFilter } from 'main/utils';
import { useAppSelector } from 'store';
import { useFindCategoryQuery } from 'infra/cache';
import { useNavigate } from 'react-router-dom';
import { useRestaurant, useWindowDimensions } from 'data/hooks';
import { useTranslation } from 'react-i18next';
import type { SelectValues } from 'presentation/atomic-component/atom/select';

interface RestaurantProductFilterProps {
  totalElements?: number;
}

export const RestaurantProductFilter: FC<RestaurantProductFilterProps> = ({ totalElements }) => {
  const { restaurantId, restaurantUrl } = useRestaurant();
  const {
    cardSize,
    limit,
    showStyle,
    priceLT,
    priceMT,
    highlight,
    inStock,
    sort,
    orderBy,
    published,
    name,
    totalOrderLT,
    categoryList,
    avgRateLT,
    avgRateMT,
    orderBySelect,
    totalOrderMT
  } = useAppSelector((state) => state.filter.product);

  const categoryQuery = useFindCategoryQuery({ restaurantId });
  const navigate = useNavigate();

  const [showFilter, setShowFilter] = useState(false);
  const { width } = useWindowDimensions();
  const { t } = useTranslation('restaurant');

  const addProduct = async (): Promise<void> => {
    try {
      const { id } = await api.post<{ id: number }>({
        route: apiPaths.product(restaurantId)
      });

      navigate(paths.restaurantProductId(restaurantUrl, id));
    } catch (error) {
      resolverError(error);
    }
  };

  const getCardLimit = (): number => {
    if (totalElements && totalElements < 8) return totalElements;
    if (limit && limit < 8) return 8;
    if (limit) return limit;

    return 5;
  };

  const getInitialSize = (): number => {
    if (width > dimensions.desktop) return 5;
    if (width > dimensions.laptop) return 4;

    if (width > 450) return 2;

    return 1;
  };

  const cardSizeAdd = (): number => {
    if (width > dimensions.laptop) return cardSize < 5 ? cardSize + 1 : cardSize;
    if (width > 450) return cardSize < 2 ? cardSize + 1 : cardSize;

    return cardSize < 1 ? cardSize + 1 : cardSize;
  };

  return (
    <div
      className={
        'flex flex-col divide-y gap-4 border border-gray-100 bg-white rounded shadow-base p-4 pb-2'
      }
    >
      <div
        className={
          'flex flex-col gap-4 tablet:gap-0 tablet:flex-row overflow-auto justify-between p-1 tablet:divide-x-2'
        }
      >
        <div className={'flex gap-4 items-center'}>
          <GenericFilter
            autoFocus={false}
            onChange={(nameValue) => setFilter('product', { name: nameValue })}
          />

          {totalElements ? (
            <span className={'flex gap-1 '}>
              <strong>{totalElements}</strong>
              <span>{t('items', { count: totalElements, ns: 'common' })}</span>
            </span>
          ) : null}
        </div>

        <div className={'flex tablet:ml-auto tablet:pr-5 tablet:justify-end tablet:pl-4 gap-4'}>
          <div className={'relative'}>
            {avgRateLT ||
            avgRateMT ||
            typeof highlight === 'boolean' ||
            typeof inStock === 'boolean' ||
            name ||
            priceLT ||
            priceMT ||
            typeof published === 'boolean' ||
            totalOrderLT ||
            totalOrderMT ||
            categoryList?.length > 0 ? (
              <span className={'absolute -top-1 -right-2 z-20 bg-primary w-5 h-5 rounded-full'} />
            ) : null}

            <Button
              color={'info'}
              onClick={(): void => setShowFilter(!showFilter)}
              startIcon={<FormatListBulleted />}
              sx={{ backgroundColor: showFilter ? colors.gray[250] : '' }}
            >
              {t('product.filter.name')}
            </Button>
          </div>

          {showStyle === 'CARD' ? (
            <div className={'flex gap-1'}>
              <Button
                color={'info'}
                onClick={(): void => setFilter('product', { showStyle: 'LIST' })}
                startIcon={<ViewModule />}
              >
                {t('product.filter.typeCard')} {cardSize}
              </Button>

              {cardSizeAdd() > 1 ? (
                <div className={'flex flex-row-reverse gap-2 tablet:gap-0 tablet:flex-col'}>
                  <div
                    className={
                      'bg-gray-100 min-w-[30px] tablet:min-w-0 flex items-center justify-center text-sm rounded-t-md hover:bg-gray-200 cursor-pointer'
                    }
                    onClick={(): void => setFilter('product', { cardSize: cardSizeAdd() })}
                  >
                    <Add fontSize={'small'} />
                  </div>

                  <div
                    className={
                      'bg-gray-100 min-w-[30px] tablet:min-w-0 flex items-center justify-center text-sm rounded-b-md hover:bg-gray-200 cursor-pointer'
                    }
                    onClick={(): void =>
                      setFilter('product', { cardSize: cardSize > 1 ? cardSize - 1 : cardSize })
                    }
                  >
                    <Remove fontSize={'small'} />
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <Button
              color={'info'}
              onClick={(): void =>
                setFilter('product', {
                  cardSize: getInitialSize(),
                  limit: getCardLimit(),
                  showStyle: 'CARD'
                })
              }
              startIcon={<DnsOutlined />}
            >
              {t('product.filter.typeList')}
            </Button>
          )}
        </div>

        <div className={'flex tablet:pl-5 gap-4'}>
          <Button color={'info'} startIcon={<SaveAlt />}>
            {t('product.filter.export')}
          </Button>

          <Button onClick={addProduct} startIcon={<Add />}>
            {t('product.filter.newProduct')}
          </Button>
        </div>
      </div>

      <Collapse in={showFilter}>
        <div className={'flex flex-col tablet:flex-row gap-10 p-2 py-5'}>
          <div className={'flex flex-col gap-4'}>
            <MinMaxSearch
              maxValue={priceMT}
              minValue={priceLT}
              onMaxChange={(value): void => setFilter('product', { priceMT: value })}
              onMinChange={(value): void => setFilter('product', { priceLT: value })}
              title={t('product.table.price')}
              type={'monetary'}
            />

            <MinMaxSearch
              maxValue={totalOrderMT}
              minValue={totalOrderLT}
              onMaxChange={(value): void => setFilter('product', { totalOrderMT: value })}
              onMinChange={(value): void => setFilter('product', { totalOrderLT: value })}
              title={t('product.table.totalSold')}
            />

            <MinMaxSearch
              maxValue={avgRateMT}
              minValue={avgRateLT}
              onMaxChange={(value): void => setFilter('product', { avgRateMT: value })}
              onMinChange={(value): void => setFilter('product', { avgRateLT: value })}
              title={t('product.table.review')}
              type={'rating'}
            />
          </div>

          <div className={'flex flex-col gap-4 tablet:min-w-[160px]'}>
            <BooleanSearch
              onChange={(value): void => setFilter('product', { highlight: value })}
              title={t('product.table.highlight')}
              value={highlight}
            />

            <BooleanSearch
              onChange={(value): void => setFilter('product', { inStock: value })}
              title={t('product.table.inStock')}
              value={inStock}
            />

            <BooleanSearch
              onChange={(value): void => setFilter('product', { published: value })}
              title={t('product.table.published')}
              value={published}
            />
          </div>

          <div className={'flex flex-col gap-3'}>
            <h2>{t('product.table.category')}</h2>

            <div className={'flex flex-wrap gap-2'}>
              {categoryQuery?.data?.content?.map((category) => {
                const allCategoryList = [...categoryList];

                const hasData = allCategoryList.includes(category.id);

                return (
                  <div
                    key={category.id}
                    className={`p-1 px-4 rounded cursor-pointer ${hasData ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                    onClick={(): void => {
                      setFilter('product', {
                        categoryList: hasData
                          ? allCategoryList.filter((items) => items !== category.id)
                          : [...allCategoryList, category.id]
                      });
                    }}
                  >
                    {category.name}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={'flex flex-col w-[250px] gap-3'}>
            <h2>{t('orderBy', { ns: 'common' })}</h2>

            <div className={'flex w-full items-center gap-3'}>
              <Select
                id={'order-by-product'}
                onChange={(event): void => {
                  const data = event as SelectValues | null;

                  setFilter('product', {
                    orderBy: data?.value ?? null,
                    orderBySelect: data,
                    sort: 'asc'
                  });
                }}
                options={orderByProductSelect}
                value={orderBySelect}
              />

              {orderBySelect ? (
                <SortFilter
                  filterName={orderBySelect.value}
                  onChangeSort={(value): void => setFilter('product', { sort: value })}
                  orderBy={orderBy}
                  sort={sort}
                />
              ) : null}
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};
