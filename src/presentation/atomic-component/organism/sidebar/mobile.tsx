import { Logout } from 'presentation/atomic-component/molecule';
import { SidebarItem } from 'presentation/atomic-component/atom/sidebar-item';
import { Slide } from '@mui/material';
import { sidebarItems } from 'main/mock';
import { usePath } from 'data/hooks';
import { useSidebar } from 'store/sidebar/selector';
import type { FC } from 'react';

export const MobileSidebar: FC = () => {
  const { open } = useSidebar();
  const { firstPathname } = usePath();

  return (
    <Slide
      direction={'right'}
      in={open}
      style={{
        overflow: 'auto'
      }}
    >
      <div
        className={'flex flex-col justify-between fixed z-40 bg-white w-full h-[calc(100dvh-74px)]'}
      >
        <div className={'flex flex-col gap-1 h-full overflow-auto'}>
          {sidebarItems[firstPathname]?.map(({ icon, link, name, onClick }) => (
            <SidebarItem
              key={name}
              active={firstPathname === link}
              iconName={icon}
              isMobile
              link={link}
              onClick={onClick}
              title={name}
            />
          ))}
        </div>

        <div className={'border-t'}>
          <Logout />
        </div>
      </div>
    </Slide>
  );
};
