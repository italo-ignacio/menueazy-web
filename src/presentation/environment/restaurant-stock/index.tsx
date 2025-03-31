import { MainDiv } from 'presentation/atomic-component/atom';
import type { FC } from 'react';

export const RestaurantStockContent: FC = () => {
  return (
    <MainDiv title={'Controle de Usuários'}>
      <div className={'flex flex-col border border-input-border-2 rounded'}>Restaurant Stock</div>
    </MainDiv>
  );
};
