import { HeaderCell } from 'presentation/atomic-component/atom';
import { TableHead, TableRow } from '@mui/material';
import { colors } from 'presentation/style';
import type { FC } from 'react';

export const KeywordTableHeader: FC = () => {
  return (
    <TableHead>
      <TableRow>
        <HeaderCell
          sx={{
            backgroundColor: '#FBFBFB',
            borderBottom: `2px solid ${colors.gray[300]}`
          }}
          title={'Id'}
        />

        <HeaderCell
          sx={{
            backgroundColor: '#FBFBFB',
            borderBottom: `2px solid ${colors.gray[300]}`
          }}
          title={'Id'}
        />
      </TableRow>
    </TableHead>
  );
};
