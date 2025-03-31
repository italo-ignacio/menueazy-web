import { Role } from 'domain/enums';
import { paths } from 'main/config';
import { t } from 'i18next';

interface item {
  icon: string;
  link: string;
  name: string;
  onClick?: () => void;
}

const companyDashboard = (url: string): item => ({
  icon: 'Dashboard',
  link: paths.companyUrl(url),
  name: 'Dashboard'
});

const companyRestaurants = (url: string): item => ({
  icon: 'Store',
  link: paths.companyRestaurants(url),
  name: t('restaurants', { ns: 'entity' })
});

const companyEmployees = (url: string): item => ({
  icon: 'People',
  link: paths.companyEmployees(url),
  name: t('employees', { ns: 'entity' })
});

const companySubscription = (url: string): item => ({
  icon: 'Star',
  link: paths.companySubscription(url),
  name: t('subscription', { ns: 'entity' })
});

const restaurantDashboard = (url: string): item => ({
  icon: 'Dashboard',
  link: paths.restaurantDashboard(url),
  name: 'Dashboard'
});

const restaurantOrder = (url: string): item => ({
  icon: 'Sell',
  link: paths.restaurantOrder(url),
  name: t('order', { ns: 'entity' })
});

const restaurantProduct = (url: string): item => ({
  icon: 'ShoppingCart',
  link: paths.restaurantProduct(url),
  name: t('product', { ns: 'entity' })
});

const restaurantStock = (url: string): item => ({
  icon: 'Inventory',
  link: paths.restaurantStock(url),
  name: t('stock', { ns: 'common' })
});

const restaurantEmployees = (url: string): item => ({
  icon: 'People',
  link: paths.restaurantEmployees(url),
  name: t('employees', { ns: 'entity' })
});

const restaurantPersonalization = (url: string): item => ({
  icon: 'FormatColorFill',
  link: paths.restaurantPersonalization(url),
  name: t('personalization', { ns: 'common' })
});

interface sidebarItemsProps {
  company: {
    [key in Role]: (url: string) => item[];
  };
  restaurant: {
    [key in Role]: (restaurantId: string) => item[];
  };
}
export const sidebarItems: sidebarItemsProps = {
  company: {
    [Role.ADMIN]: (url: string) => [
      companyDashboard(url),
      companyRestaurants(url),
      companyEmployees(url),
      companySubscription(url)
    ],
    [Role.OWNER]: (url: string) => [
      companyDashboard(url),
      companyRestaurants(url),
      companyEmployees(url),
      companySubscription(url)
    ],
    [Role.MANAGER]: (url: string) => [
      companyDashboard(url),
      companyRestaurants(url),
      companyEmployees(url)
    ],
    [Role.EMPLOYEE]: (url: string) => [companyDashboard(url), companyRestaurants(url)],
    [Role.DELIVERY_PERSON]: () => []
  },
  restaurant: {
    [Role.ADMIN]: (url: string) => [
      restaurantDashboard(url),
      restaurantOrder(url),
      restaurantProduct(url),
      restaurantStock(url),
      restaurantEmployees(url),
      restaurantPersonalization(url)
    ],
    [Role.OWNER]: (url: string) => [
      restaurantDashboard(url),
      restaurantOrder(url),
      restaurantProduct(url),
      restaurantStock(url),
      restaurantEmployees(url),
      restaurantPersonalization(url)
    ],
    [Role.MANAGER]: (url: string) => [
      restaurantDashboard(url),
      restaurantOrder(url),
      restaurantProduct(url),
      restaurantStock(url),
      restaurantEmployees(url),
      restaurantPersonalization(url)
    ],
    [Role.EMPLOYEE]: (url: string) => [
      restaurantDashboard(url),
      restaurantOrder(url),
      restaurantProduct(url),
      restaurantStock(url)
    ],
    [Role.DELIVERY_PERSON]: () => []
  }
};
