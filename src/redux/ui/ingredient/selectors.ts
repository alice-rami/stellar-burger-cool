import { RootState } from '../..';

export const selectCurrentIngredient = (store: RootState) =>
  store.currentIngredient;
