import { type FC, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LogoSenai } from 'main/assets';
import { Logout } from 'presentation/atomic-component/molecule';
import { SidebarItem } from 'presentation/atomic-component/atom/sidebar-item';
import { ToggleMenu } from 'presentation/atomic-component/atom';
import { paths } from 'main/config';
import { sidebarItems } from 'main/mock';
import { useAppSelector } from 'store';
import { usePath } from 'data/hooks';

export const LaptopSidebar: FC = () => {
  const containerRef = useRef(null);
  const { open } = useAppSelector((state) => state.sidebar);
  const { firstPathname } = usePath();

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
        <Link className={open ? '' : 'hidden'} to={paths.home}>
          <img alt={'Logo SENAI'} className={'max-w-[135px]'} src={LogoSenai} />
        </Link>

        <ToggleMenu />
      </div>

      <div className={'flex flex-col gap-4 h-full overflow-auto'}>
        {sidebarItems[firstPathname]?.map(({ icon, link, name, onClick }) => (
          <SidebarItem
            key={name}
            active={firstPathname === link}
            iconName={icon}
            link={link}
            onClick={onClick}
            title={name}
          />
        ))}
      </div>

      <div className={'flex w-full items-center gap-4 justify-start border-t border-gray-125'}>
        <Logout />
      </div>
    </div>
  );
};
