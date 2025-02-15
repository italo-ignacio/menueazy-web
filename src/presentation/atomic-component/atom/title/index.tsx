import type { FC } from 'react';

interface TitleProps {
  label: string;
  className?: string;
  labelClassName?: string;
  lineWidth?: string;
  lineHeight?: string;
}

export const Title: FC<TitleProps> = ({
  label,
  className,
  labelClassName,
  lineWidth,
  lineHeight
}) => (
  <span className={`flex flex-col font-bold text-lg gap-1 w-fit ${className}`}>
    <h2 className={`w-full ${labelClassName}`}>{label}</h2>

    <span
      className={'bg-secondary'}
      style={{ height: lineHeight ?? '2px', width: lineWidth ?? '30%' }}
    />
  </span>
);
