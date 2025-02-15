import { Select, type SelectValues } from 'presentation/atomic-component/atom/select';
import { selectMock } from 'main/mock';
import type { FC } from 'react';

interface UFFilterProps {
  onChange: (newValue: SelectValues[]) => void;
  value: SelectValues[];
  maxWidth: number | string;
}

export const UFFilter: FC<UFFilterProps> = ({ onChange, value, maxWidth }) => {
  return (
    <Select
      id={'uf-filter'}
      isMultiple
      label={'UF'}
      onChange={(event) => {
        const newValue = event as SelectValues[] | null;

        onChange(newValue ?? []);
      }}
      options={selectMock}
      value={value}
      width={maxWidth}
    />
  );
};
