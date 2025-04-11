/* eslint-disable complexity */
import { Add, Star, StarOutline } from '@mui/icons-material';
import { Button, FormControlLabel, FormGroup, Switch } from '@mui/material';
import { CategoryModal } from 'presentation/atomic-component/molecule/modal';
import { DateInput } from 'presentation/atomic-component/atom';
import { InputController } from 'presentation/atomic-component/atom/input-controller';
import { type Product, currencyData } from 'domain/models';
import { ProductFileDrop } from 'presentation/atomic-component/atom/product-file-drop';
import { ProductIdGeneralImageForm } from './image';
import { colors } from 'presentation/style';
import { setProductId } from 'store/product-id/slice';
import { useAppSelector } from 'store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useFindCategoryQuery } from 'infra/cache';
import { useProductIdGeneral } from 'data/use-case/form/use-product-id/general';
import { useRestaurant } from 'data/hooks';
import { validate } from 'main/utils';
import type { Dispatch, FC, SetStateAction } from 'react';

interface ProductIdGeneralFormProps {
  product: Product;
  setHasUpdate: Dispatch<SetStateAction<boolean>>;
}

export const ProductIdGeneralForm: FC<ProductIdGeneralFormProps> = ({ product, setHasUpdate }) => {
  const { restaurantId } = useRestaurant();

  const { handleSubmit, onSubmit, control, setValue } = useProductIdGeneral({
    product,
    setHasUpdate
  });

  const { product: productData } = useAppSelector((state) => state.productId);
  const { currency } = useAppSelector((state) => state.persist);

  const categoryQuery = useFindCategoryQuery({ restaurantId });
  const dispatch = useDispatch();

  useEffect(() => {
    setValue('name', product?.name ?? '');
    setValue('description', product?.description ?? '');
    setValue('price', String(product?.price ?? ''));
    setValue('discount', String(product?.discount ?? ''));

    setValue('startDiscountAt', product?.startDiscountAt);
    setValue('finishDiscountAt', product?.finishDiscountAt);

    setValue('inStock', product?.inStock ?? false);
    setValue('highlight', product?.highlight ?? false);
    setValue('published', product?.published ?? false);

    setValue('onlyInRestaurant', product?.onlyInRestaurant ?? false);
  }, [product]);

  useEffect(() => {
    let change = false;

    if (product?.name !== productData?.name) change = true;
    if (product?.description !== productData?.description) change = true;
    if (String(product?.price ?? '') !== String(productData?.price ?? '')) change = true;
    if (String(product?.discount ?? '') !== String(productData?.discount ?? '')) change = true;

    if (product?.startDiscountAt !== productData?.startDiscountAt) change = true;
    if (product?.finishDiscountAt !== productData?.finishDiscountAt) change = true;

    if ((product?.inStock ?? false) !== (productData?.inStock ?? false)) change = true;
    if ((product?.highlight ?? false) !== (productData?.highlight ?? false)) change = true;
    if ((product?.published ?? false) !== (productData?.published ?? false)) change = true;

    if ((product?.onlyInRestaurant ?? false) !== (productData?.onlyInRestaurant ?? false))
      change = true;

    if (product?.categoryList?.length !== productData?.categoryList?.length) change = true;
    else if (
      !productData?.categoryList?.every((item) =>
        product?.categoryList?.find((value) => value.id === item.id)
      )
    )
      change = true;

    if (change) setHasUpdate(true);
    else setHasUpdate(false);
  }, [productData]);

  return (
    <form className={'flex flex-col gap-[30px] pt-4 w-full'} onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex flex-col tablet:flex-row gap-6'}>
        <div className={'flex flex-col gap-1 w-full tablet:w-[60%]'}>
          <h2 className={'font-bold'}>
            Imagens do produto <span className={'text-red'}>*</span>
          </h2>

          <p className={'text-gray-600'}>
            Escolha as melhores fotos do seu produto para chamar atenção!
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
              images={productData?.imageList ?? []}
              limit={5 - (productData?.imageList?.length ?? 0)}
              productId={product.id}
            />
          ) : null}
        </div>
      </div>

      <div className={'flex flex-col tablet:flex-row gap-6'}>
        <div className={'flex flex-col gap-1 w-full tablet:w-[60%]'}>
          <h2 className={'font-bold'}>
            Nome do produto <span className={'text-red'}>*</span>
          </h2>

          <p className={'text-gray-600'}>
            Adicione um nome para o produto que os clientes irão pesquisar
          </p>
        </div>

        <div className={'flex items-end flex-wrap gap-3 w-full'}>
          <InputController
            autoFocus
            control={control}
            label={'Nome do produto'}
            name={'name'}
            onChange={(event): void => {
              setValue('name', event.target.value, validate);
              dispatch(setProductId({ name: event.target.value }));
            }}
            placeholder={'Digite o nome do produto'}
            value={String(productData?.name ?? '')}
          />
        </div>
      </div>

      <div className={'flex flex-col tablet:flex-row gap-6'}>
        <div className={'flex flex-col gap-1 w-full tablet:w-[60%]'}>
          <h2 className={'font-bold'}>
            Preço <span className={'text-red'}>*</span>
          </h2>

          <p className={'text-gray-600'}>Defina um preço para o seu produto</p>
        </div>

        <div className={'flex items-end flex-wrap gap-3 w-full'}>
          <InputController
            StartIcon={String(productData?.price ?? '') ? currencyData[currency].symbol : null}
            control={control}
            inputMode={'decimal'}
            label={'Preço do produto'}
            name={'price'}
            onChange={(event): void => {
              setValue('price', event.target.value, validate);
              dispatch(setProductId({ price: event.target.value }));
            }}
            onFocus={(): void => {
              if (String(productData?.price ?? '') === '0') dispatch(setProductId({ price: '' }));
            }}
            placeholder={'Digite o preço do produto'}
            value={String(productData?.price ?? '')}
          />
        </div>
      </div>

      <div className={'flex flex-col tablet:flex-row gap-6'}>
        <div className={'flex flex-col justify-end gap-1 w-[60%]'}>
          <h2 className={'font-bold'}>Valor promocional</h2>

          <p className={'text-gray-600'}>
            Defina um valor promocional para o seu produto, definindo as data de início e fim
          </p>
        </div>

        <div className={'flex flex-col items-end gap-3 w-full'}>
          <InputController
            StartIcon={String(productData?.discount ?? '') ? currencyData[currency].symbol : null}
            control={control}
            inputMode={'decimal'}
            label={'Valor promocional'}
            name={'discount'}
            onChange={(event): void => {
              setValue('discount', event.target.value, validate);
              dispatch(setProductId({ discount: event.target.value }));
            }}
            onFocus={(): void => {
              if (String(productData?.discount ?? '') === '0')
                dispatch(setProductId({ discount: '' }));
            }}
            placeholder={'Digite o Valor promocional'}
            value={String(productData?.discount ?? '')}
          />

          <div className={'flex flex-col tablet:flex-row items-end gap-3 w-full'}>
            <DateInput
              label={'Início da promoção'}
              minDate={new Date()}
              onChange={(newDate): void => {
                setValue('startDiscountAt', newDate, validate);
                dispatch(setProductId({ startDiscountAt: newDate }));
              }}
              value={productData?.startDiscountAt ?? null}
            />

            <DateInput
              label={'Fim da promoção'}
              minDate={
                productData?.startDiscountAt ? new Date(productData?.startDiscountAt) : new Date()
              }
              onChange={(newDate): void => {
                setValue('finishDiscountAt', newDate, validate);
                dispatch(setProductId({ finishDiscountAt: newDate }));
              }}
              value={productData?.finishDiscountAt ?? null}
            />
          </div>
        </div>
      </div>

      <div className={'flex flex-col tablet:flex-row gap-6'}>
        <div className={'flex flex-col gap-1 w-full tablet:w-[60%]'}>
          <h2 className={'font-bold'}>
            Visualização <span className={'text-red'}>*</span>
          </h2>

          <p className={'text-gray-600'}>Defina a visualização do produto para o seus clientes</p>
        </div>

        <div className={'flex items-end flex-wrap gap-3 w-full'}>
          <FormGroup>
            <div className={'flex gap-8 flex-wrap'}>
              <FormControlLabel
                control={
                  <Switch
                    checked={productData?.published}
                    onChange={(event): void => {
                      setValue('published', event.target.checked, validate);
                      dispatch(setProductId({ published: event.target.checked }));
                    }}
                  />
                }
                label={'Publicado'}
                labelPlacement={'top'}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={productData?.inStock}
                    onChange={(event): void => {
                      setValue('inStock', event.target.checked, validate);
                      dispatch(setProductId({ inStock: event.target.checked }));
                    }}
                  />
                }
                label={'Em estoque'}
                labelPlacement={'top'}
              />

              <FormControlLabel
                control={
                  <div
                    className={'text-gray-600'}
                    onClick={(): void => {
                      setValue('highlight', !productData?.highlight, validate);
                      dispatch(setProductId({ highlight: !productData?.highlight }));
                    }}
                  >
                    {productData?.highlight ? (
                      <Star sx={{ color: colors.yellow }} />
                    ) : (
                      <StarOutline />
                    )}
                  </div>
                }
                label={'Destaque'}
                labelPlacement={'top'}
              />
            </div>
          </FormGroup>
        </div>
      </div>

      <div className={'flex flex-col tablet:flex-row gap-6'}>
        <div className={'flex flex-col gap-1 w-full tablet:w-[60%]'}>
          <h2 className={'font-bold'}>
            Descrição <span className={'text-red'}>*</span>
          </h2>

          <p className={'text-gray-600'}>
            Uma descrição detalhada traz riqueza para as qualidades únicas do seu produto
          </p>
        </div>

        <div className={'flex items-end flex-wrap gap-3 w-full'}>
          <InputController
            control={control}
            label={'Descrição do produto'}
            maxRows={4}
            minRows={4}
            multiline
            name={'description'}
            onChange={(event): void => {
              setValue('description', event.target.value, validate);
              dispatch(setProductId({ description: event.target.value }));
            }}
            placeholder={'Digite a descrição do produto'}
            value={String(productData?.description ?? '')}
          />
        </div>
      </div>

      <div className={'flex flex-col tablet:flex-row gap-6'}>
        <div className={'flex flex-col gap-2 w-full tablet:w-[60%]'}>
          <div className={'flex flex-wrap justify-between items-center'}>
            <h2 className={'font-bold'}>
              Categorias <span className={'text-red'}>*</span>
            </h2>
          </div>

          <p className={'text-gray-600'}>
            As categorias dos produtos ajudam o cliente à encontrar seus produtos
          </p>
        </div>

        <div className={'flex flex-wrap items-center gap-2 w-full'}>
          {categoryQuery?.data?.content?.map((category) => {
            const hasData = productData?.categoryList?.find((value) => value.id === category.id);

            return (
              <div
                key={category.id}
                className={`p-1 px-4 max-h-min rounded cursor-pointer border ${hasData ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={(): void => {
                  dispatch(
                    setProductId({
                      categoryList: hasData
                        ? productData?.categoryList?.filter((value) => value.id !== category.id)
                        : [...(productData?.categoryList ?? []), category]
                    })
                  );
                }}
              >
                {category.name}
              </div>
            );
          })}

          <CategoryModal
            openElement={
              <Button startIcon={<Add />} sx={{ padding: '2px 12px' }} variant={'outlined'}>
                Nova categoria
              </Button>
            }
          />
        </div>
      </div>

      <div className={'flex flex-col tablet:flex-row gap-6'}>
        <div className={'flex flex-col gap-1 w-full tablet:w-[60%]'}>
          <h2 className={'font-bold'}>
            Tipo de venda <span className={'text-red'}>*</span>
          </h2>

          <p className={'text-gray-600'}>
            Defina onde o seu produto poderá ser vendido. Caso a opção não for habilitada o produto
            também será vendido no Delivery.
          </p>
        </div>

        <div className={'flex gap-3 w-full'}>
          <FormGroup>
            <div className={'flex gap-8 flex-wrap'}>
              <FormControlLabel
                control={
                  <Switch
                    checked={productData?.onlyInRestaurant}
                    onChange={(event): void => {
                      setValue('onlyInRestaurant', event.target.checked, validate);
                      dispatch(setProductId({ onlyInRestaurant: event.target.checked }));
                    }}
                  />
                }
                label={'Somente restaurante'}
                labelPlacement={'top'}
                sx={{ alignItems: 'flex-start' }}
              />
            </div>
          </FormGroup>
        </div>
      </div>

      <button className={'hidden'} id={'GENERAL-submit'} type={'submit'}>
        send
      </button>
    </form>
  );
};
