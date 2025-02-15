import { GoBack } from 'presentation/atomic-component/atom/go-back';
import type { FC, ReactNode } from 'react';

interface MenuItemProps {
  children?: ReactNode;
  className?: string;
  hideGoBack?: boolean;
  title: string;
}

export const MainDiv: FC<MenuItemProps> = ({ children, hideGoBack, className, title }) => (
  <div className={`flex flex-col gap-6 desktop:gap-10 ${className}`}>
    <div className={'flex flex-col items-start gap-5'}>
      {hideGoBack ? null : <GoBack />}
      <h2 className={'text-primary text-2xl font-semibold'}>{title}</h2>
    </div>

    {children}
  </div>
);
