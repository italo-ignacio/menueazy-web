import { Button } from '@mui/material';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { useModal } from 'data/hooks';
import type { FC, ReactNode } from 'react';

interface ImageModalProps {
  url?: string | null;
  alt?: string;
  openModalElement?: ReactNode;
  className?: string;
}

export const ImageModal: FC<ImageModalProps> = ({ url, openModalElement, alt, className }) => {
  const { closeModal, isOpen, openModal } = useModal();

  return (
    <Modal
      closeModal={closeModal}
      hideBackground
      hideCloseButton
      isOpen={isOpen}
      openModal={openModal}
      openModalElement={
        openModalElement || (
          <img
            alt={alt}
            className={className}
            onClick={openModal}
            src={url ?? ''}
            style={{ cursor: 'pointer' }}
          />
        )
      }
      size={'medium'}
    >
      <div className={'flex justify-end'}>
        <Button
          autoFocus
          focusRipple={false}
          onClick={closeModal}
          sx={{
            backgroundColor: 'transparent !important',
            border: 'none !important',
            boxShadow: 'none !important',
            cursor: 'default !important'
          }}
        />
      </div>

      <img alt={alt} className={'bg-gray-800 max-h-[80vh]'} src={url ?? ''} />
    </Modal>
  );
};
