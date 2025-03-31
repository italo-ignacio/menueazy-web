/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'presentation/style/tailwind.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'react-toastify/dist/ReactToastify.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { type FC, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { colors } from 'presentation/style';
import { dimensions } from './config';
import { ptBR } from 'date-fns/locale';
import { queryClient } from 'infra/lib';
import { useTheme, useWindowDimensions } from 'data/hooks';
import Router from './routes';

const App: FC = () => {
  const { width } = useWindowDimensions();
  const theme = useTheme();

  useEffect(() => {
    const body = document.getElementById('body');

    if (body) {
      body.setAttribute('data-mode', theme);
      if (theme === 'dark') {
        body.style.background = colors.gray[900];
        body.style.color = colors.white;
      } else {
        body.style.background = colors.white;
        body.style.color = colors.black;
      }
    }
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider adapterLocale={ptBR} dateAdapter={AdapterDateFns}>
        <Router />
      </LocalizationProvider>

      <ToastContainer
        autoClose={3000}
        closeOnClick
        draggable
        hideProgressBar={false}
        limit={4}
        pauseOnHover
        position={width >= dimensions.laptop ? 'bottom-right' : 'top-right'}
        style={{
          padding: '12px'
        }}
        theme={theme}
      />
    </QueryClientProvider>
  );
};

export default App;
