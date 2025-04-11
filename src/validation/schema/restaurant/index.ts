import { object, string } from 'yup';
import type { InferType } from 'yup';

export const categorySchema = object().shape({
  description: string(),
  name: string().required().max(100)
});

export type CategoryRequest = InferType<typeof categorySchema>;
