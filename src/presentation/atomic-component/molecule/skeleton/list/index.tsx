import { Skeleton } from '@mui/material';
import type { FC } from 'react';

export const SkeletonList: FC<{ quantity?: number; size?: 'normal' | 'small' }> = ({
  quantity = 1,
  size = 'normal'
}) => (
  <div className={'flex flex-col'}>
    {Array.from(Array(quantity), (_event, id) => (
      <Skeleton
        key={id}
        sx={{
          height: size === 'small' ? '100px' : '180px',
          marginTop: size === 'small' ? '-15px' : '-40px'
        }}
      />
    ))}
  </div>
);
