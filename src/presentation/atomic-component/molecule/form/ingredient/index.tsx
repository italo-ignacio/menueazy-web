import { Button, IconButton } from '@mui/material';
import { Close, Image } from '@mui/icons-material';
import { type FC, useEffect, useState } from 'react';
import { FormButton } from 'presentation/atomic-component/atom/form-button';
import { IngredientMeasureSelectValues, getIngredientMeasureSelectValue } from 'domain/enums';
import { InputController } from 'presentation/atomic-component/atom/input-controller';
import { Select } from 'presentation/atomic-component/atom/select';
import { useIngredient } from 'data/use-case';
import { validate } from 'main/utils';
import type { Ingredient } from 'domain/models';
import type { SelectValues } from 'presentation/atomic-component/atom/select';

interface IngredientFormProps {
  closeModal: () => void;
  ingredient?: Ingredient;
}

export const IngredientForm: FC<IngredientFormProps> = ({ closeModal, ingredient }) => {
  const {
    handleSubmit,
    onSubmit,
    control,
    setValue,
    formState: { isSubmitting, errors }
  } = useIngredient({ closeModal, ingredient });

  console.log(errors);

  // const { t } = useTranslation('restaurant');

  const [measureSelect, setMeasureSelect] = useState<SelectValues | null>(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect((): void => {
    if (ingredient) {
      setValue('name', ingredient.name, validate);
      setValue('measure', ingredient.measure, validate);
      setValue('minAlert', ingredient.minAlert, validate);
      setImageUrl(ingredient?.imageUrl ?? '');
      setMeasureSelect(getIngredientMeasureSelectValue[ingredient.measure]);
    }
  }, [ingredient]);

  return (
    <form
      className={'flex flex-col gap-5 pt-4 w-full tablet:w-[600px]'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={'flex gap-4 w-full'}>
        <div className={'flex flex-col gap-4 w-[75%]'}>
          <div className={'flex justify-center items-center h-[155px] border rounded-md'}>
            {imageUrl ? (
              <img alt={' '} className={'object-contain max-h-[154px]'} src={imageUrl} />
            ) : (
              <div className={'text-gray-550 text-[40px]'}>
                <Image color={'inherit'} fontSize={'inherit'} />
              </div>
            )}
          </div>

          <div className={'flex gap-4'}>
            <Button
              className={'w-full'}
              color={'warning'}
              onClick={(): void =>
                document.getElementById(`ingredient-image-${ingredient?.id ?? 'new'}`)?.click()
              }
            >
              Selecionar imagem
            </Button>

            {imageUrl ? (
              <IconButton
                onClick={(): void => {
                  setValue('image', '', validate);
                  setValue('removeImage', true, validate);
                  setImageUrl('');
                }}
              >
                <Close color={'error'} />
              </IconButton>
            ) : null}

            <input
              accept={'image/*'}
              className={'hidden'}
              id={`ingredient-image-${ingredient?.id ?? 'new'}`}
              onChange={(event): void => {
                const file = event.target.files?.[0];

                if (file) {
                  const url = URL.createObjectURL(file);

                  setValue('image', file, validate);
                  setValue('removeImage', false, validate);
                  setImageUrl(url);
                }

                Object.assign(event.target, { value: '' });
              }}
              type={'file'}
            />
          </div>
        </div>

        <div className={'flex flex-col w-full gap-4'}>
          <InputController
            autoFocus
            control={control}
            label={'Nome'}
            name={'name'}
            placeholder={'Digite o nome'}
          />

          <Select
            id={'ingredient-measure'}
            isHideClearButton
            label={'Unidade de medida'}
            onChange={(event): void => {
              const value = event as SelectValues | null;

              setValue('measure', value?.value ?? (null as unknown as string), validate);
              setMeasureSelect(value);
            }}
            options={IngredientMeasureSelectValues}
            value={measureSelect}
          />

          <InputController
            control={control}
            inputProps={{ min: 0 }}
            label={'Alerta de quantidade'}
            name={'minAlert'}
            placeholder={'Alerta de quantidade'}
            type={'number'}
          />
        </div>
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
