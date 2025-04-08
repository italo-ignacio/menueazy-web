import { Add, Remove } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { DateInput, FormButton } from 'presentation/atomic-component/atom';
import { type FC, useEffect, useRef } from 'react';
import { InputController } from 'presentation/atomic-component/atom/input-controller';
import { useIngredientData } from 'data/use-case';
import { useTranslation } from 'react-i18next';
import { validate } from 'main/utils';
import type { Ingredient, IngredientData } from 'domain/models';

interface IngredientDataFormProps {
  ingredient: Ingredient;
  closeModal?: () => void;
  ingredientData?: IngredientData;
}

export const IngredientDataForm: FC<IngredientDataFormProps> = ({
  closeModal,
  ingredient,
  ingredientData
}) => {
  const {
    handleSubmit,
    onSubmit,
    control,
    setValue,
    getValues,
    formState: { isSubmitting }
  } = useIngredientData({ closeModal, ingredient, ingredientData });

  const { t } = useTranslation('common');

  const intervalRef = useRef<number | null>(null);
  const intervalRef2 = useRef<number | null>(null);

  const startAction = (): void => {
    setValue('quantity', String(Number(getValues('quantity') ?? 0) + 1), validate);
  };

  const handleMouseDown = (): void => {
    startAction();
    intervalRef.current = window.setInterval(startAction, 150);
  };

  const handleMouseUp = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAction2 = (): void => {
    if (Number(getValues('quantity') ?? 0) > 0)
      setValue('quantity', String(Number(getValues('quantity') ?? 0) - 1), validate);
  };

  const handleMouseDown2 = (): void => {
    startAction2();
    intervalRef2.current = window.setInterval(startAction2, 150);
  };

  const handleMouseUp2 = (): void => {
    if (intervalRef2.current) {
      clearInterval(intervalRef2.current);
      intervalRef2.current = null;
    }
  };

  useEffect((): void => {
    if (ingredientData) {
      setValue('entryQuantity', String(ingredientData.entryQuantity), validate);
      setValue('expiresAt', ingredientData.expiresAt, validate);
      setValue('quantity', String(ingredientData.quantity), validate);
      setValue('unitPrice', String(ingredientData.unitPrice), validate);
    }
  }, [ingredientData]);

  return (
    <form
      className={'flex flex-col gap-5 w-full tablet:w-[600px]'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={'text-2xl font-semibold'}>{ingredient.name}</h2>

      <div className={'flex gap-4 w-full'}>
        <div className={'flex flex-col gap-4'}>
          <img
            alt={' '}
            className={'object-contain min-w-[250px] max-h-[164px]'}
            src={ingredient.imageUrl}
          />

          <div className={'flex flex-col gap-2'}>
            <span>
              {t('stock.table.inStock', { ns: 'restaurant' })}:{' '}
              <strong>{ingredient.quantity}</strong>
            </span>
          </div>
        </div>

        <div className={'flex flex-col w-full gap-5'}>
          <div className={'flex flex-col gap-1'}>
            <span>Quantidade</span>

            <div className={'flex gap-2'}>
              <IconButton
                onMouseDown={handleMouseDown2}
                onMouseLeave={handleMouseUp2}
                onMouseUp={handleMouseUp2}
                onTouchEnd={handleMouseUp2}
                onTouchStart={handleMouseDown2}
                sx={{ minWidth: '40px' }}
              >
                <Remove />
              </IconButton>

              <InputController
                EndIcon={<span className={'px-2'}>{t(ingredient.measure)}</span>}
                autoFocus
                control={control}
                inputMode={'decimal'}
                inputProps={{ min: 0 }}
                name={'quantity'}
                sx={{
                  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                    WebkitAppearance: 'none',
                    margin: 0
                  },
                  '& input[type=number]': {
                    MozAppearance: 'textfield'
                  }
                }}
                variant={'filled'}
              />

              <IconButton
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseUp}
                onMouseUp={handleMouseUp}
                onTouchEnd={handleMouseUp}
                onTouchStart={handleMouseDown}
                sx={{ minWidth: '40px' }}
              >
                <Add />
              </IconButton>
            </div>
          </div>

          <InputController
            control={control}
            inputMode={'decimal'}
            inputProps={{ min: 0 }}
            labelTop={`${t('product.table.price', { ns: 'restaurant' })} ${t('per')} ${t(ingredient.measure)}`}
            name={'unitPrice'}
          />

          <div className={'flex flex-col gap-1'}>
            <span>Data de validade</span>
            <DateInput minDate={new Date()} />
          </div>

          <div className={'flex gap-5 w-full mt-6 ml-auto'}>
            <Button className={'w-full'} color={'warning'} onClick={closeModal}>
              Cancelar
            </Button>

            <FormButton isSubmitting={isSubmitting} label={'Salvar'} />
          </div>
        </div>
      </div>
    </form>
  );
};
