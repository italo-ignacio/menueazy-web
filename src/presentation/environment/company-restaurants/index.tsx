import { HomeCard, MainDiv } from 'presentation/atomic-component/atom';
import { RestaurantModal } from 'presentation/atomic-component/molecule/modal';
import { paths } from 'main/config';
import { useFindRestaurantQuery } from 'infra/cache';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

export const CompanyRestaurantsContent: FC = () => {
  const restaurantQuery = useFindRestaurantQuery({});
  const { t } = useTranslation('company');

  return (
    <MainDiv endElement={<RestaurantModal />} title={t('restaurant.title')}>
      <div className={'flex flex-col border border-input-border-2 rounded'}>
        Company restaurants
      </div>

      {restaurantQuery.data?.content.map((item) => (
        <HomeCard
          key={item.id}
          image={item.logoUrl}
          title={item.name}
          to={paths.restaurantDashboard(item.restaurantUrl)}
        />
      ))}
    </MainDiv>
  );
};
