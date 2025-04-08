import { date, object, string } from 'yup';
import type { InferType } from 'yup';

export const ingredientDataSchema = object().shape({
  entryQuantity: string().nullable(),
  expiresAt: date().nullable(),
  quantity: string().required(),
  unitPrice: string().required()
});

export type IngredientDataRequest = InferType<typeof ingredientDataSchema>;
