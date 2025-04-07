import { Button } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { IngredientForm } from 'presentation/atomic-component/molecule/form';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { useModal } from 'data/hooks';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';
import type { Ingredient } from 'domain/models';

interface IngredientModalProps {
  ingredient?: Ingredient;
}

export const IngredientModal: FC<IngredientModalProps> = ({ ingredient }) => {
  const { closeModal, isOpen, openModal } = useModal();

  const { t } = useTranslation('entity');

  return (
    <Modal
      button={
        ingredient
          ? undefined
          : {
              title: t('stock.filter.newIngredient', { ns: 'restaurant' })
            }
      }
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      openModalElement={
        ingredient ? (
          <Button onClick={openModal} sx={{ maxWidth: 40, minWidth: '0' }} variant={'outlined'}>
            <Edit />
          </Button>
        ) : null
      }
      size={'full'}
      title={t('ingredient')}
    >
      <IngredientForm closeModal={closeModal} ingredient={ingredient} />
    </Modal>
  );
};
