import {
  Add,
  DnsOutlined,
  FormatListBulleted,
  Remove,
  SaveAlt,
  ViewModule
} from '@mui/icons-material';
import { Button, Collapse } from '@mui/material';
import { type FC, useState } from 'react';
import { GenericFilter } from 'presentation/atomic-component/atom/generic-filter';
import { IngredientModal } from 'presentation/atomic-component/molecule/modal';
import { MinMaxSearch } from 'presentation/atomic-component/molecule';
import { Select } from 'presentation/atomic-component/atom/select';
import { SortFilter } from 'presentation/atomic-component/atom/sort-filter';
import { colors } from 'presentation/style';
import { dimensions } from 'main/config';
import { orderByIngredientSelect } from 'main/mock/product';
import { setFilter } from 'main/utils';
import { useAppSelector } from 'store';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions } from 'data/hooks';
import type { SelectValues } from 'presentation/atomic-component/atom/select';

interface RestaurantStockFilterProps {
  totalElements?: number;
}

export const RestaurantStockFilter: FC<RestaurantStockFilterProps> = ({ totalElements }) => {
  const {
    name,
    orderBy,
    orderBySelect,
    priceInStockLT,
    priceInStockMT,
    cardSize,
    quantityLT,
    quantityMT,
    showStyle,
    sort,
    totalPriceLT,
    totalPriceMT,
    limit
  } = useAppSelector((state) => state.filter.ingredient);

  const [showFilter, setShowFilter] = useState(false);
  const { width } = useWindowDimensions();
  const { t } = useTranslation('restaurant');

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
            onChange={(nameValue) => setFilter('ingredient', { name: nameValue })}
          />

          {totalElements ? (
            <span className={'flex gap-1 '}>
              <strong>{totalElements}</strong>
              <span>{t('items', { ns: 'common' })}</span>
            </span>
          ) : null}
        </div>

        <div className={'flex tablet:ml-auto tablet:pr-5 tablet:justify-end tablet:pl-4 gap-4'}>
          <div className={'relative'}>
            {priceInStockLT ||
            priceInStockMT ||
            name ||
            quantityLT ||
            quantityMT ||
            totalPriceLT ||
            totalPriceMT ? (
              <span className={'absolute -top-1 -right-2 z-20 bg-primary w-5 h-5 rounded-full'} />
            ) : null}

            <Button
              color={'info'}
              onClick={(): void => setShowFilter(!showFilter)}
              startIcon={<FormatListBulleted />}
              sx={{ backgroundColor: showFilter ? colors.gray[250] : '' }}
            >
              {t('stock.filter.name')}
            </Button>
          </div>

          {showStyle === 'CARD' ? (
            <div className={'flex gap-1'}>
              <Button
                color={'info'}
                onClick={(): void => setFilter('ingredient', { showStyle: 'LIST' })}
                startIcon={<ViewModule />}
              >
                {t('stock.filter.typeCard')} {cardSize}
              </Button>

              {cardSizeAdd() > 1 ? (
                <div className={'flex flex-row-reverse gap-2 tablet:gap-0 tablet:flex-col'}>
                  <div
                    className={
                      'bg-gray-100 min-w-[30px] tablet:min-w-0 flex items-center justify-center text-sm rounded-t-md hover:bg-gray-200 cursor-pointer'
                    }
                    onClick={(): void => setFilter('ingredient', { cardSize: cardSizeAdd() })}
                  >
                    <Add fontSize={'small'} />
                  </div>

                  <div
                    className={
                      'bg-gray-100 min-w-[30px] tablet:min-w-0 flex items-center justify-center text-sm rounded-b-md hover:bg-gray-200 cursor-pointer'
                    }
                    onClick={(): void =>
                      setFilter('ingredient', { cardSize: cardSize > 1 ? cardSize - 1 : cardSize })
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
                setFilter('ingredient', {
                  cardSize: getInitialSize(),
                  limit: getCardLimit(),
                  showStyle: 'CARD'
                })
              }
              startIcon={<DnsOutlined />}
            >
              {t('stock.filter.typeList')}
            </Button>
          )}
        </div>

        <div className={'flex tablet:pl-5 gap-4'}>
          <Button color={'info'} startIcon={<SaveAlt />}>
            {t('stock.filter.export')}
          </Button>

          <IngredientModal />
        </div>
      </div>

      <Collapse in={showFilter}>
        <div className={'flex gap-10 p-2 py-5'}>
          <div className={'flex flex-col gap-4'}>
            <MinMaxSearch
              maxValue={quantityMT}
              minValue={quantityLT}
              onMaxChange={(value): void => setFilter('ingredient', { quantityMT: value })}
              onMinChange={(value): void => setFilter('ingredient', { quantityLT: value })}
              title={t('stock.table.inStock')}
            />

            <MinMaxSearch
              maxValue={priceInStockMT}
              minValue={priceInStockLT}
              onMaxChange={(value): void => setFilter('ingredient', { priceInStockMT: value })}
              onMinChange={(value): void => setFilter('ingredient', { priceInStockLT: value })}
              title={t('stock.table.priceInStock')}
            />

            <MinMaxSearch
              maxValue={totalPriceMT}
              minValue={totalPriceLT}
              onMaxChange={(value): void => setFilter('ingredient', { totalPriceMT: value })}
              onMinChange={(value): void => setFilter('ingredient', { totalPriceLT: value })}
              title={t('stock.table.totalPrice')}
            />
          </div>

          <div className={'flex flex-col w-[250px] gap-3'}>
            <h2>{t('orderBy', { ns: 'common' })}</h2>

            <div className={'flex w-full items-center gap-3'}>
              <Select
                id={'order-by-ingredient'}
                onChange={(event): void => {
                  const data = event as SelectValues | null;

                  setFilter('ingredient', {
                    orderBy: data?.value ?? null,
                    orderBySelect: data,
                    sort: 'asc'
                  });
                }}
                options={orderByIngredientSelect}
                value={orderBySelect}
              />

              {orderBySelect ? (
                <SortFilter
                  filterName={orderBySelect.value}
                  onChangeSort={(value): void => setFilter('ingredient', { sort: value })}
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
