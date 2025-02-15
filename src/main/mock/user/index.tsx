import { Role, TranslateRole } from 'domain/enums';

export const unitsMock = [
  {
    id: 1,
    name: 'SENAI Vespasiano CFP São Luiz César'
  },
  {
    id: 2,
    name: 'Escola SENAI “Mariano Ferraz”'
  }
];

export const rolesMock = [
  {
    label: TranslateRole[Role.UNIT],
    value: Role.UNIT
  },
  {
    label: TranslateRole[Role.NATIONAL],
    value: Role.NATIONAL
  },
  {
    label: TranslateRole[Role.REGIONAL],
    value: Role.REGIONAL
  }
];

export const availableAssetsSystem = {
  id: 1,
  name: 'Banco de Ativos em Disponibilidade'
};

export const lifeCycleSystem = {
  id: 2,
  name: 'Gestão de Ciclo de Vida'
};

export const userControlSystem = {
  id: 3,
  name: 'Controle de Usuários'
};

export const systemMock = [availableAssetsSystem, lifeCycleSystem, userControlSystem];
