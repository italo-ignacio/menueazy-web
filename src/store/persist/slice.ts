import { LANGUAGE_STORAGE_KEY } from 'i18n';
import { createSlice } from '@reduxjs/toolkit';
import type { Client, CurrencyCode, LoginPayload, User } from 'domain/models';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PersistState {
  user: User | null;
  client: Client | null;
  accessToken: string | null;
  isLoading: boolean;
  theme: 'dark' | 'light';
  currency: CurrencyCode;
  redirectPath: string | null;
}

const getStartCurrency = (): CurrencyCode => {
  const lang = localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (lang?.startsWith('es')) return 'EUR';
  if (lang?.startsWith('pt')) return 'BRL';
  return 'USD';
};

const initialState: PersistState = {
  accessToken: null,
  client: null,
  currency: getStartCurrency(),
  isLoading: false,
  redirectPath: null,
  theme: 'dark',
  user: null
};

const persistSlice = createSlice({
  initialState,
  name: 'persist',
  reducers: {
    logout(state: PersistState) {
      state.user = null;
      state.client = null;
      state.accessToken = null;
    },
    setAuth(state: PersistState, action: PayloadAction<LoginPayload>) {
      state.user = action.payload.user;
      state.client = action.payload.client;
      state.accessToken = action.payload.accessToken;
    },
    setClient(state: PersistState, action: PayloadAction<Client>) {
      state.client = action.payload;
    },
    setCurrency(state: PersistState, action: PayloadAction<CurrencyCode>) {
      state.currency = action.payload;
    },
    setIsLoading(state: PersistState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setRedirectPath(state: PersistState, action: PayloadAction<string | null>) {
      state.redirectPath = action.payload;
    },
    setTheme(state: PersistState, action: PayloadAction<'dark' | 'light'>) {
      state.theme = action.payload;
    },
    setUser(state: PersistState, action: PayloadAction<User>) {
      state.user = action.payload;
    }
  }
});

export const {
  reducer: persistReducer,
  actions: {
    setAuth,
    logout,
    setUser,
    setClient,
    setCurrency,
    setTheme,
    setIsLoading,
    setRedirectPath
  }
} = persistSlice;
