import { TableCell } from '@mui/material';
import { colors } from 'presentation/style';
import type { FC, ReactNode } from 'react';
import type { TableCellProps } from '@mui/material';

interface HeaderCellProps extends Pick<TableCellProps, 'sx'> {
  title: ReactNode | number | string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  align?: 'center' | 'left' | 'right';
  className?: string;
  backgroundColor?: string;
}

export const HeaderCell: FC<HeaderCellProps> = ({
  title,
  className,
  width,
  maxWidth,
  sx,
  backgroundColor,
  align,
  minWidth
}) => (
  <TableCell
    align={align ?? 'left'}
    className={className}
    sx={{
      backgroundColor: backgroundColor ?? colors.gray[125],
      border: '0',
      fontWeight: '600',
      maxWidth,
      minWidth: minWidth ?? 90,
      padding: '10px 18px',
      ...sx
    }}
    variant={'head'}
    width={width}
  >
    {title}
  </TableCell>
);
