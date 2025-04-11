/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/sort-prop-types */
import { boolean, number, object, string } from 'yup';
import type { InferType } from 'yup';

export const restaurantSchema = object().shape({
  name: string().required().max(255),
  phone: string().required().max(25),
  restaurantUrl: string().required().max(255),
  hasDelivery: boolean().required().default(false),
  minimumOrderPrice: number().required(),
  contactLink: string(),
  maxDeliveryDistanceInKm: number(),
  minimumDeliveryPrice: number(),
  priceByKmInDelivery: number()
});

export type RestaurantRequest = InferType<typeof restaurantSchema>;
