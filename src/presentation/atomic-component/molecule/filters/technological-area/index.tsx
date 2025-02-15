import { Select, type SelectValues } from 'presentation/atomic-component/atom/select';
import { selectMock } from 'main/mock';
import type { FC } from 'react';

interface TechnologicalAreaFilterProps {
  onChange: (newValue: SelectValues[]) => void;
  value: SelectValues[];
  maxWidth: number | string;
}

export const TechnologicalAreaFilter: FC<TechnologicalAreaFilterProps> = ({
  onChange,
  value,
  maxWidth
}) => {
  return (
    <Select
      id={'technological-area-filter'}
      isMultiple
      label={'Área Tecnológica'}
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
