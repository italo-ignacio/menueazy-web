import { Button } from '@mui/material';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { useModal } from 'data/hooks';
import { useTranslation } from 'react-i18next';
import type { FC, ReactNode } from 'react';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { SvgIconTypeMap } from '@mui/material';
import type { useModalProps } from 'data/hooks';

interface ActionModalProps {
  button?: {
    title?: string;
    StartIcon?: OverridableComponent<SvgIconTypeMap>;
    EndIcon?: OverridableComponent<SvgIconTypeMap>;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
  };
  type: 'error' | 'success';
  openElement?: ReactNode;
  confirmAction?: () => Promise<void> | void;
  title: ReactNode | string;
  subtitle?: ReactNode | string;
  confirmText?: string;
  disableBackdrop?: boolean;
  modal?: useModalProps;
}

export const ActionModal: FC<ActionModalProps> = ({
  button,
  title,
  subtitle,
  confirmAction,
  disableBackdrop,
  modal,
  type,
  confirmText,
  openElement
}) => {
  const { closeModal, isOpen, openModal } = useModal();
  const getButtonType = (): 'error' | 'primary' => {
    if (type === 'success') return 'primary';
    return 'error';
  };

  const { t } = useTranslation('common');

  return (
    <Modal
      button={button}
      closeModal={modal?.closeModal ?? closeModal}
      disableBackdrop={disableBackdrop}
      isOpen={modal?.isOpen ?? isOpen}
      openModal={modal?.openModal ?? openModal}
      openModalElement={openElement}
      size={'small'}
    >
      <div className={'flex flex-col gap-6 items-center bg-white px-8'}>
        <div className={'flex flex-col gap-4 text-center'}>
          <h2 className={'text-2xl font-bold'}>{title}</h2>
          {subtitle ? <p className={'text-base'}>{subtitle}</p> : null}
        </div>

        <div
          className={
            'flex flex-col tablet:flex-row gap-4 w-full justify-center tablet:items-center mt-4'
          }
        >
          <Button
            className={'flex-grow'}
            onClick={modal?.closeModal ?? closeModal}
            type={'button'}
            variant={'outlined'}
          >
            {t('cancel')}
          </Button>

          <Button
            autoFocus
            className={'flex-grow'}
            color={getButtonType()}
            onClick={(): void => {
              if (confirmAction) confirmAction();

              if (modal?.closeModal) modal?.closeModal();
              else closeModal();
            }}
            sx={{
              padding: type === 'error' ? '8px' : undefined
            }}
            type={'button'}
          >
            {confirmText ?? t('tryAgain')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
