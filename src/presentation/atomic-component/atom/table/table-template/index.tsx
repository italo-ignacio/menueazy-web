import { Table, TableContainer } from '@mui/material';
import type { FC, ReactNode } from 'react';

interface TableTemplateProps {
  tableHeader: ReactNode;
  tableBody: ReactNode;
  height?: number | string;
}

export const TableTemplate: FC<TableTemplateProps> = ({ tableHeader, tableBody, height }) => {
  return (
    <TableContainer className={'overflow-auto'} sx={{ height, padding: '4px' }}>
      <Table stickyHeader sx={{ position: 'relative' }}>
        {tableHeader}
        {tableBody}
      </Table>
    </TableContainer>
  );
};
