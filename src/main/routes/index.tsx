/* eslint-disable react/jsx-newline */
import {
  AboutUsContent,
  AuthContent,
  CompanyContent,
  CompanyEmployeesContent,
  CompanyRestaurantsContent,
  CompanySubscriptionContent,
  ContactContent,
  HomeContent,
  PlansContent,
  RestaurantDashboardContent,
  RestaurantEmployeesContent,
  RestaurantOrderContent,
  RestaurantPersonalizationContent,
  RestaurantProductContent,
  RestaurantProductEditContent,
  RestaurantProductIdContent,
  RestaurantStockContent,
  RestaurantStockIdContent,
  UserProfileContent
} from 'presentation/environment';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Button } from '@mui/material';
import { CompanyRoute, PublicRoute, RestaurantRoute } from 'main/proxies';
import {
  CompanyTemplate,
  PublicTemplate,
  RestaurantTemplate
} from 'presentation/atomic-component/template';
import { Suspense } from 'react';
import { routePaths } from 'main/config';
import type { FC } from 'react';

const RouterConfig: FC = () => (
  <BrowserRouter>
    <Suspense fallback={<Outlet />}>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route element={<PublicTemplate />}>
            <Route element={<HomeContent />} path={routePaths.home} />
            <Route element={<AuthContent />} path={routePaths.login} />
            <Route element={<AboutUsContent />} path={routePaths.aboutUs} />
            <Route element={<ContactContent />} path={routePaths.contact} />
            <Route element={<PlansContent />} path={routePaths.plans} />
          </Route>
        </Route>

        {/* Company Private routes */}
        <Route element={<CompanyRoute />}>
          <Route element={<CompanyTemplate />}>
            <Route element={<CompanyContent />} path={routePaths.companyUrl} />
            <Route element={<CompanyEmployeesContent />} path={routePaths.companyEmployees} />
            <Route element={<CompanyRestaurantsContent />} path={routePaths.companyRestaurants} />
            <Route element={<CompanySubscriptionContent />} path={routePaths.companySubscription} />
            <Route element={<UserProfileContent />} path={routePaths.companyUserProfile} />
          </Route>
        </Route>

        {/* Restaurant Private routes */}
        <Route element={<RestaurantRoute />}>
          <Route element={<RestaurantTemplate />}>
            <Route element={<RestaurantOrderContent />} path={routePaths.restaurantOrder} />

            <Route element={<RestaurantProductContent />} path={routePaths.restaurantProduct} />
            <Route element={<RestaurantProductIdContent />} path={routePaths.restaurantProductId} />
            <Route
              element={<RestaurantProductEditContent />}
              path={routePaths.restaurantProductEdit}
            />

            <Route element={<RestaurantStockContent />} path={routePaths.restaurantStock} />
            <Route element={<RestaurantStockIdContent />} path={routePaths.restaurantStockId} />

            <Route element={<RestaurantDashboardContent />} path={routePaths.restaurantDashboard} />
            <Route element={<RestaurantEmployeesContent />} path={routePaths.restaurantEmployees} />
            <Route element={<UserProfileContent />} path={routePaths.restaurantUserProfile} />
            <Route
              element={<RestaurantPersonalizationContent />}
              path={routePaths.restaurantPersonalization}
            />
          </Route>
        </Route>

        <Route>
          <Route
            element={
              <div className={'flex flex-col gap-2 items-center justify-center w-full h-screen'}>
                Not Found <Button onClick={(): void => window.history.back()}>go back</Button>
              </div>
            }
            path={'*'}
          />
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default RouterConfig;
