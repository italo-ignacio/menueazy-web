import { Close, FilterAlt } from '@mui/icons-material';
import { DateRangeInput } from 'presentation/atomic-component/atom/date-range-input';
import { IconButton } from '@mui/material';
import { SimpleMenu } from 'presentation/atomic-component/atom/simple-menu';
import { SortFilter } from 'presentation/atomic-component/atom/sort-filter';
import { useState } from 'react';
import { voidFunction } from 'main/utils';
import type { FC } from 'react';
import type { InputDateProps } from 'presentation/atomic-component/atom/date-range-input';
import type { TableSortFilter } from 'store/filters/slice';

export interface DateTableFilterProps {
  title: string;
  onChange: (value: InputDateProps | null) => void;
  filterName: string;
  filterValue: InputDateProps | null;
  side?: 'bottom' | 'left' | 'right' | 'top';
  sortItem?: TableSortFilter;
}

export const DateTableFilter: FC<DateTableFilterProps> = ({
  title,
  onChange,
  filterName,
  side,
  filterValue,
  sortItem
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={'flex justify-center gap-2 items-center w-full'}>
      <span>{title}</span>

      <div>
        <SimpleMenu
          isOpen={open}
          openElement={
            <div className={'max-w-[40px] relative'}>
              <IconButton onClick={voidFunction}>
                <FilterAlt />
              </IconButton>

              {filterValue && (filterValue?.endDate !== null || filterValue?.startDate !== null) ? (
                <div
                  className={
                    'bg-primary p-1 w-5 h-5 flex justify-center items-center rounded-full text-white absolute right-[-3px] top-[-3px] z-10'
                  }
                >
                  1
                </div>
              ) : null}
            </div>
          }
          setIsOpen={setOpen}
          side={side ?? 'bottom'}
        >
          <div className={'bg-white flex flex-col gap-6 p-4 py-6 min-h-max laptop:min-w-[300px]'}>
            <div className={'flex items-center justify-between w-full'}>
              <div className={'flex gap-3 items-center text-gray-500 font-bold'}>
                <span className={'text-base'}>ﾠ{title}</span>
                {sortItem ? <SortFilter filterName={filterName} {...sortItem} /> : null}
              </div>

              <IconButton
                onClick={(): void => {
                  setOpen(false);
                }}
                title={'Fechar'}
              >
                <Close className={'hover:cursor-pointer text-gray-500'} />
              </IconButton>
            </div>

            <DateRangeInput
              label={'Data'}
              maxDate={new Date()}
              onChange={onChange}
              value={filterValue ? [filterValue] : []}
            />
          </div>
        </SimpleMenu>
      </div>
    </div>
  );
};
