/* eslint-disable sort-keys-fix/sort-keys-fix */
import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { callToast, resolverError, toNumber } from 'main/utils';
import { productGeneralSchema } from 'validation/schema';
import { useAppSelector } from 'store';
import { useForm } from 'react-hook-form';
import { useRestaurant } from 'data/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import type { Product } from 'domain/models';
import type { ProductGeneralRequest } from 'validation/schema';
import type { SubmitHandler } from 'react-hook-form';
import type { formReturn } from 'domain/protocol';

interface useProductIdGeneralProps {
  product: Product;
}

export const useProductIdGeneral = ({
  product
}: useProductIdGeneralProps): formReturn<ProductGeneralRequest> => {
  const formData = useForm<ProductGeneralRequest>({
    resolver: yupResolver(productGeneralSchema)
  });

  const { restaurantId } = useRestaurant();

  const { product: productData } = useAppSelector((state) => state.productId);

  const onSubmit: SubmitHandler<ProductGeneralRequest> = async () => {
    try {
      const categoryList = productData?.categoryList?.map((item) => item.id);

      if (!categoryList || categoryList.length === 0) {
        callToast.error('Selecione pelo menos 1 categoria');
        return;
      }

      const body = {
        categoryList: productData?.categoryList ?? [],
        name: productData?.name,
        description: productData?.description,
        price: toNumber(productData?.price),
        inStock: productData?.inStock,
        published: productData?.published,
        highlight: productData?.highlight,
        discount: toNumber(productData?.discount),
        startDiscountAt: productData?.startDiscountAt,
        finishDiscountAt: productData?.finishDiscountAt,
        onlyInRestaurant: productData?.onlyInRestaurant,
        priceByKmInDelivery: toNumber(productData?.priceByKmInDelivery)
      };

      await api.put({
        body,
        id: product.id,
        route: apiPaths.product(restaurantId)
      });

      callToast.success('Produto atualizado com sucesso');
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
