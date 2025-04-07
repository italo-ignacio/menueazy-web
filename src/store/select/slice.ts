import { createSlice } from '@reduxjs/toolkit';
import type { Ingredient, Product } from 'domain/models';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SelectSliceState {
  productSelected: { [key in number]: Product };
  ingredientSelected: { [key in number]: Ingredient };
}

const initialState: SelectSliceState = {
  ingredientSelected: {},
  productSelected: {}
};

export interface SelectState {
  productSelected: Product;
  ingredientSelected: Ingredient;
}

type FilterDataProps<T extends keyof SelectState> = SelectState[T];

const selectSlice = createSlice({
  initialState,
  name: 'select',
  reducers: {
    addSelectData<T extends keyof SelectSliceState>(
      state: SelectSliceState,
      action: PayloadAction<{ type: T; data: FilterDataProps<T>[] }>
    ) {
      const allData = { ...state[action.payload.type] };

      action.payload.data.forEach((payload) => {
        Object.assign(allData, { [payload.id]: payload });
      });

      state[action.payload.type] = allData;
    },
    removeSelectData<T extends keyof SelectSliceState>(
      state: SelectSliceState,
      action: PayloadAction<{ type: T; ids: number[] }>
    ) {
      const allData = { ...state[action.payload.type] };

      action.payload.ids.forEach((id) => {
        delete allData?.[id];
      });

      state[action.payload.type] = allData;
    },
    resetSelectData<T extends keyof SelectSliceState>(
      state: SelectSliceState,
      action: PayloadAction<T>
    ) {
      state[action.payload] = {};
    }
  }
});

export default selectSlice.reducer;

export const {
  reducer: selectReducer,
  actions: { addSelectData, removeSelectData, resetSelectData }
} = selectSlice;
