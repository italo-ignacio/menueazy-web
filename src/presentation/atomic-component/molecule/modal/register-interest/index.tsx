import { Modal } from 'presentation/atomic-component/atom/modal';
import { RegisterInterestForm } from 'presentation/atomic-component/molecule/form/register-interest';
import { useModal } from 'data/hooks';
import type { FC } from 'react';

interface RegisterInterestModalProps {
  id: string;
  name: string;
  imageUrl: string;
}

export const RegisterInterestModal: FC<RegisterInterestModalProps> = ({ id, imageUrl, name }) => {
  const { closeModal, isOpen, openModal } = useModal();

  console.log(id);

  return (
    <Modal
      button={{ color: 'warning', title: 'Tenho interesse' }}
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      size={'medium'}
      title={'Registro de interesse'}
    >
      <div className={'flex flex-col gap-8'}>
        <p>{name}</p>
        <RegisterInterestForm closeModal={closeModal} imageUrl={imageUrl} />
      </div>
    </Modal>
  );
};
