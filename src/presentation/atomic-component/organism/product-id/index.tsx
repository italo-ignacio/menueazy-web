/* eslint-disable react/jsx-props-no-spreading */
import { BlockSidebar } from 'presentation/atomic-component/atom/loading/block-sidebar';
import { Button } from '@mui/material';
import { ProductCard } from 'presentation/atomic-component/atom';
import { ProductIdGeneralForm } from 'presentation/atomic-component/molecule/form/product-id';
import { ProductIdTabs } from './tabs';
import { paths } from 'main/config';
import { setProductIdComplete } from 'store/product-id/slice';
import { useAppSelector } from 'store';
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

  const { product: productData } = useAppSelector((state) => state.productId);
  const dispatch = useDispatch();

  const [hasUpdate, setHasUpdate] = useState(false);

  const navigate = useNavigate();
  const { restaurantUrl } = useRestaurant();

  const handleClickButton = (type: 'next' | 'preview'): void => {
    if (hasUpdate) {
      setHasUpdate(false);
      return;
    }

    if (type === 'next') setTabSelected((old) => (old === 'GENERAL' ? 'INGREDIENT' : 'ADDITIONAL'));
    else if (tabSelected === 'GENERAL') navigate(paths.restaurantProduct(restaurantUrl));
    else setTabSelected((old) => (old === 'ADDITIONAL' ? 'INGREDIENT' : 'GENERAL'));
  };

  useEffect(() => {
    dispatch(
      setProductIdComplete({
        ...product,
        categoryList: product.categoryList.map((item) => item.id)
      })
    );
  }, [product]);

  const getForm = (): ReactNode => {
    switch (tabSelected) {
      case 'GENERAL':
        return <ProductIdGeneralForm product={product} />;
      case 'ADDITIONAL':
        return null;
      case 'INGREDIENT':
        return null;

      default:
        return null;
    }
  };

  return (
    <div className={'flex flex-col gap-6 w-full'}>
      {hasUpdate ? <BlockSidebar /> : null}

      <div className={'flex gap-6'}>
        <div className={'flex flex-col gap-6 w-full'}>
          <div className={'bg-white w-full border rounded-md shadow-base p-5'}>
            <ProductIdTabs tabSelected={tabSelected} />
          </div>

          <div
            className={
              'bg-white w-full border rounded-md shadow-base p-5 h-[calc(100dvh-30dvh)] overflow-auto'
            }
          >
            {getForm()}
          </div>
        </div>

        <div className={'w-[35%]'}>
          <ProductCard {...product} {...productData} />
        </div>
      </div>

      <div className={'flex gap-6 bg-white w-full rounded-md border shadow-base p-3 justify-end'}>
        <Button
          color={'warning'}
          onClick={(): void => {
            handleClickButton('preview');
          }}
        >
          {tabSelected === 'GENERAL' ? 'Cancelar' : 'Voltar'}
        </Button>

        <Button color={'warning'}>Salvar</Button>

        <Button
          onClick={(): void => {
            handleClickButton('next');
          }}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};
