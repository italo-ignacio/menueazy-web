/* eslint-disable react/jsx-newline */
import {
  AboutUsContent,
  AuthContent,
  CompanyAdminContent,
  CompanyContent,
  ContactContent,
  HomeContent,
  PlansContent
} from 'presentation/environment';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { CompanyAdminRoute, PublicRoute } from 'main/proxies';
import { CompanyAdminTemplate, PublicTemplate } from 'presentation/atomic-component/template';
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
            <Route element={<CompanyContent />} path={routePaths.companyUrl} />
          </Route>
        </Route>

        {/* Private routes */}
        <Route element={<CompanyAdminRoute />}>
          <Route element={<CompanyAdminTemplate />}>
            <Route element={<CompanyAdminContent />} path={routePaths.companyAdminUrl} />
          </Route>
        </Route>

        <Route>
          <Route element={<> </>} path={'*'} />
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default RouterConfig;
