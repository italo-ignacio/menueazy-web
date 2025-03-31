import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CRState {
  cA: { [key in string]: number };
  rA: { [key in string]: number };
}

const initialState: CRState = {
  cA: {},
  rA: {}
};

const aSlice = createSlice({
  initialState,
  name: 'a',
  reducers: {
    addCompanyChecked(state: CRState, action: PayloadAction<{ [key in string]: number }>) {
      state.cA = { ...state.cA, ...action.payload };
    },
    addRestaurantChecked(state: CRState, action: PayloadAction<{ [key in string]: number }>) {
      state.rA = { ...state.rA, ...action.payload };
    }
  }
});

export default aSlice.reducer;

export const {
  reducer: aReducer,
  actions: { addCompanyChecked, addRestaurantChecked }
} = aSlice;
