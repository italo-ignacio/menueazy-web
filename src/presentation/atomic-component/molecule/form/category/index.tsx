import { Button } from '@mui/material';
import { FormButton } from 'presentation/atomic-component/atom/form-button';
import { InputController } from 'presentation/atomic-component/atom/input-controller';
import { useCategory } from 'data/use-case';
import { useEffect } from 'react';
import { validate } from 'main/utils';
import type { Category } from 'domain/models';
import type { FC } from 'react';

interface CategoryFormProps {
  closeModal: () => void;
  category?: Category;
}

export const CategoryForm: FC<CategoryFormProps> = ({ closeModal, category }) => {
  const {
    handleSubmit,
    onSubmit,
    control,
    setValue,
    formState: { isSubmitting }
  } = useCategory({ category, closeModal });

  useEffect(() => {
    if (category) {
      setValue('name', category.name, validate);
      setValue('description', category.description, validate);
    }
  }, [category]);

  return (
    <form className={'flex flex-col gap-5 py-3 w-full'} onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex flex-col gap-4'}>
        <InputController
          autoFocus
          control={control}
          label={'Nome'}
          name={'name'}
          placeholder={'Digite o nome'}
          required
        />

        <InputController
          control={control}
          label={'Descrição da categoria'}
          maxRows={4}
          minRows={4}
          multiline
          name={'description'}
          placeholder={'Digite a descrição da categoria'}
        />
      </div>

      <div className={'flex gap-5 tablet:max-w-[300px] w-full ml-auto'}>
        <Button className={'w-full'} color={'warning'} onClick={closeModal}>
          Cancelar
        </Button>

        <FormButton isSubmitting={isSubmitting} label={'Salvar'} />
      </div>
    </form>
  );
};
