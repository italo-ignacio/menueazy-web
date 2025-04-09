import { Button, CircularProgress, FormControlLabel, FormGroup, Switch } from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import { FormButton } from 'presentation/atomic-component/atom/form-button';
import { InputController } from 'presentation/atomic-component/atom/input-controller';
import { LabelInput, NumericInput } from 'presentation/atomic-component/atom';
import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { resolverError, validate } from 'main/utils';
import { useEffect, useState } from 'react';
import { useRequestRestaurant } from 'data/use-case/form/use-request-restaurant';
import { useSearch } from 'data/hooks';
import { useTranslation } from 'react-i18next';
import type { FC, ReactNode } from 'react';

interface RestaurantFormProps {
  closeModal: () => void;
}

export const RestaurantForm: FC<RestaurantFormProps> = ({ closeModal }) => {
  const {
    handleSubmit,
    onSubmit,
    control,
    getValues,
    register,
    setValue,
    formState: { isSubmitting }
  } = useRequestRestaurant({ closeModal });

  const [checkedStatus, setCheckedStatus] = useState<'CHECKING' | 'FAILED' | 'NONE' | 'OK'>('NONE');

  const [url, setUrl] = useState('');
  const { t } = useTranslation('errors');

  const { search } = useSearch({ searchDebounce: url });

  useEffect(() => {
    const checkUrl = async (): Promise<void> => {
      try {
        setCheckedStatus('CHECKING');

        const data = await api.post<{ canUseUrl: boolean }>({
          body: { restaurantUrl: url },
          id: 'check-url',
          route: apiPaths.restaurant
        });

        setCheckedStatus(data.canUseUrl ? 'OK' : 'FAILED');
        setValue('restaurantUrl', url, validate);
      } catch (error) {
        resolverError(error);
        setCheckedStatus('FAILED');
      }
    };

    if (search.length > 2) checkUrl();
  }, [search]);

  const getResItem = (): ReactNode => {
    switch (checkedStatus) {
      case 'NONE':
        return null;
      case 'CHECKING':
        return <CircularProgress size={30} />;
      case 'FAILED':
        return <Close color={'error'} />;
      case 'OK':
        return <Check color={'success'} />;

      default:
        return null;
    }
  };

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
          label={'Telefone'}
          name={'phone'}
          placeholder={'Digite o telefone'}
          required
          type={'number'}
        />

        <div className={'flex gap-4 items-center'}>
          <LabelInput
            error={checkedStatus === 'FAILED'}
            errorMessage={t('urlInUse')}
            label={'URL do restaurant'}
            onChange={(event): void => setUrl(event.target.value)}
            placeholder={'Digite a URL do restaurant'}
            required
            value={url}
          />

          {getResItem()}
        </div>

        <FormGroup>
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={getValues('hasDelivery')}
                  onChange={(event): void =>
                    setValue('hasDelivery', event.target.checked, validate)
                  }
                />
              }
              label={'Possui delivery'}
              labelPlacement={'start'}
            />
          </div>
        </FormGroup>

        <NumericInput
          label={'Valor minimo para pedidos'}
          onChange={(event): void => setValue('minimumOrderPrice', event.floatValue ?? 0, validate)}
          placeholder={'Digite o valor minimo para pedido'}
          register={register('minimumOrderPrice')}
          type={'monetary'}
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
