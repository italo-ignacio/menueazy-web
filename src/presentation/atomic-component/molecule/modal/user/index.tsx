import { Add, BorderColorOutlined, Person } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { useModal } from 'data/hooks';
import type { FC, ReactNode } from 'react';
import type { User } from 'domain/models';

interface UserModalProps {
  user?: User;
  isLocal?: boolean;
}

export const UserModal: FC<UserModalProps> = ({ user, isLocal }) => {
  const { closeModal, isOpen, openModal } = useModal();

  const openElement = (): ReactNode => {
    if (isLocal)
      return (
        <IconButton onClick={openModal}>
          <Person color={'inherit'} fontSize={'large'} />
        </IconButton>
      );

    if (user)
      return (
        <IconButton onClick={openModal}>
          <BorderColorOutlined color={'primary'} />
        </IconButton>
      );

    return (
      <Button onClick={openModal} startIcon={<Add />}>
        Novo Usuário
      </Button>
    );
  };

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      openModalElement={openElement()}
      size={'medium'}
      title={`${user ? 'Edição' : 'Cadastro'} de Usuário`}
    >
      aaa
    </Modal>
  );
};
