import type { FC } from 'react';

export const PublicFooter: FC = () => {
  return (
    <footer
      className={
        'flex text-gray-500 text-sm text-center justify-center items-center h-[46px] mt-auto'
      }
    >
      Menu Eazy - {new Date().getFullYear()} © Todos os Direitos Reservados
    </footer>
  );
};
