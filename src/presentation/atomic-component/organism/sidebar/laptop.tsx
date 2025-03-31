import { type FC, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from 'main/assets';
import { Logout } from 'presentation/atomic-component/molecule';
import { SettingModal } from 'presentation/atomic-component/molecule/modal';
import { SidebarItem } from 'presentation/atomic-component/atom/sidebar-item';
import { ToggleMenu } from 'presentation/atomic-component/atom';
import { getUser } from 'store/persist/selector';
import { paths } from 'main/config';
import { sidebarItems } from 'main/mock';
import { useAppSelector } from 'store';
import { useCompany, usePath, useRestaurant } from 'data/hooks';
import { useTranslation } from 'react-i18next';

interface LaptopSidebarProps {
  type: 'company' | 'restaurant';
}

export const LaptopSidebar: FC<LaptopSidebarProps> = ({ type }) => {
  const containerRef = useRef(null);
  const { open } = useAppSelector((state) => state.sidebar);
  const { allPathname, lastPathname } = usePath();
  const { t } = useTranslation('common');

  const { url: companyUrl } = useCompany();
  const { url: restaurantUrl } = useRestaurant();

  const user = getUser();

  return (
    <div
      className={`flex flex-col fixed gap-3 z-40 h-dvh border-r bg-white border-gray-125 transition-[width] ease-in-out ${
        open ? 'w-[301px]' : 'w-[81px]'
      }`}
      ref={containerRef}
    >
      <div
        className={'flex p-4 w-full items-center gap-4 justify-between border-b border-gray-125'}
      >
        <Link className={open ? '' : 'hidden'} to={paths.companyUrl(user.company.companyUrl)}>
          <img alt={'Menu Eazy'} className={'max-h-[40px]'} src={Logo} />
        </Link>

        <ToggleMenu />
      </div>

      <div className={'flex flex-col gap-3 h-full overflow-auto'}>
        {sidebarItems[type][user.role](type === 'company' ? companyUrl : restaurantUrl).map(
          ({ icon, link, name, onClick }) => {
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
                onClick={onClick}
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
          title={t('profile')}
        />

        <SettingModal />
      </div>

      <div className={'flex w-full items-center gap-4 justify-start border-t border-gray-125'}>
        <Logout />
      </div>
    </div>
  );
};
