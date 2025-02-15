import { Button } from '@mui/material';
import { NavigateBefore } from '@mui/icons-material';
import type { FC } from 'react';

export const GoBack: FC = () => {
  return (
    <Button
      color={'info'}
      onClick={(): void => window.history.back()}
      startIcon={<NavigateBefore />}
      sx={{ height: '40px', width: '100px' }}
      variant={'contained'}
    >
      Voltar
    </Button>
  );
};
