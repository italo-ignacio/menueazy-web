import { Select, type SelectValues } from 'presentation/atomic-component/atom/select';
import { selectMock } from 'main/mock';
import type { FC } from 'react';

interface CategoryFilterProps {
  onChange: (newValue: SelectValues[]) => void;
  value: SelectValues[];
  maxWidth: number | string;
}

export const CategoryFilter: FC<CategoryFilterProps> = ({ onChange, value, maxWidth }) => {
  return (
    <Select
      id={'category-filter'}
      isMultiple
      label={'Categoria'}
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
