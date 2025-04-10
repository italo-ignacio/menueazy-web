import { useFindQuery } from 'infra/cache/queries/default-query';
import type { FindRestaurantQuery, Restaurant } from 'domain/models';
import type { UseQueryResult } from 'react-query';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';

export const useFindRestaurantQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<FindRestaurantQuery> =>
  useFindQuery<FindRestaurantQuery>({ ...props, route: 'restaurant' });

export const useFindOneRestaurantQuery = ({
  ...props
}: useFindQueryProps & { id: string }): UseQueryResult<Restaurant> =>
  useFindQuery<Restaurant>({ ...props, retry: 0, route: 'restaurant' });
