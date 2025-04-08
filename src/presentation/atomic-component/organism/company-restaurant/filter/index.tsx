import { GenericFilter } from 'presentation/atomic-component/atom/generic-filter';
import { RestaurantModal } from 'presentation/atomic-component/molecule/modal';
import { setFilter } from 'main/utils';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

interface CompanyRestaurantFilterProps {
  totalElements?: number;
}

export const CompanyRestaurantFilter: FC<CompanyRestaurantFilterProps> = ({ totalElements }) => {
  const { t } = useTranslation('restaurant');

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

        <div className={'flex tablet:pl-5 gap-4'}>
          <RestaurantModal />
        </div>
      </div>
    </div>
  );
};
