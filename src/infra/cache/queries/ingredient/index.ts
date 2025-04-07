import { apiPaths } from 'main/config';
import { useFindQuery } from 'infra/cache/queries/default-query';
import type { FindIngredientQuery, Ingredient } from 'domain/models';
import type { UseQueryResult } from 'react-query';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';

export const useFindIngredientQuery = ({
  restaurantId,
  ...props
}: useFindQueryProps & { restaurantId: number }): UseQueryResult<FindIngredientQuery> =>
  useFindQuery<FindIngredientQuery>({
    ...props,
    apiRoute: apiPaths.ingredient(restaurantId),
    route: 'ingredient'
  });

export const useFindOneIngredientQuery = ({
  restaurantId,
  id,
  ...props
}: useFindQueryProps & { id: string; restaurantId: number }): UseQueryResult<Ingredient> =>
  useFindQuery<Ingredient>({
    ...props,
    apiRoute: apiPaths.ingredient(restaurantId),
    id,
    route: 'ingredient'
  });
