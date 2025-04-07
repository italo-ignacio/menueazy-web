import { IngredientMeasure } from 'domain/enums';
import { boolean, mixed, number, object, string } from 'yup';
import type { InferType } from 'yup';

export const ingredientSchema = object().shape({
  image: mixed(),
  measure: mixed().oneOf(Object.values(IngredientMeasure)).required(),
  minAlert: number(),
  name: string().required().max(255),
  removeImage: boolean().default(false)
});

export type IngredientRequest = InferType<typeof ingredientSchema>;
