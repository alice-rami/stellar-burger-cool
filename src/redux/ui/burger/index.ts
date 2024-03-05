import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { Ingredient } from '../../../utils/types';
import { resetToDefault } from '../reset-action';

export interface IngredientWithUId extends Ingredient {
  uid: string;
}

interface BurgerState {
  bun: Ingredient | null;
  midPart: IngredientWithUId[];
}

interface MoveIndices {
  index: number;
  atIndex: number;
}

export const initialState: BurgerState = {
  bun: null,
  midPart: [],
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addBun(state, action: PayloadAction<Ingredient>) {
      state.bun = action.payload;
    },
    addMidPartIngredient: {
      reducer: (state, action: PayloadAction<IngredientWithUId>) => {
        state.midPart.push(action.payload);
      },
      prepare: (ingredient: Ingredient): { payload: IngredientWithUId } => {
        const uid = nanoid();
        return { payload: { uid, ...ingredient } };
      },
    },
    moveMidPartIngredient(state, action: PayloadAction<MoveIndices>) {
      const { index, atIndex } = action.payload;
      const card1 = state.midPart[index];
      state.midPart.splice(index, 1);
      state.midPart.splice(atIndex, 0, card1);
    },
    removeMidPartIngredient(state, action: PayloadAction<string>) {
      state.midPart = state.midPart.filter(
        (item) => item.uid !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetToDefault, (state) => {
      state.bun = null;
      state.midPart = [];
    });
  },
});

export const burgerActions = burgerSlice.actions;
