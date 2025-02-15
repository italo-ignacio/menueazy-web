/* eslint-disable @typescript-eslint/no-restricted-imports */
import { Button, IconButton, SpeedDial, SpeedDialAction } from '@mui/material';
import { CategoryFilter } from '../category';
import { Description, FilterList, WidgetsOutlined } from '@mui/icons-material';
import { type FC, type ReactNode, useState } from 'react';
import { MakeAssetAvailableModal } from 'presentation/atomic-component/molecule/modal';
import { Modal } from 'presentation/atomic-component/atom';
import { SearchInput } from '../search-input';
import { TechnologicalAreaFilter } from '../technological-area';
import { UFFilter } from '../uf';
import { dimensions } from 'main/config';
import { setFilter } from 'main/utils';
import { useAppSelector } from 'store';
import { useModal, useWindowDimensions } from 'data/hooks';
import type { FilterSliceState } from 'store/filters/slice';

interface AssetsFilterProps {
  filter: keyof FilterSliceState;
}

export const AssetsFilter: FC<AssetsFilterProps> = ({ filter }) => {
  const { type, category, technologicalArea, uf, search } = useAppSelector(
    (state) => state.filter[filter as 'availableAssets']
  );

  const [open, setOpen] = useState(false);
  const { width } = useWindowDimensions();
  const { closeModal, isOpen, openModal } = useModal();
  const modal = useModal();

  const getFilters = (isMobile?: boolean): ReactNode => {
    return (
      <>
        {type === 'NATIONAL' ? (
          <UFFilter
            maxWidth={isMobile ? '' : '12%'}
            onChange={(value) => setFilter(filter, { uf: value })}
            value={uf}
          />
        ) : null}

        <CategoryFilter
          maxWidth={isMobile ? '' : '15%'}
          onChange={(value) => setFilter(filter, { category: value })}
          value={category}
        />

        <TechnologicalAreaFilter
          maxWidth={isMobile ? '' : '20%'}
          onChange={(value) => setFilter(filter, { technologicalArea: value })}
          value={technologicalArea}
        />
      </>
    );
  };

  const cleanFilter = (): void => {
    setFilter(filter, { category: [], technologicalArea: [], uf: [] });
  };

  return (
    <div className={'flex gap-4 w-full'}>
      <SearchInput onChange={(value) => setFilter(filter, { search: value })} value={search} />

      {width < dimensions.laptop ? (
        <>
          <Modal
            closeModal={closeModal}
            hideCloseButton
            isOpen={isOpen}
            openModal={openModal}
            openModalElement={
              <div className={'bg-gray-125 rounded'}>
                <IconButton onClick={openModal}>
                  <FilterList className={'text-gray-800'} color={'inherit'} />
                </IconButton>
              </div>
            }
            size={'large'}
            title={'Filtrar por'}
          >
            <div className={'flex flex-col w-full gap-4 mt-4'}>
              {getFilters(true)}

              <div className={'flex gap-5 mt-6'}>
                <Button className={'w-full'} color={'error'} onClick={cleanFilter}>
                  Limpar filtros
                </Button>

                <Button className={'w-full'} onClick={closeModal} size={'large'}>
                  Fechar
                </Button>
              </div>
            </div>
          </Modal>

          <div className={'rounded-full p-1 fixed z-30 bottom-4 right-4'}>
            <SpeedDial
              ariaLabel={'label'}
              icon={<WidgetsOutlined className={'text-white'} />}
              onClick={(): void => setOpen(!open)}
              open={open}
            >
              <SpeedDialAction
                icon={<Description />}
                onClick={(): void => modal.openModal()}
                tooltipOpen
                tooltipTitle={<span className={'truncate'}>Disponibilizar Ativo</span>}
              />
            </SpeedDial>
          </div>
        </>
      ) : (
        getFilters()
      )}

      {type === 'REGIONAL' ? (
        <MakeAssetAvailableModal hide={width < dimensions.laptop} modal={modal} />
      ) : null}
    </div>
  );
};
