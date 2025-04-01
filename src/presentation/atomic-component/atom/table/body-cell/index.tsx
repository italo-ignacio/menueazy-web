import { Link } from 'react-router-dom';
import { TableCell } from '@mui/material';
import { colors } from 'presentation/style';
import { useWindowDimensions } from 'data/hooks';
import type { FC, ReactNode } from 'react';
import type { TableCellProps } from '@mui/material';

interface BodyCellProps extends Pick<TableCellProps, 'sx'> {
  title: ReactNode | number | string;
  className?: string;
  link?: string;
  firstRow?: boolean;
  colSpan?: number;
  width?: {
    small?: number;
    large?: number;
  };
  clamp?: 1 | 2 | 3;
  backgroundColor?: string;
  align?: 'center' | 'left' | 'right';
  onClick?: () => void;
}

export const BodyCell: FC<BodyCellProps> = ({
  title,
  onClick,
  className,
  clamp,
  width,
  link,
  firstRow,
  backgroundColor,
  colSpan,
  sx,
  align
}) => {
  const lineClamp = (): '' | 'line-clamp-1' | 'line-clamp-2' | 'line-clamp-3' => {
    if (clamp) return `line-clamp-${clamp}`;

    return '';
  };

  const { width: width2 } = useWindowDimensions();

  const newWidth = width2 > 1580 ? width?.large : width?.small;

  return (
    <TableCell
      align={align ?? 'left'}
      colSpan={colSpan}
      component={'th'}
      onClick={onClick}
      scope={'row'}
      sx={{
        backgroundColor,
        borderBottom: '0px',
        borderTop: firstRow ? undefined : `1px solid ${colors.gray[200]}`,
        padding: link ? '0' : '12px 18px',
        ...sx
      }}
      title={typeof title === 'string' ? title : undefined}
      variant={'body'}
    >
      {link ? (
        <Link className={'px-1.5 min-h-[40.8125px] flex h-full items-center'} to={link}>
          <span className={className}>{title}</span>
        </Link>
      ) : (
        <span className={`break-words ${lineClamp()} ${className}`} style={{ width: newWidth }}>
          {title}
        </span>
      )}
    </TableCell>
  );
};
