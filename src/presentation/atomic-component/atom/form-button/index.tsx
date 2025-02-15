import { Button, CircularProgress } from '@mui/material';
import type { FC } from 'react';

interface FormButtonProps {
  label: string;
  loadingText?: string;
  isSubmitting: boolean;
  disabled?: boolean;
  color?: 'primary' | 'secondary';
  id?: string;
}

export const FormButton: FC<FormButtonProps> = ({
  isSubmitting,
  loadingText,
  color,
  disabled,
  label,
  id
}) => (
  <Button
    className={'w-full flex gap-2'}
    color={color}
    disabled={disabled}
    id={id ?? 'form-button'}
    type={isSubmitting ? 'button' : 'submit'}
    variant={'contained'}
  >
    {isSubmitting ? (
      <span className={'h-[20px]'}>
        <CircularProgress size={20} thickness={5} />
      </span>
    ) : null}

    {isSubmitting ? <span>{loadingText ?? 'Carregando'}</span> : <span>{label}</span>}
  </Button>
);
