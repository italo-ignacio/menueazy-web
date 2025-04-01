import { BodyCell } from 'presentation/atomic-component/atom';
import { Checkbox, IconButton, Switch, TableBody, TableRow } from '@mui/material';
import { type FindProductQuery, currencyData } from 'domain/models';
import { Star, StarOutline } from '@mui/icons-material';
import { addProduct, removeProduct } from 'store/product/slice';
import { colors } from 'presentation/style';
import { useAppSelector } from 'store';
import { useDispatch } from 'react-redux';
import type { FC } from 'react';
import type { UseQueryResult } from 'react-query';

interface ProductTableBodyProps {
  query: UseQueryResult<FindProductQuery>;
}

export const ProductTableBody: FC<ProductTableBodyProps> = ({ query }) => {
  const { currency } = useAppSelector((state) => state.persist);
  const { productSelected } = useAppSelector((state) => state.product);
  const dispatch = useDispatch();

  return (
    <TableBody className={'relative'}>
      {query?.data?.content?.map((item, index) => (
        <TableRow key={item.id}>
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

                <h3 className={'font-semibold text-base'}>
                  <strong>{item.name}</strong>
                </h3>
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
            align={'center'}
            firstRow={index === 0}
            title={<Switch checked={item.published} />}
          />

          <BodyCell
            align={'center'}
            firstRow={index === 0}
            title={<Switch checked={item.inStock} />}
          />

          <BodyCell
            align={'center'}
            firstRow={index === 0}
            title={
              <IconButton>
                {item.highlight ? <Star sx={{ color: colors.yellow }} /> : <StarOutline />}
              </IconButton>
            }
          />

          <BodyCell
            firstRow={index === 0}
            title={
              <div className={'flex flex-wrap gap-3'}>
                {item.categoryList.map((category) => (
                  <h3
                    key={category.id}
                    className={'flex items-center bg-gray-300 px-2 p-0.5 min-w-max rounded-md'}
                  >
                    <strong>{category.name}</strong>
                  </h3>
                ))}
              </div>
            }
          />

          <BodyCell firstRow={index === 0} title={'a'} />
        </TableRow>
      ))}
    </TableBody>
  );
};
