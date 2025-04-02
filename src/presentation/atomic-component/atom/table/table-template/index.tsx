import { Table, TableContainer } from '@mui/material';
import type { FC, ReactNode } from 'react';

interface TableTemplateProps {
  tableHeader: ReactNode;
  tableBody: ReactNode;
  height?: number;
}

export const TableTemplate: FC<TableTemplateProps> = ({ tableHeader, tableBody, height }) => {
  return (
    <TableContainer
      className={'overflow-auto bg-white border border-gray-100 shadow-base rounded'}
      sx={{
        height: height ?? '98%',
        padding: '4px'
      }}
    >
      <Table
        stickyHeader
        sx={{
          position: 'relative'
        }}
      >
        {tableHeader}
        {tableBody}
      </Table>
    </TableContainer>
  );
};
