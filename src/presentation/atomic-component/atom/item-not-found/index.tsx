import { TableCell } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

export const ItemNotFound: FC = () => {
  const { t } = useTranslation('common');

  return (
    <TableCell
      colSpan={100}
      sx={{
        border: 0,
        fontSize: '18px',
        fontWeight: '600',
        textAlign: 'center'
      }}
    >
      {t('itemNotFound')}
    </TableCell>
  );
};
