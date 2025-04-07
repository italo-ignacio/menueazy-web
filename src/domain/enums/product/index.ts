import { t } from 'i18next';
import type { SelectValues } from 'presentation/atomic-component/atom/select';

export enum ProductStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  FINISHED = 'FINISHED',
  CANCELED_BY_RESTAURANT = 'CANCELED_BY_RESTAURANT',
  CANCELED_BY_CLIENT = 'CANCELED_BY_CLIENT'
}

export enum IngredientMeasure {
  GRAM = 'GRAM',
  KILOGRAM = 'KILOGRAM',
  MILLILITER = 'MILLILITER',
  LITER = 'LITER',
  UNIT = 'UNIT'
}

export const getIngredientMeasureSelectValue = {
  [IngredientMeasure.GRAM]: { label: t('grams', { ns: 'common' }), value: IngredientMeasure.GRAM },
  [IngredientMeasure.UNIT]: { label: t('UNIT', { ns: 'common' }), value: IngredientMeasure.UNIT },
  [IngredientMeasure.KILOGRAM]: {
    label: t('kilograms', { ns: 'common' }),
    value: IngredientMeasure.KILOGRAM
  },
  [IngredientMeasure.MILLILITER]: {
    label: t('milliliters', { ns: 'common' }),
    value: IngredientMeasure.MILLILITER
  },
  [IngredientMeasure.LITER]: {
    label: t('liters', { ns: 'common' }),
    value: IngredientMeasure.LITER
  }
};

export const IngredientMeasureSelectValues: SelectValues[] = [
  { label: t('grams', { ns: 'common' }), value: IngredientMeasure.GRAM },
  { label: t('kilograms', { ns: 'common' }), value: IngredientMeasure.KILOGRAM },
  { label: t('milliliters', { ns: 'common' }), value: IngredientMeasure.MILLILITER },
  { label: t('liters', { ns: 'common' }), value: IngredientMeasure.LITER },
  { label: t('UNIT', { ns: 'common' }), value: IngredientMeasure.UNIT }
];

export enum IngredientMovementType {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
  ADJUST = 'ADJUST'
}
