import { type FC, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { PrivateFooter, PrivateHeader, Sidebar } from 'presentation/atomic-component/organism';
import { dimensions } from 'main/config';
import { useAppSelector } from 'store';
import { useWindowDimensions } from 'data/hooks';

export const RestaurantTemplate: FC = () => {
  const { pathname } = useLocation();
  const { width } = useWindowDimensions();
  const { open } = useAppSelector((state) => state.sidebar);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getMarginLeft = (): number | string => {
    if (width < dimensions.laptop) return 0;

    // Sidebar on top of content
    // if (open) return '81px';
    if (open) return '230px';

    return '81px';
  };

  const getHeight = (): 'calc(100dvh - 46px)' | 'calc(100dvh - 119px)' => {
    if (width >= dimensions.laptop) return 'calc(100dvh - 46px)';

    return 'calc(100dvh - 119px)';
  };

  return (
    <div className={'flex flex-col min-h-dvh max-w-[100dvw] h-full bg-[#FAFAFA]'} id={'main'}>
      <PrivateHeader />

      <main className={'flex w-full '} style={{ minHeight: getHeight() }}>
        <Sidebar type={'restaurant'} />

        <div
          className={
            'flex flex-col w-full text-gray-900 min-h-[calc(100dvh-45px)] px-4 py-8 overflow-x-hidden tablet:px-8'
          }
          style={{ marginLeft: getMarginLeft(), transition: 'all 200ms' }}
        >
          <Outlet />
        </div>
      </main>

      <PrivateFooter />
    </div>
  );
};
