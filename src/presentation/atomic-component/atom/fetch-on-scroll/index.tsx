import { LoadMoreButton } from 'presentation/atomic-component/atom/load-more-button';
import type { FC, ReactNode } from 'react';
import type { useInfiniteScrollReturnProps } from 'data/hooks';

interface FetchOnScrollProps {
  query: useInfiniteScrollReturnProps;
  children: ReactNode;
  className?: string;
}

export const FetchOnScroll: FC<FetchOnScrollProps> = ({
  query: { isFetchingNextPage, hasNextPage, fetchNextPage, error, isFetching },
  children,
  className
}) => {
  return (
    <div className={className}>
      {children}

      {error || isFetching ? null : (
        <LoadMoreButton
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
};
