import { Skeleton } from '@mui/material';
import type { FC } from 'react';

export const AuthorPageSkeleton: FC = () => (
  <div>
    <div className={'flex flex-col laptop:flex-row gap-4'}>
      <div
        className={
          'flex flex-col tablet:items-center shadow-md p-4 laptop:w-[35%] laptop:py-10 rounded-xl'
        }
      >
        <div className={'flex flex-col justify-evenly gap-4 w-[60%]'}>
          <div className={'flex flex-col items-center'}>
            <Skeleton
              sx={{
                height: '160px',
                width: '160px'
              }}
              variant={'circular'}
            />
          </div>

          <h2 className={'text-primary font-bold text-lg'}>
            <Skeleton height={35} width={'100%'} />
          </h2>

          <div className={'flex flex-col gap-2'}>
            <span className={'font-bold text-lg'}>
              <Skeleton height={35} width={'60%'} />
            </span>

            <span className={'text-lg'}>
              <Skeleton height={50} width={'80%'} />
            </span>
          </div>

          <div className={'flex flex-col gap-2'}>
            <span className={'font-bold text-lg'}>
              <Skeleton height={35} width={'60%'} />
            </span>

            <span className={'text-lg'}>
              <Skeleton height={35} width={'80%'} />
            </span>
          </div>

          <div className={'flex flex-col gap-2'}>
            <span className={'font-bold text-lg'}>
              <Skeleton height={35} width={'60%'} />
            </span>

            <span className={'text-lg'}>
              <Skeleton height={50} width={'80%'} />
            </span>
          </div>

          <div className={'flex flex-col gap-2'}>
            <span className={'font-bold text-lg'}>
              <Skeleton height={35} width={'60%'} />
            </span>

            <span className={'text-lg'}>
              <Skeleton height={50} width={'80%'} />
            </span>
          </div>
        </div>
      </div>

      <div
        className={
          'flex flex-col shadow-md p-4 laptop:w-[65%] laptop:px-10 laptop:py-10 rounded-xl'
        }
      >
        <div className={'flex flex-col justify-evenly gap-4'}>
          <div className={'flex flex-col gap-2'}>
            <span>
              <Skeleton height={35} width={'60%'} />
            </span>

            <span className={'text-lg'}>
              <Skeleton width={'30%'} />
              <Skeleton width={'40%'} />
              <Skeleton width={'50%'} />
            </span>
          </div>

          <div className={'flex flex-col gap-2'}>
            <span>
              <Skeleton height={35} width={'60%'} />
            </span>

            <span className={'text-lg'}>
              <Skeleton height={35} width={'30%'} />
              <Skeleton height={35} width={'40%'} />
              <Skeleton height={35} width={'50%'} />
            </span>
          </div>

          <div className={'flex flex-col gap-2'}>
            <span>
              <Skeleton height={35} width={'60%'} />
            </span>

            <span>
              <Skeleton height={35} width={'30%'} />
              <Skeleton height={35} width={'40%'} />
              <Skeleton height={35} width={'50%'} />
            </span>
          </div>

          <div className={'flex flex-col gap-2'}>
            <span>
              <Skeleton height={35} width={'60%'} />
            </span>

            <span className={'mt-[-30px]'}>
              <Skeleton height={250} width={'70%'} />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
