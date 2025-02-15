import { Link } from 'react-router-dom';
import { LogoSenai } from 'main/assets';
import { ToggleMenu } from 'presentation/atomic-component/atom';
import { paths } from 'main/config';
import type { FC } from 'react';

export const PrivateHeader: FC = () => {
  return (
    <header
      className={
        'laptop:hidden flex justify-between items-center p-4 border-b z-40 bg-white border-gray-125 sticky top-0 h-[73px]'
      }
    >
      <Link to={paths.home}>
        <img alt={'Logo SENAI'} src={LogoSenai} width={'101px'} />
      </Link>

      <div className={'flex flex-col items-center justify-center'}>
        <ToggleMenu />
      </div>
    </header>
  );
};
