import { Button } from '@mui/material';
import { IngredientDataForm } from 'presentation/atomic-component/molecule/form';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { NoteAdd } from '@mui/icons-material';
import { useModal } from 'data/hooks';
import type { FC } from 'react';
import type { Ingredient, IngredientData } from 'domain/models';

interface IngredientDataModalProps {
  ingredient: Ingredient;
  ingredientData?: IngredientData;
}

export const IngredientDataModal: FC<IngredientDataModalProps> = ({
  ingredient,
  ingredientData
}) => {
  const { closeModal, isOpen, openModal } = useModal();

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      openModalElement={
        <Button onClick={openModal} sx={{ maxWidth: 40, minWidth: '0' }} variant={'outlined'}>
          <NoteAdd />
        </Button>
      }
      size={'full'}
    >
      <IngredientDataForm
        closeModal={closeModal}
        ingredient={ingredient}
        ingredientData={ingredientData}
      />
    </Modal>
  );
};
