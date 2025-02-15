import { Role } from 'domain/enums';
import { array, mixed, number, object, string } from 'yup';
import type { InferType } from 'yup';

export const userSchema = object().shape({
  email: string().email().required(),
  name: string().required(),
  role: mixed<Role>().oneOf(Object.values(Role)).required(),
  systems: array().of(number().required()).min(1).required(),
  units: array().of(number().required()).min(1).required()
});

export type UserRequest = InferType<typeof userSchema>;
