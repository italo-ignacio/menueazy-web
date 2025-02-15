import { LaptopSidebar } from './laptop';
import { MobileSidebar } from './mobile';
import { dimensions } from 'main/config';
import { useWindowDimensions } from 'data/hooks';
import type { FC } from 'react';

export const Sidebar: FC = () => {
  const { width } = useWindowDimensions();

  if (width >= dimensions.laptop) return <LaptopSidebar />;

  return <MobileSidebar />;
};
