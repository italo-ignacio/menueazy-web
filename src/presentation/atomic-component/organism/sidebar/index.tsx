import { LaptopSidebar } from './laptop';
import { MobileSidebar } from './mobile';
import { dimensions } from 'main/config';
import { useWindowDimensions } from 'data/hooks';
import type { FC } from 'react';

interface LaptopSidebarProps {
  type: 'company' | 'restaurant';
}

export const Sidebar: FC<LaptopSidebarProps> = ({ type }) => {
  const { width } = useWindowDimensions();

  if (width >= dimensions.laptop) return <LaptopSidebar type={type} />;

  return <MobileSidebar type={type} />;
};
