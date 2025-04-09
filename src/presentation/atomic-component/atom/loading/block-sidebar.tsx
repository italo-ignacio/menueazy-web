import { useAppSelector } from 'store';
import type { FC } from 'react';

interface BlockSidebarProps {
  onClick?: () => void;
}
export const BlockSidebar: FC<BlockSidebarProps> = ({ onClick }) => {
  const { open } = useAppSelector((state) => state.sidebar);

  return (
    <div
      className={`flex flex-col items-center justify-center absolute top-[73px] left-0 h-[calc(100dvh-73px)] z-50 ${open ? 'w-[229px]' : 'w-[80px]'}`}
      onClick={onClick}
    />
  );
};
