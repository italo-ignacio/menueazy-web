import { createSlice } from '@reduxjs/toolkit';
import type { Category, Image } from 'domain/models';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ProductId {
  id: number;
  name: string;
  description?: string;
  price: number | string;
  inStock: boolean;
  published: boolean;
  highlight: boolean;
  discount?: number | string;
  startDiscountAt?: Date | null;
  finishDiscountAt?: Date | null;
  onlyInRestaurant: boolean;
  priceByKmInDelivery?: number | string;
  categoryList?: Category[];
  imageList?: Image[];
  avgRate?: number;
  totalRate?: number;
  totalOrder?: number;
}

export interface ProductIdIngredient {
  id?: number;
  quantity: number | string;
  additionalPrice: number | string;
  canAdd: boolean;
  canRemove: boolean;
  maxAddQuantity: number;
}

export interface ProductIdAdditional {
  productOptionGroupList: {
    id: number;
    name: string;
    description: string;
    minSelection: number;
    maxSelection: number;
    required: boolean;
    productOptionItemList: {
      id: number;
      name: string;
      description: string;
      imageUrl: string;
      additionalPrice: string;
    }[];
  }[];
}

export interface ProductIdState {
  product: ProductId | null;
  ingredient: ProductIdIngredient | null;
  additional: ProductIdAdditional | null;
}

const initialState: ProductIdState = {
  additional: null,
  ingredient: null,
  product: null
};

const ProductIdSlice = createSlice({
  initialState,
  name: 'productId',
  reducers: {
    resetProductId(state: ProductIdState) {
      state.product = null;
    },
    resetProductIdAdditional(state: ProductIdState) {
      state.additional = null;
    },
    resetProductIdIngredient(state: ProductIdState) {
      state.ingredient = null;
    },
    setProductId(state: ProductIdState, action: PayloadAction<Partial<ProductId>>) {
      if (state.product) state.product = { ...(state.product ?? {}), ...action.payload };
    },
    setProductIdAdditional(
      state: ProductIdState,
      action: PayloadAction<Partial<ProductIdAdditional>>
    ) {
      if (state.additional) state.additional = { ...(state.additional ?? {}), ...action.payload };
    },
    setProductIdComplete(state: ProductIdState, action: PayloadAction<ProductId>) {
      state.product = action.payload;
    },
    setProductIdCompleteAdditional(
      state: ProductIdState,
      action: PayloadAction<ProductIdAdditional>
    ) {
      state.additional = action.payload;
    },
    setProductIdCompleteIngredient(
      state: ProductIdState,
      action: PayloadAction<ProductIdIngredient>
    ) {
      state.ingredient = action.payload;
    },
    setProductIdIngredient(
      state: ProductIdState,
      action: PayloadAction<Partial<ProductIdIngredient>>
    ) {
      if (state.ingredient) state.ingredient = { ...(state.ingredient ?? {}), ...action.payload };
    }
  }
});

export default ProductIdSlice.reducer;

export const {
  reducer: productIdReducer,
  actions: {
    setProductId,
    resetProductId,
    resetProductIdAdditional,
    resetProductIdIngredient,
    setProductIdAdditional,
    setProductIdComplete,
    setProductIdCompleteAdditional,
    setProductIdCompleteIngredient,
    setProductIdIngredient
  }
} = ProductIdSlice;
