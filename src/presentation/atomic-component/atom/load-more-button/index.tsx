import { Button } from '@mui/material';
import { useCallback, useEffect, useRef } from 'react';
import type { FC } from 'react';
import type { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query';

interface LoadMoreButtonProps {
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}

export const LoadMoreButton: FC<LoadMoreButtonProps> = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
}) => {
  const buttonRef = useRef(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.isIntersecting && fetchNextPage && hasNextPage && !isFetchingNextPage)
        fetchNextPage();
    },
    [fetchNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '-80px',
      threshold: 0.1
    });

    if (buttonRef.current) observer.observe(buttonRef.current);

    return () => {
      if (buttonRef.current) observer.unobserve(buttonRef.current);
    };
  }, [buttonRef, handleIntersection]);

  if (hasNextPage)
    return (
      <div className={'flex justify-center mt-3'}>
        <Button
          onClick={(): void => {
            if (fetchNextPage && hasNextPage && !isFetchingNextPage) fetchNextPage();
          }}
          ref={buttonRef}
        >
          Buscar mais
        </Button>
      </div>
    );

  return (
    <div className={'flex justify-center mt-3'}>
      <div className={'h-10'} />
    </div>
  );
};
