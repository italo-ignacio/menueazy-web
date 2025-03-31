import { Link } from 'react-router-dom';
import { Logo } from 'main/assets';
import { SettingModal } from 'presentation/atomic-component/molecule/modal';
import { ToggleMenu } from 'presentation/atomic-component/atom';
import { getUser } from 'store/persist/selector';
import { paths } from 'main/config';
import type { FC } from 'react';

export const PrivateHeader: FC = () => {
  const user = getUser();

  return (
    <header
      className={
        'laptop:hidden flex justify-between items-center p-4 border-b z-40 bg-white border-gray-125 sticky top-0 h-[73px]'
      }
    >
      <Link to={paths.companyUrl(user.company.companyUrl)}>
        <img alt={'Logo SENAI'} src={Logo} width={'101px'} />
      </Link>

      <div className={'flex gap-3'}>
        <SettingModal isOnHeader />
        <ToggleMenu />
      </div>
    </header>
  );
};
