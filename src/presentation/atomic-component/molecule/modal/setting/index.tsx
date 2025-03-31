import { IconButton } from '@mui/material';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { SelectLanguage } from 'presentation/atomic-component/atom';
import { Settings } from '@mui/icons-material';
import { SidebarItem } from 'presentation/atomic-component/atom/sidebar-item';
import { useModal } from 'data/hooks';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

interface SettingModalProps {
  isOnHeader?: boolean;
}

export const SettingModal: FC<SettingModalProps> = ({ isOnHeader }) => {
  const { closeModal, isOpen, openModal } = useModal();

  const { t } = useTranslation('common');

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      openModalElement={
        isOnHeader ? (
          <IconButton onClick={openModal}>
            <Settings />
          </IconButton>
        ) : (
          <SidebarItem
            active={isOpen}
            iconName={'Settings'}
            onClick={openModal}
            title={t('settings')}
          />
        )
      }
      size={'small'}
      title={
        <h2 className={'font-semibold text-2xl tablet:text-3xl capitalize'}>{t('settings')}</h2>
      }
    >
      <div className={'p-3'}>
        <SelectLanguage />
      </div>
    </Modal>
  );
};
