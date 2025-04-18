import { QueryName, apiPaths } from 'main/config';
import { api } from 'infra/http';
import { useQuery } from 'react-query';
import type { QueryList } from 'main/config';
import type { UseQueryResult } from 'react-query';

export interface useFindQueryProps {
  page?: number;
  limit?: number;
  params?: object;
  apiRoute?: string;
  retry?: number;
  hideId?: number;
  id?: string;
}

interface queryProps extends useFindQueryProps {
  route?: QueryList;
}

export const useFindQuery = <T>({
  page,
  params,
  apiRoute,
  id,
  hideId,
  retry,
  limit,
  route
}: queryProps): UseQueryResult<T> =>
  useQuery(
    [QueryName[route ?? 'default'], id, limit, page, Object.values(params ?? {})],
    () =>
      api.get({
        id: hideId ? undefined : id,
        queryParams: { limit, page, ...params },
        route: apiRoute ?? apiPaths[route ?? 'default']
      }),
    { initialData: { content: [], firstLoading: true }, retry }
  );
