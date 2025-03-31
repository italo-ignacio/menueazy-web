/* eslint-disable @typescript-eslint/no-restricted-imports */
import { AnimatedBg } from '../animated-bg';
import { DarkMode, LightMode } from '@mui/icons-material';
import { ListItemButton } from '@mui/material';
import { colors } from 'presentation/style';
import { setTheme } from 'store/persist/slice';
import { useDispatch } from 'react-redux';
import { useTheme } from 'data/hooks';
import type { FC } from 'react';

export const ToggleTheme: FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <AnimatedBg bg={'black'} className={'border rounded-md'}>
      <ListItemButton
        onClick={(): void => {
          dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
        }}
        sx={{
          padding: '7px'
        }}
      >
        {theme === 'dark' ? (
          <LightMode
            style={{
              color: colors.gray[50]
            }}
          />
        ) : (
          <DarkMode
            style={{
              color: colors.gray[800]
            }}
          />
        )}
      </ListItemButton>
    </AnimatedBg>
  );
};
