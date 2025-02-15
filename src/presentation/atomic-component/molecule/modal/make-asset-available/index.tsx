import { Add } from '@mui/icons-material';
import { MakeAssetAvailableForm } from 'presentation/atomic-component/molecule/form/make-asset-available';
import { Modal } from 'presentation/atomic-component/atom/modal';
import type { FC } from 'react';
import type { useModalProps } from 'data/hooks';

interface MakeAssetAvailableModalProps {
  hide: boolean;
  modal: useModalProps;
}
export const MakeAssetAvailableModal: FC<MakeAssetAvailableModalProps> = ({ hide, modal }) => {
  const { closeModal, isOpen, openModal } = modal;

  return (
    <Modal
      button={hide ? undefined : { StartIcon: Add, title: 'Disponibilizar Ativo' }}
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      size={'medium'}
      title={'Disponibilizar Ativo'}
    >
      <div className={'flex flex-col gap-8'}>
        <p>Preencha o formulário abaixo</p>
        <MakeAssetAvailableForm closeModal={closeModal} />
      </div>
    </Modal>
  );
};
