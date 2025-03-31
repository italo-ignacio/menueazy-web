import { Link, type To } from 'react-router-dom';
import type { FC, HTMLAttributes, ReactNode } from 'react';

type HeadingProps = HTMLAttributes<HTMLDivElement> & {
  bg: 'black' | 'primary';
  link?: To;
  children?: ReactNode;
};

export const AnimatedBg: FC<HeadingProps> = ({ children, className, style, bg, link, ...rest }) => {
  const getClassName = (): string => {
    if (bg === 'black')
      return 'hover:bg-gray-150 dark:border-gray-700 dark:bg-[linear-gradient(90deg,#191A1B_19%,#363637_50%,#5D5D5D_79%)]';

    return 'bg-[linear-gradient(90deg,#7342d4_0%,#C8BAE4_57%,#a285db_88%)]';
  };

  if (link)
    <Link to={link}>
      <div
        className={`hover:animate-rotate cursor-pointer ${getClassName()} ${className}`}
        style={{ backgroundSize: '130% 130%', ...(style ?? {}) }}
        {...rest}
      >
        {children}
      </div>
    </Link>;

  return (
    <div
      className={`hover:animate-rotate cursor-pointer ${getClassName()} ${className}`}
      style={{ backgroundSize: '130% 130%', ...(style ?? {}) }}
      {...rest}
    >
      {children}
    </div>
  );
};
