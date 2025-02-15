import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ListItemButton } from '@mui/material';
import { colors } from 'presentation/style';
import { firebaseAuth } from 'infra/lib/firebase';
import { resolverError } from 'main/utils';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

export const GoogleLogin: FC = () => {
  const { t } = useTranslation('auth');

  const SingInWithGoogle = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();

      await signInWithPopup(firebaseAuth, provider);
    } catch (error) {
      resolverError(error);
    }
  };

  return (
    <ListItemButton
      onClick={SingInWithGoogle}
      sx={{
        border: `1px solid ${colors.gray[200]}`,
        borderRadius: '4px',
        gap: '16px',
        padding: '4.2px 16px',
        textTransform: 'none'
      }}
    >
      <img alt={'Google logo'} src={'/google-logo.png'} width={30} />
      <span>{t('loginWithGoogle')}</span>
    </ListItemButton>
  );
};
