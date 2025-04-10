import { apiPaths } from 'main/config';
import { useFindQuery } from 'infra/cache/queries/default-query';
import type { FindProductQuery, Product } from 'domain/models';
import type { UseQueryResult } from 'react-query';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';

export const useFindProductQuery = ({
  restaurantId,
  ...props
}: useFindQueryProps & { restaurantId: number }): UseQueryResult<FindProductQuery> =>
  useFindQuery<FindProductQuery>({
    ...props,
    apiRoute: apiPaths.product(restaurantId),
    route: 'product'
  });

export const useFindOneProductQuery = ({
  restaurantId,
  id,
  ...props
}: useFindQueryProps & { id: string; restaurantId: number }): UseQueryResult<Product> =>
  useFindQuery<Product>({
    ...props,
    apiRoute: apiPaths.product(restaurantId),
    id,
    retry: 0,
    route: 'product'
  });
