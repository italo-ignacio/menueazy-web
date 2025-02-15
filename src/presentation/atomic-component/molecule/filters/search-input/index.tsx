import { type FC, useState } from 'react';
import { LabelInput } from 'presentation/atomic-component/atom';
import { Search } from '@mui/icons-material';
import { useDebounce } from 'data/hooks';

interface SearchInputProps {
  onChange: (newValue: string) => void;
  value: string;
}

export const SearchInput: FC<SearchInputProps> = ({ onChange, value }) => {
  const [inputValue, setInputValue] = useState(value);

  useDebounce(() => onChange(inputValue), [inputValue], 500);

  return (
    <LabelInput
      StartIcon={<Search />}
      onChange={(event): void => setInputValue(event.target.value)}
      placeholder={'Pesquisar ...'}
      value={inputValue}
    />
  );
};
