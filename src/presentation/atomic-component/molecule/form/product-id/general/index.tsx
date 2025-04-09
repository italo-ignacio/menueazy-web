import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { InputController } from 'presentation/atomic-component/atom/input-controller';
import { NumericInput } from 'presentation/atomic-component/atom';
import { ProductFileDrop } from 'presentation/atomic-component/atom/product-file-drop';
import { ProductIdGeneralImageForm } from './image';
import { useAppSelector } from 'store';
import { useProductIdGeneral } from 'data/use-case/form/use-product-id/general';
import { validate } from 'main/utils';
import type { FC } from 'react';
import type { Product } from 'domain/models';

interface ProductIdGeneralFormProps {
  product: Product;
}

export const ProductIdGeneralForm: FC<ProductIdGeneralFormProps> = ({ product }) => {
  const { handleSubmit, onSubmit, control, getValues, register, setValue } = useProductIdGeneral({
    product
  });

  const { product: productData } = useAppSelector((state) => state.productId);

  return (
    <form className={'flex flex-col gap-5 pt-4 w-full'} onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex gap-6'}>
        <div className={'flex flex-col gap-1 w-[60%]'}>
          <h2 className={'font-bold'}>
            Imagens do produto <span className={'text-red'}>*</span>
          </h2>

          <p className={'text-gray-600'}>
            Escolha as melhores fotos do seu produto para chamar atenção!{' '}
          </p>
        </div>

        <div className={'flex flex-wrap gap-3 w-full'}>
          {productData?.imageList?.map((image) => (
            <ProductIdGeneralImageForm
              key={image.id}
              image={image}
              images={productData?.imageList ?? []}
              productId={product.id}
            />
          ))}

          {productData?.imageList && productData?.imageList?.length < 5 ? (
            <ProductFileDrop
              limit={5 - (productData?.imageList?.length ?? 0)}
              productId={product.id}
            />
          ) : null}
        </div>
      </div>

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
          name={'categoryList'}
          placeholder={'Digite o telefone'}
          required
          type={'number'}
        />

        <FormGroup>
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={getValues('inStock')}
                  onChange={(event): void => setValue('inStock', event.target.checked, validate)}
                />
              }
              label={'Possui delivery'}
              labelPlacement={'start'}
            />
          </div>
        </FormGroup>

        <NumericInput
          label={'Valor minimo para pedidos'}
          onChange={(event): void => setValue('price', String(event.floatValue ?? 0), validate)}
          placeholder={'Digite o valor minimo para pedido'}
          register={register('price')}
          type={'monetary'}
        />
      </div>
    </form>
  );
};
