import { Skeleton } from '@mui/material';
import type { FC } from 'react';

interface CardSkeletonProps {
  quantity: number;
}

export const CardSkeleton: FC<CardSkeletonProps> = ({ quantity }) => (
  <div className={'flex flex-wrap justify-center gap-4 '}>
    {Array.from(Array(quantity), (_event, id) => (
      <Skeleton key={id} animation={'wave'} sx={{ height: '176px', width: '190px' }} />
    ))}
  </div>
);
