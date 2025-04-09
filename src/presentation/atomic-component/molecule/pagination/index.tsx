import {
  ArrowDropDown,
  FirstPageOutlined,
  LastPageOutlined,
  NavigateBeforeOutlined,
  NavigateNextOutlined
} from '@mui/icons-material';
import { type FC, type ReactNode, useState } from 'react';
import { PaginationItem, SimpleMenu } from 'presentation/atomic-component/atom';
import { dimensions } from 'main/config';
import { scrollTo } from 'main/utils';
import { usePagination } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions } from 'data/hooks';

interface PaginationProps {
  page: number;
  limit?: number;
  totalElements?: number;
  totalPages?: number;
  handleChangePage: (newPage: number) => void;
  handleChangeLimit?: (newLimit: number) => void;
  scrollId?: string;
  endLimitString?: string;
}

export const Pagination: FC<PaginationProps> = ({
  page,
  limit,
  totalPages,
  endLimitString,
  totalElements,
  handleChangeLimit,
  scrollId,
  handleChangePage
}: PaginationProps) => {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowDimensions();

  const { items } = usePagination({
    boundaryCount: width < dimensions.tablet ? 1 : undefined,
    count: totalPages,
    onChange(_event, newPage): void {
      handleChangePage(newPage);
      if (scrollId) scrollTo(scrollId);
    },
    page,
    showFirstButton: true,
    showLastButton: true,
    siblingCount: width < dimensions.tablet ? 0 : undefined
  });

  const card = (number: number): ReactNode => (
    <div
      className={`flex flex-col min-w-[35px] items-center p-0.5 w-full px-1 cursor-pointer ${number === limit ? 'bg-primary text-white' : 'hover:bg-gray-200'}`}
      onClick={() => {
        if (handleChangeLimit) handleChangeLimit(number);
        setIsOpen(false);
      }}
    >
      {number}
    </div>
  );

  const list = (): ReactNode => {
    if (totalElements)
      return (
        <div className={'flex flex-col items-center divide-y divide-gray-350'}>
          {totalElements >= 5 ? card(5) : null}
          {totalElements >= 15 ? card(15) : card(totalElements >= 5 ? totalElements : 5)}
          {totalElements > 30 ? card(30) : null}
        </div>
      );

    return null;
  };

  if (totalPages === 1 && !handleChangeLimit && !limit) return null;

  return (
    <div className={'flex flex-col-reverse gap-5 justify-between tablet:flex-row-reverse'}>
      {totalPages && totalPages > 0 ? (
        <div className={'flex flex-wrap gap-1 justify-end'}>
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
      ) : null}

      {handleChangeLimit && limit && totalElements ? (
        <div className={'flex gap-2 w-[90px]'}>
          <span>{t('showing')}</span>

          <SimpleMenu
            isOpen={isOpen}
            openElement={
              <div
                className={
                  'flex gap-1 border rounded-md border-gray-300 pl-1  bg-white cursor-pointer'
                }
              >
                <span>{limit}</span>
                <ArrowDropDown />
              </div>
            }
            radius={'2px'}
            setIsOpen={setIsOpen}
            side={'bottom'}
          >
            {list()}
          </SimpleMenu>

          <span>{t('from')}</span>
          <span>{totalElements}</span>
          <span>{endLimitString ?? t('items')}</span>
        </div>
      ) : null}
    </div>
  );
};
