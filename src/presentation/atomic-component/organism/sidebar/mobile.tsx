import { Logout } from 'presentation/atomic-component/molecule';
import { SidebarItem } from 'presentation/atomic-component/atom/sidebar-item';
import { Slide } from '@mui/material';
import { getUser } from 'store/persist/selector';
import { paths } from 'main/config';
import { sidebarItems } from 'main/mock';
import { useCompany, usePath, useRestaurant } from 'data/hooks';
import { useSidebar } from 'store/sidebar/selector';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

interface MobileSidebarProps {
  type: 'company' | 'restaurant';
}

export const MobileSidebar: FC<MobileSidebarProps> = ({ type }) => {
  const { open, setOpen } = useSidebar();
  const { allPathname, lastPathname } = usePath();
  const { t } = useTranslation('common');

  const { url: companyUrl } = useCompany();
  const { url: restaurantUrl } = useRestaurant();

  const user = getUser();

  return (
    <Slide direction={'right'} in={open} style={{ overflow: 'auto' }}>
      <div
        className={'flex flex-col justify-between fixed z-40 bg-white w-full h-[calc(100dvh-74px)]'}
      >
        <div className={'flex flex-col gap-1 h-full overflow-auto'}>
          {sidebarItems[type][user.role](type === 'company' ? companyUrl : restaurantUrl).map(
            ({ icon, link, name }) => {
              let active = false;

              const lastArray = link.split('/');

              if (allPathname.length === 2 && icon === 'Dashboard') active = true;
              else if (allPathname.length > 2 && lastArray[lastArray.length - 1] === lastPathname)
                active = true;

              return (
                <SidebarItem
                  key={name}
                  active={active}
                  iconName={icon}
                  link={link}
                  onClick={(): void => setOpen(false)}
                  title={name}
                />
              );
            }
          )}

          {type === 'restaurant' ? (
            <SidebarItem
              active={false}
              iconName={'Apartment'}
              link={paths.companyUrl(user.company.companyUrl)}
              onClick={(): void => setOpen(false)}
              title={t('company', { ns: 'entity' })}
            />
          ) : null}
        </div>

        <div className={'flex flex-col gap-3'}>
          <SidebarItem
            active={lastPathname === 'profile'}
            iconName={'Person'}
            link={
              type === 'company'
                ? paths.companyUserProfile(companyUrl)
                : paths.restaurantUserProfile(restaurantUrl)
            }
            onClick={(): void => setOpen(false)}
            title={t('profile')}
          />
        </div>

        <div className={'border-t'}>
          <Logout />
        </div>
      </div>
    </Slide>
  );
};
