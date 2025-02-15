import { api } from 'infra/http';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import type { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query';
import type { QueryName } from 'main/config';

export interface useInfiniteScrollProps {
  route: string;
  queryName: QueryName;
  limit: number;
  retry?: number;
  refetchInterval?: number;
  filters?: object;
}

export interface useInfiniteScrollReturnProps {
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isFetching: boolean;
  error: unknown;
}

export const useInfiniteScroll = <T>({
  route,
  queryName,
  limit,
  retry,
  refetchInterval,
  filters
}: useInfiniteScrollProps): useInfiniteScrollReturnProps & { data: T[] | undefined } => {
  const [newData, setNewData] = useState<T[]>([]);
  const filter = filters ?? {};

  const fetchItems = async ({ pageParam = 1 }): Promise<unknown> =>
    api.get<unknown>({
      queryParams: { limit, page: pageParam, ...filter },
      route
    });

  const { data, fetchNextPage, hasNextPage, error, isFetchingNextPage, isFetching } =
    useInfiniteQuery([queryName, ...Object.values(filter)], fetchItems, {
      getNextPageParam(response, pages) {
        const { totalPages } = response as unknown as { totalPages: number };

        if (pages.length < totalPages) return pages.length + 1;

        return undefined;
      },
      refetchInterval,
      retry
    });

  useEffect(() => {
    const items: T[] = [];

    data?.pages?.forEach((pages) => {
      const page = pages as unknown as {
        content: T[];
      };

      page?.content?.forEach((item) => {
        items.push(item);
      });
    });

    setNewData(items);
  }, [data]);

  return {
    data: newData,
    error,
    fetchNextPage,
    hasNextPage: hasNextPage === undefined ? true : hasNextPage,
    isFetching,
    isFetchingNextPage
  };
};
