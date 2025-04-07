import { Checkbox, TableHead, TableRow } from '@mui/material';
import { HeaderCell } from 'presentation/atomic-component/atom';
import { SortFilter } from 'presentation/atomic-component/atom/sort-filter';
import { TableSort } from 'presentation/atomic-component/atom/table-filter';
import { addSelectData, removeSelectData } from 'store/select/slice';
import { setSortFilter } from 'main/utils';
import { useAppSelector } from 'store';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';
import type { FindIngredientQuery } from 'domain/models';
import type { UseQueryResult } from 'react-query';

interface IngredientTableHeaderProps {
  query: UseQueryResult<FindIngredientQuery>;
}

export const IngredientTableHeader: FC<IngredientTableHeaderProps> = ({ query }) => {
  const { t } = useTranslation('restaurant');
  const dispatch = useDispatch();

  const { ingredientSelected } = useAppSelector((state) => state.select);
  const items = query.data?.content ?? [];

  return (
    <TableHead>
      <TableRow className={'bg-gray-100'}>
        <HeaderCell
          first
          minWidth={300}
          title={
            <div className={'flex items-center gap-3 relative'}>
              <div className={'absolute'}>
                <Checkbox
                  checked={items?.length > 0 && items?.every((item) => ingredientSelected[item.id])}
                  onChange={(event): void => {
                    if (event.target.checked)
                      dispatch(addSelectData({ data: items, type: 'ingredientSelected' }));
                    else
                      dispatch(
                        removeSelectData({
                          ids: items?.map((item) => item.id),
                          type: 'ingredientSelected'
                        })
                      );
                  }}
                />
              </div>

              <span className={'ml-[50px] flex gap-2'}>
                {t('stock.table.name')}{' '}
                <SortFilter filterName={'name'} {...setSortFilter('ingredient', 'name')} />
              </span>
            </div>
          }
          width={'100%'}
        />

        <HeaderCell
          minWidth={200}
          title={
            <TableSort
              filterName={'quantity'}
              sortItem={setSortFilter('ingredient', 'quantity')}
              title={t('stock.table.inStock')}
            />
          }
        />

        <HeaderCell
          minWidth={200}
          title={
            <TableSort
              filterName={'priceInStock'}
              sortItem={setSortFilter('ingredient', 'priceInStock')}
              title={t('stock.table.priceInStock')}
            />
          }
        />

        <HeaderCell
          minWidth={200}
          title={
            <TableSort
              filterName={'totalPrice'}
              sortItem={setSortFilter('ingredient', 'totalPrice')}
              title={t('stock.table.totalPrice')}
            />
          }
        />

        <HeaderCell last minWidth={200} title={t('stock.table.actions')} />
      </TableRow>
    </TableHead>
  );
};
