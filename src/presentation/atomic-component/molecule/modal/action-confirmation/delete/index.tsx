import { Button, IconButton } from '@mui/material';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { useDelete } from 'data/use-case';
import { useModal } from 'data/hooks';
import type { FC, ReactNode } from 'react';

interface DeleteConfirmationModalProps {
  text: ReactNode | string;
  title: string;
  id: number | string;
  route: unknown;
  queryName: string;
  successMessage: string;
  deleteText?: string;
  onClose?: () => void;
  afterDelete?: () => void;
  openElement?: ReactNode;
  isPatch?: boolean;
  hideCancelButton?: boolean;
}

export const DeleteConfirmationModal: FC<DeleteConfirmationModalProps> = ({
  text,
  id,
  title,
  route,
  onClose,
  deleteText,
  afterDelete,
  hideCancelButton,
  queryName,
  successMessage,
  openElement,
  isPatch
}) => {
  const { closeModal: close, openModal, isOpen } = useModal();

  const closeModal = (): void => {
    close();
    if (onClose) onClose();
  };

  const { handleDelete } = useDelete({
    afterDelete,
    closeModal,
    id,
    isPatch,
    queryName,
    route,
    successMessage
  });

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      openModalElement={
        openElement ? (
          <div className={'flex flex-col'} onClick={openModal}>
            {openElement}
          </div>
        ) : (
          <IconButton onClick={openModal}>
            <DeleteOutlineOutlined color={'error'} />
          </IconButton>
        )
      }
      size={'small'}
    >
      <div className={'w-full h-full flex flex-col gap-3'}>
        <h3 className={'text-xl font-bold'}>{title}</h3>
        <p>{text}</p>

        <div className={'flex mt-8 flex-row gap-4 max-w-[65%] ml-auto w-full'}>
          {hideCancelButton ? null : (
            <Button className={'w-full'} color={'warning'} onClick={closeModal}>
              Não, voltar
            </Button>
          )}

          <Button autoFocus className={'w-full'} color={'error'} onClick={handleDelete}>
            {deleteText || 'Sim, remover'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
