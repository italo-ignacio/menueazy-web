import { HeaderCell } from 'presentation/atomic-component/atom';
import { TableFilter } from 'presentation/atomic-component/atom/table-filter';
import { TableHead, TableRow } from '@mui/material';
import { setFilter, setSortFilter } from 'main/utils';
import { useAppSelector } from 'store';
import type { FC } from 'react';

export const UserTableHeader: FC = () => {
  const { user } = useAppSelector((state) => state.filter);

  return (
    <TableHead>
      <TableRow>
        <HeaderCell
          minWidth={200}
          title={
            <TableFilter
              filterName={'name'}
              filterValue={user.name}
              onChange={(name) => setFilter('user', { name })}
              sortItem={setSortFilter('user', 'name')}
              title={'NOME'}
            />
          }
          width={200}
        />

        <HeaderCell
          minWidth={300}
          title={
            <TableFilter
              filterName={'email'}
              filterValue={user.email}
              onChange={(email) => setFilter('user', { email })}
              sortItem={setSortFilter('user', 'email')}
              title={'E-MAIL'}
            />
          }
          width={300}
        />

        <HeaderCell minWidth={180} title={'UNIDADE'} width={180} />
        <HeaderCell minWidth={180} title={'PERMISSÃO'} width={180} />
        <HeaderCell align={'center'} minWidth={120} title={'AÇÕES'} width={120} />
      </TableRow>
    </TableHead>
  );
};
