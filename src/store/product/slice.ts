import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from 'domain/models';

export interface ProductSliceState {
  productSelected: { [key in number]: Product };
}

const initialState: ProductSliceState = {
  productSelected: {}
};

const productSlice = createSlice({
  initialState,
  name: 'product',
  reducers: {
    addProduct(state: ProductSliceState, action: PayloadAction<Product[]>) {
      const allData = { ...state.productSelected };

      action.payload.forEach((payload) => {
        Object.assign(allData, { [payload.id]: payload });
      });

      state.productSelected = allData;
    },
    removeProduct(state: ProductSliceState, action: PayloadAction<number[]>) {
      const allData = { ...state.productSelected };

      action.payload.forEach((payload) => {
        delete allData?.[payload];
      });

      state.productSelected = allData;
    },
    resetProduct(state: ProductSliceState) {
      state.productSelected = {};
    }
  }
});

export default productSlice.reducer;

export const {
  reducer: productReducer,
  actions: { addProduct, removeProduct, resetProduct }
} = productSlice;
