import { Button, Rating } from '@mui/material';
import { ImageOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { SimpleMenu } from 'presentation/atomic-component/atom/simple-menu';
import { colors } from 'presentation/style';
import { formatHour, formatNumber } from 'main/utils';
import { paths } from 'main/config';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';
import type { Restaurant } from 'domain/models';

export const RestaurantCard: FC<Restaurant> = ({ ...item }) => {
  const { t } = useTranslation('common');

  const rate = 3.4;
  const totalRate = 13000;

  return (
    <div className={'flex gap-4 w-full border rounded p-2  h-min max-w-[32%]'}>
      <div className={'flex items-center justify-center w-full'}>
        {typeof item.logoUrl === 'string' ? (
          <img
            alt={' '}
            className={'object-cover rounded-md w-full h-[180px]'}
            src={item.logoUrl}
          />
        ) : (
          <ImageOutlined color={'inherit'} sx={{ color: colors.gray[550], fontSize: 70 }} />
        )}
      </div>

      <div className={'flex flex-col gap-2 w-full'}>
        <h3 className={'font-bold'}>{item.name}</h3>

        <div className={'flex items-center gap-0.5 min-w-max'}>
          <span>{rate}</span>
          <Rating precision={0.1} readOnly value={rate} />
          <span>({formatNumber(totalRate)})</span>
        </div>

        <p>
          {item.address?.street}, {item.address?.number}
        </p>

        <div className={'flex gap-2'}>
          <span className={item.open ? 'text-success' : 'text-red'}>
            {item.open ? t('open') : t('close')}
          </span>

          <span>-</span>

          <SimpleMenu
            openElement={
              <span className={'text-gray-600 hover:underline underline-offset-4 cursor-pointer'}>
                {t('seeHours')}
              </span>
            }
            side={'bottom'}
          >
            <div className={'flex flex-col divide-y p-2'}>
              {item.openingHourList?.map((hours) => (
                <div
                  key={hours.id}
                  className={'px-3 py-1 flex gap-4 justify-between hover:bg-gray-150'}
                >
                  <span>{t(hours.dayOfWeek)} : </span>

                  <div>
                    <span>{formatHour(hours.openingTime)} - </span>
                    <span>{formatHour(hours.closingTime)}</span>
                  </div>
                </div>
              ))}
            </div>
          </SimpleMenu>
        </div>

        <Link className={'mt-auto'} to={paths.restaurantDashboard(item.restaurantUrl)}>
          <Button className={'w-full'}>Acessar</Button>
        </Link>
      </div>
    </div>
  );
};
