/* eslint-disable sort-keys-fix/sort-keys-fix */

export enum routePaths {
  login = '/login',
  home = '/',
  aboutUs = '/about-us',
  plans = '/plans',
  contact = '/contact',

  companyUrl = '/company/:companyUrl',
  companyEmployees = '/company/:companyUrl/employees',
  companyRestaurants = '/company/:companyUrl/restaurants',
  companySubscription = '/company/:companyUrl/subscription',
  companyUserProfile = '/company/:companyUrl/profile',

  restaurantDashboard = '/restaurant/:restaurantUrl/dashboard',
  restaurantOrder = '/restaurant/:restaurantUrl/order',

  restaurantProduct = '/restaurant/:restaurantUrl/product',
  restaurantProductId = '/restaurant/:restaurantUrl/product/:id',
  restaurantProductEdit = '/restaurant/:restaurantUrl/product/:id/edit',

  restaurantStock = '/restaurant/:restaurantUrl/stock',
  restaurantStockId = '/restaurant/:restaurantUrl/stock/:id',

  restaurantEmployees = '/restaurant/:restaurantUrl/employees',
  restaurantPersonalization = '/restaurant/:restaurantUrl/personalization',
  restaurantUserProfile = '/restaurant/:restaurantUrl/profile',

  restaurantUrl = '/restaurant/:restaurantUrl'
}

export const paths = {
  login: '/login',
  home: '/',
  aboutUs: '/about-us',
  plans: '/plans',
  contact: '/contact',

  companyUrl: (url: string): string => `/company/${url}`,
  companyEmployees: (url: string): string => `/company/${url}/employees`,
  companyRestaurants: (url: string): string => `/company/${url}/restaurants`,
  companySubscription: (url: string): string => `/company/${url}/subscription`,
  companyUserProfile: (url: string): string => `/company/${url}/profile`,

  restaurantDashboard: (url: string): string => `/restaurant/${url}/dashboard`,
  restaurantOrder: (url: string): string => `/restaurant/${url}/order`,

  restaurantProduct: (url: string): string => `/restaurant/${url}/product`,
  restaurantProductId: (url: string, id: unknown): string => `/restaurant/${url}/product/${id}`,
  restaurantProductEdit: (url: string, id: unknown): string =>
    `/restaurant/${url}/product/${id}/edit`,

  restaurantStock: (url: string): string => `/restaurant/${url}/stock`,
  restaurantStockId: (url: string, id: unknown): string => `/restaurant/${url}/stock/${id}`,

  restaurantEmployees: (url: string): string => `/restaurant/${url}/employees`,
  restaurantPersonalization: (url: string): string => `/restaurant/${url}/personalization`,
  restaurantUserProfile: (url: string): string => `/restaurant/${url}/profile`,

  restaurantUrl: (restaurantUrl: string): string => `/restaurant/${restaurantUrl}`
};

export const apiPaths = {
  default: '/default',

  checkUserCompany: '/user/check-company',
  checkUserRestaurant: '/user/check-restaurant',

  userLogin: '/auth/user/login',
  clientLogin: '/auth/client/login',

  restaurant: '/restaurant',

  product: (restaurantId: number): string => `/restaurant/${restaurantId}/product`,
  category: (restaurantId: number): string => `/restaurant/${restaurantId}/category`,
  ingredient: (restaurantId: number): string => `/restaurant/${restaurantId}/ingredient`,
  ingredientData: (restaurantId: number, ingredientId: number): string =>
    `/restaurant/${restaurantId}/ingredient/${ingredientId}/data`,

  user: '/user'
};
