import { Outlet } from 'react-router-dom';
import { PublicFooter, PublicHeader } from 'presentation/atomic-component/organism';
import type { FC } from 'react';

export const PublicTemplate: FC = () => {
  return (
    <div className={'flex flex-col min-h-dvh max-w-[100dvw]'} id={'main'}>
      <PublicHeader />

      <main className={'flex w-full mx-auto max-w-[1200px] py-12 px-3 laptop:px-0'}>
        <Outlet />
      </main>

      <PublicFooter />
    </div>
  );
};
