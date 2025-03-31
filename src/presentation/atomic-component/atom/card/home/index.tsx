import { ImageOutlined } from '@mui/icons-material';
import { Link, type To } from 'react-router-dom';
import type { FC, ReactNode } from 'react';

interface HomeCardProps {
  title: ReactNode | string;
  image?: string;
  to: To;
  onClick?: () => void;
}

export const HomeCard: FC<HomeCardProps> = ({ title, image, to, onClick }) => {
  return (
    <Link
      className={'flex items-end h-[280px] tablet:w-[30%] laptop:w-[22%] w-full'}
      onClick={onClick}
      to={to}
    >
      <div
        className={
          'flex flex-col w-full h-[265px] hover:border-2 transition-[margin] duration-300 hover:mb-[15px] hover:bg-primary/5 cursor-pointer gap-3 items-center justify-center border border-input-border-2 rounded'
        }
      >
        {typeof image === 'string' ? (
          <img alt={'Imagem Gestão de Ciclo de Vida'} src={image} />
        ) : (
          <ImageOutlined sx={{ fontSize: 70 }} />
        )}

        <h3 className={'text-xl text-center text-primary'}>{title}</h3>
      </div>
    </Link>
  );
};
