import { createSlice } from '@reduxjs/toolkit';
import { Ingredient } from '../../../utils/types';
import { PayloadAction } from '@reduxjs/toolkit';

interface IngredientState {
  ingredient: Ingredient | null;
}

export const initialState: IngredientState = {
  ingredient: null,
};

export const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    setCurrentIngredient(state, action: PayloadAction<Ingredient>) {
      state.ingredient = action.payload;
    },
  },
});

export const currentIngredientActions = currentIngredientSlice.actions;
