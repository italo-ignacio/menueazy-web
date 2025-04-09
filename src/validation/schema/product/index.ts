/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/sort-prop-types */
import { array, boolean, date, number, object, string } from 'yup';
import type { InferType } from 'yup';

export const productGeneralSchema = object().shape({
  name: string().required().max(255),
  description: string(),
  price: string().required(),
  inStock: boolean().required(),
  published: boolean().required(),
  highlight: boolean().required(),
  discount: string(),
  startDiscountAt: date().nullable(),
  finishDiscountAt: date().nullable(),
  onlyInRestaurant: boolean(),
  priceByKmInDelivery: string(),
  categoryList: array().of(number())
});

export type ProductGeneralRequest = InferType<typeof productGeneralSchema>;

export const productAdditionalSchema = object().shape({
  productOptionGroupList: array().of(
    object().shape({
      id: number().required(),
      name: string().required().max(255),
      description: string(),
      minSelection: number().required(),
      maxSelection: number().required(),
      required: boolean().required(),
      productOptionItemList: array().of(
        object().shape({
          id: number().required(),
          name: string().required().max(255),
          description: string(),
          imageUrl: string(),
          additionalPrice: string()
        })
      )
    })
  )
});

export type ProductAdditionalRequest = InferType<typeof productAdditionalSchema>;

export const productIngredientSchema = object().shape({
  quantity: string().required(),
  additionalPrice: string(),
  canAdd: boolean().required(),
  canRemove: boolean().required(),
  maxAddQuantity: number().required()
});

export type ProductIngredientRequest = InferType<typeof productIngredientSchema>;
