import { Button } from '@mui/material';
import { FormButton } from 'presentation/atomic-component/atom/form-button';
import { InputController } from 'presentation/atomic-component/atom/input-controller';
import { useLogin } from 'data/use-case';
import type { FC } from 'react';

interface RegisterInterestFormProps {
  closeModal: () => void;
  imageUrl?: string;
}

export const RegisterInterestForm: FC<RegisterInterestFormProps> = ({ closeModal, imageUrl }) => {
  const {
    handleSubmit,
    onSubmit,
    control,
    formState: { isSubmitting }
  } = useLogin();

  return (
    <form className={'flex flex-col gap-5 w-full'} onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex flex-col tablet:flex-row gap-5'}>
        <img alt={''} className={'w-full h-[270px]'} src={imageUrl ?? ''} />

        <div className={'flex flex-col gap-4 w-full'}>
          <div className={'flex flex-col gap-2.5'}>
            <h3 className={'text-primary'}>Unidade interessada</h3>
            <p>SENAI Escola “Ivan Fabio Zurita”</p>
          </div>

          <InputController
            autoFocus
            control={control}
            inputProps={{ min: 0 }}
            label={'Quantidade desejada'}
            name={'email'}
            placeholder={'Digite a quantidade desejada'}
            type={'number'}
          />

          <InputController
            control={control}
            label={'Motivo do Interesse'}
            maxRows={5}
            minRows={5}
            multiline
            name={'password'}
            placeholder={'Digite o motivo do interesse'}
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
