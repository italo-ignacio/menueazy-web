export type QueryList =
  | 'category'
  | 'default'
  | 'ingredient'
  | 'ingredientData'
  | 'product'
  | 'restaurant'
  | 'user';

export enum QueryName {
  default = 'default',
  user = 'user',
  category = 'category',
  ingredient = 'ingredient',
  ingredientData = 'ingredientData',
  product = 'product',
  restaurant = 'restaurant'
}
