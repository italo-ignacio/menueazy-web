import { HomeCard1, HomeCard2, HomeCard3, HomeCard4 } from 'main/assets';
import { Role } from 'domain/enums';
import { paths } from 'main/config';
import type { ReactNode } from 'react';
import type { To } from 'react-router-dom';

interface HomeList {
  image: string;
  title: ReactNode | string;
  to: To;
  onClick?: () => void;
}

export const lifeCycleHomeItem = {
  image: HomeCard1,
  title: 'Gestão de Ciclo de Vida',
  to: paths.home
};

export const availableAssetsHomeItem = {
  image: HomeCard3,
  title: (
    <>
      Banco de Ativos <br />
      em Disponibilidade
    </>
  )
};

export const ConsumablesHomeItem = {
  image: HomeCard2,
  title: 'Materiais de Consumo',
  to: paths.home
};

export const investmentManagementHomeItem = {
  image: HomeCard4,
  title: 'Gestão de Investimentos',
  to: paths.home
};

export const homeCardList = (role: Role): HomeList[] => {
  if (role === Role.UNIT) return [];
  if (role === Role.NATIONAL) return [lifeCycleHomeItem];

  return [lifeCycleHomeItem];
};

export const selectMock = [
  { label: 'Select 1', value: '1' },
  { label: 'Select 2', value: '2' },
  { label: 'Select 3', value: '3' },
  { label: 'Select 4', value: '4' },
  { label: 'Select 5', value: '5' }
];
