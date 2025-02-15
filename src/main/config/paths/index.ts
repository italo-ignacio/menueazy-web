/* eslint-disable sort-keys-fix/sort-keys-fix */

export enum routePaths {
  login = '/login',
  home = '/',
  aboutUs = '/about-us',
  plans = '/plans',
  contact = '/contact',

  companyAdminUrl = '/company/:companyUrl/admin',
  companyUrl = '/company/:companyUrl',

  restaurantAdminUrl = '/restaurant/:restaurantUrl/admin',
  restaurantUrl = '/restaurant/:restaurantUrl'
}

export const paths = {
  login: '/login',
  home: '/',
  aboutUs: '/about-us',
  plans: '/plans',
  contact: '/contact',

  companyAdminUrl: (companyUrl: string): string => `/company/${companyUrl}/admin`,
  companyUrl: (companyUrl: string): string => `/company/${companyUrl}`,

  restaurantAdminUrl: (restaurantUrl: string): string => `/restaurant/${restaurantUrl}/admin`,
  restaurantUrl: (restaurantUrl: string): string => `/restaurant/${restaurantUrl}`
};

export const apiPaths = {
  default: '/default',

  checkUserCompany: '/user/check-company',

  preUserLogin: '/auth/pre-user-login',
  userLogin: '/auth/user-login',

  user: '/user'
};
