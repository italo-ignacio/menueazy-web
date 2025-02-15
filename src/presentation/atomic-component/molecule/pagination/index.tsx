import {
  FirstPageOutlined,
  LastPageOutlined,
  NavigateBeforeOutlined,
  NavigateNextOutlined
} from '@mui/icons-material';
import { PaginationItem } from 'presentation/atomic-component/atom';
import { scrollTo } from 'main/utils';
import { usePagination } from '@mui/lab';
import type { FC, ReactNode } from 'react';

interface PaginationProps {
  page: number;
  totalPages?: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  scrollId?: string;
}

export const Pagination: FC<PaginationProps> = ({
  page,
  totalPages,
  scrollId,
  handleChangePage
}: PaginationProps) => {
  const { items } = usePagination({
    count: totalPages,
    onChange(event, newPage): void {
      handleChangePage(event, newPage);
      if (scrollId) scrollTo(scrollId);
    },
    page,
    showFirstButton: true,
    showLastButton: true
  });

  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className={'flex flex-wrap gap-1 justify-center'}>
      {items.map(({ page: page2, type, selected, ...item }, index) => {
        const getText = (): ReactNode | string | undefined => {
          switch (type) {
            case 'first':
              return <FirstPageOutlined color={'inherit'} fontSize={'small'} />;
            case 'previous':
              return <NavigateBeforeOutlined color={'inherit'} fontSize={'small'} />;
            case 'page':
              return page2;
            case 'end-ellipsis':
              return '...';
            case 'start-ellipsis':
              return '...';
            case 'next':
              return <NavigateNextOutlined color={'inherit'} fontSize={'small'} />;
            case 'last':
              return <LastPageOutlined color={'inherit'} fontSize={'small'} />;
            default:
              return undefined;
          }
        };

        return (
          <PaginationItem
            key={String(page2) + String(index)}
            disabled={item.disabled}
            handleClick={item.disabled || type.endsWith('ellipsis') ? undefined : item.onClick}
            isEllipsis={type.endsWith('ellipsis')}
            selected={selected}
          >
            {getText()}
          </PaginationItem>
        );
      })}
    </div>
  );
};
