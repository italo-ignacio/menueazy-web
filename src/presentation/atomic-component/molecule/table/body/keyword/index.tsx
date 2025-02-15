import { BodyCell } from 'presentation/atomic-component/atom';
import { TableBody, TableRow } from '@mui/material';
import type { FC } from 'react';

interface KeywordTableBodyProps {
  query: { content: { id: string }[] };
}

export const KeywordTableBody: FC<KeywordTableBodyProps> = ({ query }) => {
  return (
    <TableBody className={'relative'}>
      {query?.content?.map((item) => (
        <TableRow key={item.id} className={'cursor-pointer'} hover>
          <BodyCell title={item.id} />
          <BodyCell title={item.id} />
        </TableRow>
      ))}
    </TableBody>
  );
};
