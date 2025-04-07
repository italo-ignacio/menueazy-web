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
import type { FindProductQuery } from 'domain/models';
import type { UseQueryResult } from 'react-query';

interface ProductTableHeaderProps {
  query: UseQueryResult<FindProductQuery>;
}

export const ProductTableHeader: FC<ProductTableHeaderProps> = ({ query }) => {
  const { t } = useTranslation('restaurant');
  const dispatch = useDispatch();

  const { productSelected } = useAppSelector((state) => state.select);
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
                  checked={items?.length > 0 && items?.every((item) => productSelected[item.id])}
                  onChange={(event): void => {
                    if (event.target.checked)
                      dispatch(addSelectData({ data: items, type: 'productSelected' }));
                    else
                      dispatch(
                        removeSelectData({
                          ids: items?.map((item) => item.id),
                          type: 'productSelected'
                        })
                      );
                  }}
                />
              </div>

              <span className={'ml-[50px] flex gap-2'}>
                {t('product.table.name')}{' '}
                <SortFilter filterName={'name'} {...setSortFilter('product', 'name')} />
              </span>
            </div>
          }
          width={'100%'}
        />

        <HeaderCell
          minWidth={150}
          title={
            <TableSort
              filterName={'price'}
              sortItem={setSortFilter('product', 'price')}
              title={t('product.table.price')}
            />
          }
        />

        <HeaderCell
          minWidth={150}
          title={
            <TableSort
              filterName={'published'}
              sortItem={setSortFilter('product', 'published')}
              title={t('product.table.published')}
            />
          }
        />

        <HeaderCell
          minWidth={150}
          title={
            <TableSort
              filterName={'inStock'}
              sortItem={setSortFilter('product', 'inStock')}
              title={t('product.table.inStock')}
            />
          }
        />

        <HeaderCell
          minWidth={150}
          title={
            <TableSort
              filterName={'highlight'}
              sortItem={setSortFilter('product', 'highlight')}
              title={t('product.table.highlight')}
            />
          }
        />

        {/* <HeaderCell minWidth={130} title={t('product.table.totalSold')} /> */}
        <HeaderCell
          minWidth={210}
          title={
            <TableSort
              filterName={'avgRate'}
              sortItem={setSortFilter('product', 'avgRate')}
              title={t('product.table.review')}
            />
          }
        />

        <HeaderCell last minWidth={50} title={''} />
      </TableRow>
    </TableHead>
  );
};
