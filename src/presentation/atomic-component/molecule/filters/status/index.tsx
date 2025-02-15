import { Select, type SelectValues } from 'presentation/atomic-component/atom/select';
import { selectMock } from 'main/mock';
import type { FC } from 'react';

interface StatusFilterProps {
  onChange: (newValue: SelectValues[]) => void;
  value: SelectValues[];
  maxWidth: number | string;
}

export const StatusFilter: FC<StatusFilterProps> = ({ onChange, value, maxWidth }) => {
  return (
    <Select
      id={'status-filter'}
      isMultiple
      label={'Status'}
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
