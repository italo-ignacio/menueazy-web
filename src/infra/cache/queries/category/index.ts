import { apiPaths } from 'main/config';
import { useFindQuery } from 'infra/cache/queries/default-query';
import type { Category } from 'domain/models';
import type { UseQueryResult } from 'react-query';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';

export const useFindCategoryQuery = ({
  restaurantId,
  ...props
}: useFindQueryProps & { restaurantId: number }): UseQueryResult<Category[]> =>
  useFindQuery<Category[]>({
    ...props,
    apiRoute: apiPaths.category(restaurantId),
    route: 'category'
  });

export const useFindOneCategoryQuery = ({
  restaurantId,
  id,
  ...props
}: useFindQueryProps & { id: string; restaurantId: number }): UseQueryResult<Category> =>
  useFindQuery<Category>({
    ...props,
    apiRoute: apiPaths.category(restaurantId),
    id,
    route: 'category'
  });
