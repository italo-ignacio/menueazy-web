/* eslint-disable react/jsx-no-useless-fragment */
import { Close, KeyboardDoubleArrowRight, Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { dimensions } from 'main/config';
import { useSidebar } from 'store/sidebar/selector';
import { useWindowDimensions } from 'data/hooks';
import type { FC } from 'react';

export const ToggleMenu: FC = () => {
  const { open, setOpen } = useSidebar();
  const { width } = useWindowDimensions();

  return (
    <IconButton onClick={(): void => setOpen(!open)}>
      {width >= dimensions.laptop ? (
        <KeyboardDoubleArrowRight
          className={`text-gray-700 ${open ? 'rotate-180' : ''}`}
          style={{ transition: 'all 500ms' }}
        />
      ) : (
        <>{open ? <Close className={'text-gray-700'} /> : <Menu className={'text-gray-700'} />}</>
      )}
    </IconButton>
  );
};
