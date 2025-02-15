/* eslint-disable @typescript-eslint/no-restricted-imports */
import { IconRender } from '../icon-render';
import { Link, type To } from 'react-router-dom';
import { useSidebar } from 'store/sidebar/selector';
import type { FC, ReactNode } from 'react';

interface SidebarItemProps {
  title: string;
  iconName: string;
  onClick?: () => Promise<void> | void;
  link?: To;
  isMobile?: boolean;
  active?: boolean;
}

export const SidebarItem: FC<SidebarItemProps> = ({
  iconName,
  link,
  title,
  isMobile,
  active,
  onClick
}) => {
  const { open, setOpen } = useSidebar();

  const getElement = (): ReactNode => {
    return (
      <div
        className={`flex w-full tablet:rounded p-1 tablet:p-0 cursor-pointer text-gray-700 hover:bg-primary/20 hover:text-primary 
          ${active ? 'text-primary bg-primary/20' : ''}
          `}
        onClick={async (): Promise<void> => {
          if (onClick) await onClick();
          if (isMobile) setOpen(false);
        }}
        title={title}
      >
        <div
          className={
            'flex w-full px-[9.5px] items-center h-[42px] gap-3 transition-[width] ease-in delay-75'
          }
        >
          <IconRender name={iconName} sx={{ fontSize: '1.8rem' }} />

          <span
            className={`h-[1.5rem] font-semibold transition-[width,margin] duration-100 ease-in-out overflow-hidden truncate cursor-pointer ${
              open ? 'w-[207px]' : 'w-[0px]'
            }`}
          >
            {title}
          </span>
        </div>
      </div>
    );
  };

  if (link)
    return (
      <Link className={'w-full tablet:px-4'} to={link}>
        {getElement()}
      </Link>
    );

  return <div className={'w-full py-2 tablet:px-4 tablet:py-3'}>{getElement()}</div>;
};
