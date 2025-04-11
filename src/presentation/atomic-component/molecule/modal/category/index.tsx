import { CategoryForm } from 'presentation/atomic-component/molecule/form';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { useModal } from 'data/hooks';
import { useTranslation } from 'react-i18next';
import type { Category } from 'domain/models';
import type { FC, ReactNode } from 'react';

interface CategoryModalProps {
  category?: Category;
  openElement?: ReactNode;
}

export const CategoryModal: FC<CategoryModalProps> = ({ category, openElement }) => {
  const { closeModal, isOpen, openModal } = useModal();

  const { t } = useTranslation('entity');

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      openModalElement={<div onClick={openModal}>{openElement}</div>}
      size={'small'}
      title={t('category')}
    >
      <CategoryForm category={category} closeModal={closeModal} />
    </Modal>
  );
};
