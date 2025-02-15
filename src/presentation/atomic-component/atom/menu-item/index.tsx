import { ListItemButton } from '@mui/material';
import type { FC, MouseEvent, ReactElement } from 'react';
import type { SxProps, Theme } from '@mui/material';

interface MenuItemProps {
  icon: ReactElement;
  title: ReactElement | string;
  onClick?: (event: MouseEvent) => Promise<void> | void;
  sx?: SxProps<Theme>;
}

export const MenuItem: FC<MenuItemProps> = ({ icon, sx, title, onClick }) => (
  <ListItemButton
    onClick={onClick}
    sx={{
      gap: '12px',
      padding: '8px 16px',
      ...sx
    }}
  >
    {icon}
    <span>{title}</span>
  </ListItemButton>
);
