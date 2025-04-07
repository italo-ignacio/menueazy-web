import { BodyCell, ItemNotFound } from 'presentation/atomic-component/atom';
import { Button, Checkbox, TableBody, TableRow } from '@mui/material';
import { type FindIngredientQuery, currencyData } from 'domain/models';
import { Image, NavigateNext, NoteAdd } from '@mui/icons-material';
import { IngredientModal } from 'presentation/atomic-component/molecule/modal';
import { Link } from 'react-router-dom';
import { addSelectData, removeSelectData } from 'store/select/slice';
import { paths } from 'main/config';
import { useAppSelector } from 'store';
import { useDispatch } from 'react-redux';
import { useRestaurant } from 'data/hooks';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';
import type { UseQueryResult } from 'react-query';

interface IngredientTableBodyProps {
  query: UseQueryResult<FindIngredientQuery>;
}

export const IngredientTableBody: FC<IngredientTableBodyProps> = ({ query }) => {
  const { currency } = useAppSelector((state) => state.persist);
  const { ingredientSelected } = useAppSelector((state) => state.select);

  const dispatch = useDispatch();
  const { restaurantUrl } = useRestaurant();
  const { t } = useTranslation('common');

  return (
    <TableBody className={'relative'}>
      {query?.data?.content?.length === 0 && !query.isFetching ? <ItemNotFound /> : null}

      {query?.data?.content?.map((item, index) => (
        <TableRow
          key={item.id}
          className={ingredientSelected[item.id] ? 'bg-primary/5' : 'hover:bg-gray-50'}
        >
          <BodyCell
            firstRow={index === 0}
            title={
              <div className={'flex items-center gap-3 h-12'}>
                <Checkbox
                  checked={!!ingredientSelected[item.id]}
                  onChange={(event): void => {
                    if (event.target.checked)
                      dispatch(addSelectData({ data: [item], type: 'ingredientSelected' }));
                    else dispatch(removeSelectData({ ids: [item.id], type: 'ingredientSelected' }));
                  }}
                />

                {item.imageUrl ? (
                  <img
                    alt={' '}
                    className={'object-fill rounded-sm'}
                    height={50}
                    src={item.imageUrl}
                    width={50}
                  />
                ) : (
                  <span
                    className={
                      'flex items-center justify-center text-gray-500 text-[40px] w-[50px]'
                    }
                  >
                    <Image color={'inherit'} fontSize={'inherit'} />
                  </span>
                )}

                <h3 className={'font-semibold text-base'}>{item.name}</h3>
              </div>
            }
          />

          <BodyCell
            firstRow={index === 0}
            title={
              <span>
                <strong>{item.quantity}</strong>
                <span> {t(item.measure, { count: item.quantity })}</span>
              </span>
            }
          />

          <BodyCell
            firstRow={index === 0}
            title={
              <span>
                {currencyData[currency].symbol} <strong>{item.totalPrice.toFixed(2)}</strong>
              </span>
            }
          />

          <BodyCell
            firstRow={index === 0}
            title={
              <span>
                {currencyData[currency].symbol} <strong>{item.priceInStock.toFixed(2)}</strong>
              </span>
            }
          />

          <BodyCell
            firstRow={index === 0}
            title={
              <div className={'flex gap-4'}>
                <IngredientModal ingredient={item} />

                <Button sx={{ maxWidth: 40, minWidth: '0' }} variant={'outlined'}>
                  <NoteAdd />
                </Button>

                <Link to={paths.restaurantStockId(restaurantUrl, item.id)}>
                  <Button color={'info'} sx={{ maxWidth: 40, minWidth: '0' }}>
                    <NavigateNext />
                  </Button>
                </Link>
              </div>
            }
          />
        </TableRow>
      ))}
    </TableBody>
  );
};
