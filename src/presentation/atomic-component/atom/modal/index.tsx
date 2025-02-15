import { Box, Button, IconButton, Modal as ModalUI } from '@mui/material';
import { Close } from '@mui/icons-material';
import type { FC, ReactNode } from 'react';
import type { OverridableComponent } from '@mui/types';
import type { SvgIconTypeMap } from '@mui/material';

type ModalSize = 'full' | 'large' | 'medium' | 'small';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  button?: {
    title?: string;
    StartIcon?: OverridableComponent<SvgIconTypeMap>;
    EndIcon?: OverridableComponent<SvgIconTypeMap>;
    variant?: 'primary' | 'secondary';
    color?: 'error' | 'info' | 'inherit' | 'primary' | 'secondary' | 'success' | 'warning';
    disabled?: boolean;
  };
  title?: string;
  openModalElement?: ReactNode;
  size?: ModalSize;
  disableBackdrop?: boolean;
  disableEscapeKeyDown?: boolean;
  hideBackground?: boolean;
  hideCloseButton?: boolean;
}

const sizes = {
  large: 1125,
  medium: 860,
  small: 540
};

export const getWidth = (
  size?: string | 'full' | 'large' | 'medium' | 'small'
): number | string => {
  switch (size) {
    case 'large':
      return sizes.large;
    case 'medium':
      return sizes.medium;
    case 'small':
      return sizes.small;
    case 'full':
      return 'max-content';
    default:
      if (size) return size;
      return 'max-content';
  }
};

export const Modal: FC<ModalProps> = ({ children, openModal, closeModal, ...props }) => {
  return (
    <>
      {props.button ? (
        <Button
          color={props.button.color}
          disabled={props.button.disabled}
          endIcon={props.button.EndIcon ? <props.button.EndIcon /> : null}
          onClick={openModal}
          startIcon={props.button.StartIcon ? <props.button.StartIcon /> : null}
          sx={{ minWidth: 'max-content' }}
          variant={props.button.variant}
        >
          {props.button.title}
        </Button>
      ) : (
        props.openModalElement
      )}

      <ModalUI
        disableAutoFocus
        disableEscapeKeyDown={props.disableEscapeKeyDown}
        disableRestoreFocus
        hideBackdrop={props.disableBackdrop}
        onClose={closeModal}
        open={props.isOpen}
      >
        <div>
          {props.disableBackdrop ? (
            <div
              className={'absolute overflow-hidden top-0 left-0 w-full h-screen bg-[#0000007f]'}
            />
          ) : null}

          <Box
            className={`w-full gap-2 tablet:w-auto max-h-[90%] tablet:max-h-[95%] rounded-[4px] 
              flex flex-col left-[50%] top-[50%] absolute translate-y-[-50%] translate-x-[-50%] 
              max-w-[94%] laptop:max-w-[98%] overflow-auto 
              ${props.hideBackground ? '' : 'p-6 tablet:p-8'}
              `}
            sx={{
              backgroundColor: props.hideBackground ? 'transparent' : 'white',
              width: getWidth(props.size)
            }}
          >
            {props.hideCloseButton ? null : (
              <div className={'absolute right-4 top-4'}>
                <IconButton onClick={closeModal}>
                  <Close color={'inherit'} />
                </IconButton>
              </div>
            )}

            {props.title ? (
              <div
                className={`flex items-center justify-between tablet:mt-0 ${props.hideCloseButton ? '' : 'mt-4'}`}
              >
                {typeof props.title === 'string' ? (
                  <h2 className={'font-semibold text-2xl tablet:text-3xl'}>{props.title}</h2>
                ) : (
                  props.title
                )}
              </div>
            ) : null}

            {children}
          </Box>
        </div>
      </ModalUI>
    </>
  );
};
