/* eslint-disable react/jsx-props-no-spreading */
import { BlockSidebar } from 'presentation/atomic-component/atom/loading/block-sidebar';
import { Button } from '@mui/material';
import {
  ConfirmationModal,
  DeleteConfirmationModal
} from 'presentation/atomic-component/molecule/modal/action-confirmation';
import { PreviewProductIdCard } from 'presentation/atomic-component/atom';
import { ProductIdGeneralForm } from 'presentation/atomic-component/molecule/form/product-id';
import { ProductIdTabs } from './tabs';
import { QueryName, apiPaths, paths } from 'main/config';
import { setProductIdComplete } from 'store/product-id/slice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestaurant } from 'data/hooks';
import type { FC, ReactNode } from 'react';
import type { Product } from 'domain/models';

interface ProductIdTemplateProps {
  product: Product;
}

export const ProductIdTemplate: FC<ProductIdTemplateProps> = ({ product }) => {
  const [tabSelected, setTabSelected] = useState<'ADDITIONAL' | 'GENERAL' | 'INGREDIENT'>(
    'GENERAL'
  );

  const dispatch = useDispatch();

  const [hasUpdate, setHasUpdate] = useState(false);

  const navigate = useNavigate();
  const { restaurantUrl, restaurantId } = useRestaurant();

  const handleClickButton = (type: 'next' | 'preview'): void => {
    if (type === 'next') setTabSelected((old) => (old === 'GENERAL' ? 'INGREDIENT' : 'ADDITIONAL'));
    else if (tabSelected === 'GENERAL') navigate(paths.restaurantProduct(restaurantUrl));
    else setTabSelected((old) => (old === 'ADDITIONAL' ? 'INGREDIENT' : 'GENERAL'));
  };

  useEffect(() => {
    dispatch(setProductIdComplete(product));
  }, [product]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent): void => {
      if (hasUpdate) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUpdate]);

  const getForm = (): ReactNode => {
    switch (tabSelected) {
      case 'GENERAL':
        return <ProductIdGeneralForm product={product} setHasUpdate={setHasUpdate} />;
      case 'ADDITIONAL':
        return null;
      case 'INGREDIENT':
        return null;

      default:
        return null;
    }
  };

  return (
    <div className={'flex flex-col gap-4 tablet:gap-6 w-full'}>
      {hasUpdate ? (
        <>
          <BlockSidebar
            onClick={(): void => document.getElementById('open-sidebar-block-modal')?.click()}
          />

          <ConfirmationModal
            cancelText={'Cancelar alteracoes'}
            confirmText={'Salvar alteracoes'}
            onCancel={(): void => {
              dispatch(setProductIdComplete(product));
              setHasUpdate(false);
            }}
            onConfirm={(): void => document.getElementById(`${tabSelected}-submit`)?.click()}
            openElement={<div className={'hidden'} id={'open-sidebar-block-modal'} />}
            text={'Voce possiu alteracoes pendentes, deseja salva-las?'}
            title={'Deseja salvar as alteracoes?'}
          />
        </>
      ) : null}

      <div className={'flex flex-col gap-4 tablet:gap-6 w-full laptop:flex-row'}>
        <div className={'flex flex-col gap-4 tablet:gap-6 w-full'}>
          <div className={'bg-white w-full border overflow-auto rounded-md shadow-base p-5'}>
            <ProductIdTabs tabSelected={tabSelected} />
          </div>

          <div
            className={
              'bg-white w-full border rounded-md shadow-base p-5 laptop:h-[calc(100dvh-30dvh)] laptop:overflow-auto'
            }
          >
            {getForm()}
          </div>
        </div>

        <div
          className={
            'w-full tablet:w-[45%] tablet:ml-auto laptop:w-[35%] rounded-md laptop:max-h-[calc(100dvh-18dvh)] laptop:overflow-auto'
          }
        >
          <PreviewProductIdCard />
        </div>
      </div>

      <div
        className={
          'flex flex-col tablet:flex-row gap-4 bg-white w-full rounded-md border shadow-base p-3 justify-end'
        }
      >
        <DeleteConfirmationModal
          afterDelete={(): void => {
            navigate(paths.restaurantProduct(restaurantUrl));
          }}
          id={product.id}
          openElement={<Button color={'error'}>Deletar produto</Button>}
          queryName={QueryName.product}
          route={apiPaths.product(restaurantId)}
          successMessage={'Produto deletado com sucesso!'}
          text={'Tem certeza q deseja deletar o produto selecionado?'}
          title={'Deletar produto'}
        />

        {hasUpdate ? (
          <ConfirmationModal
            cancelText={'Cancelar alteracoes'}
            confirmText={'Salvar alteracoes'}
            onCancel={(): void => {
              dispatch(setProductIdComplete(product));
              setHasUpdate(false);
              handleClickButton('preview');
            }}
            onConfirm={(): void => document.getElementById(`${tabSelected}-submit`)?.click()}
            openElement={
              <Button color={'warning'}>{tabSelected === 'GENERAL' ? 'Cancelar' : 'Voltar'}</Button>
            }
            text={'Voce possiu alteracoes pendentes, deseja salva-las?'}
            title={'Deseja salvar as alteracoes?'}
          />
        ) : (
          <Button
            color={'warning'}
            onClick={(): void => {
              handleClickButton('preview');
            }}
          >
            {tabSelected === 'GENERAL' ? 'Cancelar' : 'Voltar'}
          </Button>
        )}

        <div className={'relative flex'}>
          <Button
            className={'w-full'}
            color={'warning'}
            disabled={!hasUpdate}
            onClick={(): void => document.getElementById(`${tabSelected}-submit`)?.click()}
          >
            Salvar
          </Button>

          {hasUpdate ? (
            <div className={'h-4 w-4 bg-primary absolute top-[-4px] right-[-4px] rounded-full'} />
          ) : null}
        </div>

        {hasUpdate ? (
          <ConfirmationModal
            cancelText={'Cancelar alteracoes'}
            confirmText={'Salvar alteracoes'}
            onCancel={(): void => {
              dispatch(setProductIdComplete(product));
              setHasUpdate(false);
              handleClickButton('next');
            }}
            onConfirm={(): void => document.getElementById(`${tabSelected}-submit`)?.click()}
            openElement={<Button>Continuar</Button>}
            text={'Voce possiu alteracoes pendentes, deseja salva-las?'}
            title={'Deseja salvar as alteracoes?'}
          />
        ) : (
          <Button
            onClick={(): void => {
              handleClickButton('next');
            }}
          >
            Continuar
          </Button>
        )}
      </div>
    </div>
  );
};
