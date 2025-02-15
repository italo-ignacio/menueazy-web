import { setSidebar } from './slice';
import { useAppSelector } from 'store';
import { useDispatch } from 'react-redux';

export const useSidebar = (): { open: boolean; setOpen: (newValue: boolean) => void } => {
  const { open } = useAppSelector((state) => state.sidebar);

  const dispatch = useDispatch();

  const setOpen = (newValue: boolean): void => {
    dispatch(setSidebar(newValue));
  };

  return { open, setOpen };
};
