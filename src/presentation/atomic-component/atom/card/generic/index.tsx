import { openMenu } from 'main/utils';
import type { FC, ReactNode } from 'react';

interface GenericCardProps {
  title: ReactNode | string;
  description: ReactNode | string;
  startElement?: ReactNode | string;
  endElement?: ReactNode | string;
  onClick?: () => void;
  menuId?: string;
  selected?: boolean;
}

export const GenericCard: FC<GenericCardProps> = ({
  title,
  description,
  onClick,
  menuId,
  endElement,
  selected,
  startElement
}) => {
  return (
    <div
      className={`flex items-center w-full gap-2 rounded-[10px] p-4 px-4 tablet:px-8 cursor-pointer bg-white hover:bg-[#eeeeee] ${selected ? 'border border-primary' : ''}`}
      onClick={onClick}
      onContextMenu={
        menuId
          ? (event): void => {
              event.preventDefault();
              openMenu(menuId);
            }
          : undefined
      }
    >
      {startElement}

      <div className={'flex flex-col gap-2 w-full'}>
        <p className={'text-blue-semiDark font-extrabold text-lg'}>{title}</p>
        <p className={'text-blue-semiDark font-light text-base line-clamp-2'}>{description}</p>
      </div>

      {endElement}
    </div>
  );
};
