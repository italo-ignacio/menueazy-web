import { Checkbox, TableHead, TableRow } from '@mui/material';
import { HeaderCell } from 'presentation/atomic-component/atom';
import { addProduct, removeProduct } from 'store/product/slice';
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

  const { productSelected } = useAppSelector((state) => state.product);
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
                  checked={items?.every((item) => productSelected[item.id])}
                  onChange={(event): void => {
                    if (event.target.checked) dispatch(addProduct(items));
                    else dispatch(removeProduct(items?.map((item) => item.id)));
                  }}
                />
              </div>

              <span className={'ml-[50px]'}>{t('product.table.name')}</span>
            </div>
          }
          width={'100%'}
        />

        <HeaderCell minWidth={100} title={t('product.table.price')} />
        <HeaderCell align={'center'} minWidth={120} title={t('product.table.published')} />
        <HeaderCell align={'center'} minWidth={150} title={t('product.table.inStock')} />
        <HeaderCell align={'center'} minWidth={120} title={t('product.table.highlight')} />
        <HeaderCell minWidth={200} title={t('product.table.category')} />
        <HeaderCell last minWidth={200} title={t('product.table.review')} />
      </TableRow>
    </TableHead>
  );
};
