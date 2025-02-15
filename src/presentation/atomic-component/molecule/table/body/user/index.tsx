import { BodyCell } from 'presentation/atomic-component/atom';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation';
import { QueryName, apiPaths } from 'main/config';
import { TableBody, TableRow } from '@mui/material';
import { UserModal } from 'presentation/atomic-component/molecule/modal';
import type { FC } from 'react';
import type { FindUserQuery } from 'domain/models';
import type { UseQueryResult } from 'react-query';

interface UserTableBodyProps {
  query: UseQueryResult<FindUserQuery>;
}

export const UserTableBody: FC<UserTableBodyProps> = ({ query }) => {
  return (
    <TableBody className={'relative'}>
      {query?.data?.content?.map((item) => (
        <TableRow key={item.id} className={'cursor-pointer'} hover>
          <BodyCell title={item.name} />

          <BodyCell
            clamp={2}
            title={item.email?.toLowerCase()}
            width={{ large: 350, small: 300 }}
          />

          <BodyCell clamp={2} title={'Senai Jandira'} />
          <BodyCell clamp={2} title={'Gestor'} />

          <BodyCell
            align={'center'}
            title={
              <div>
                <UserModal user={item} />

                <DeleteConfirmationModal
                  id={item.id}
                  queryName={QueryName.user}
                  route={apiPaths.user}
                  successMessage={'Usuários deletado com sucesso !'}
                  text={
                    <p>
                      <span>Tem certeza que deseja</span> <strong>Remover</strong>
                      <span> o usuário</span> <strong> {item.name}</strong>
                      <span> com o email</span>
                      <strong> {item.email}</strong> ?
                    </p>
                  }
                  title={'Remover usuário'}
                />
              </div>
            }
          />
        </TableRow>
      ))}
    </TableBody>
  );
};
