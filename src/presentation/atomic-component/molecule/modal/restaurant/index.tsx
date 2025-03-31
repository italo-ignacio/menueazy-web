import { Modal } from 'presentation/atomic-component/atom/modal';
import { RestaurantForm } from 'presentation/atomic-component/molecule/form';
import { useModal } from 'data/hooks';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

export const RestaurantModal: FC = () => {
  const { closeModal, isOpen, openModal } = useModal();

  const { t } = useTranslation('entity');

  return (
    <Modal
      button={{
        title: 'Novo restaurant'
      }}
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      size={'small'}
      title={t('restaurant')}
    >
      <RestaurantForm closeModal={closeModal} />
    </Modal>
  );
};
