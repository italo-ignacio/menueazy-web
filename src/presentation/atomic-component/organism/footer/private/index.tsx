import type { FC } from 'react';

export const PrivateFooter: FC = () => {
  return (
    <footer
      className={'flex text-gray-500 text-sm text-center justify-center items-center h-[46px]'}
    >
      Menu Eazy - {new Date().getFullYear()} © Todos os Direitos Reservados
    </footer>
  );
};
