import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ChState {
  cCh: string[];
  rCh: string[];
}

const initialState: ChState = {
  cCh: [],
  rCh: []
};

const ChSlice = createSlice({
  initialState,
  name: 'firstAccess',
  reducers: {
    addCompanyChecked(state: ChState, action: PayloadAction<string>) {
      state.cCh = [...state.cCh, action.payload];
    },
    addRestaurantChecked(state: ChState, action: PayloadAction<string>) {
      state.rCh = [...state.rCh, action.payload];
    }
  }
});

export default ChSlice.reducer;

export const {
  reducer: cHReducer,
  actions: { addCompanyChecked, addRestaurantChecked }
} = ChSlice;
