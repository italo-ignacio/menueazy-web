import { Link } from 'react-router-dom';
import { MainDiv } from 'presentation/atomic-component/atom';
import { paths } from 'main/config';
import type { FC } from 'react';

export const CompanyAdminContent: FC = () => {
  return (
    <MainDiv title={'Controle de Usuários'}>
      <div className={'flex flex-col border border-input-border-2 rounded'}>Company Admin</div>
      <Link to={paths.companyUrl('menu-eazy')}>sasa</Link>
    </MainDiv>
  );
};
