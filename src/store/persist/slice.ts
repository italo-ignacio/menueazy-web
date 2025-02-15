import { LANGUAGE_STORAGE_KEY } from 'i18n';
import { createSlice } from '@reduxjs/toolkit';
import type { CurrencyCode, LoginPayload, User } from 'domain/models';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PersistState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  currency: CurrencyCode;
  redirectPath: string | null;
}

const getStartCurrency = (): CurrencyCode => {
  const lang = localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (lang?.startsWith('es')) return 'MXN';
  if (lang?.startsWith('pt')) return 'BRL';
  return 'USD';
};

const initialState: PersistState = {
  accessToken: null,
  currency: getStartCurrency(),
  isLoading: true,
  redirectPath: null,
  user: null
};

const persistSlice = createSlice({
  initialState,
  name: 'persist',
  reducers: {
    logout(state: PersistState) {
      state.user = null;
      state.accessToken = null;
    },
    setAuth(state: PersistState, action: PayloadAction<LoginPayload>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
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
    setUser(state: PersistState, action: PayloadAction<{ user: User }>) {
      state.user = action.payload.user;
    }
  }
});

export const {
  reducer: persistReducer,
  actions: { setAuth, logout, setUser, setCurrency, setIsLoading, setRedirectPath }
} = persistSlice;
