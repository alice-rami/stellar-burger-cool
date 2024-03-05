import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../..';

// constructorDataSelector
export const selectBurgerModule = (store: RootState) => store.burger;

// getIdsArray
export const selectIdsArray = createSelector(
  [selectBurgerModule],
  ({ bun = null, midPart = [] }) => {
    const ids: string[] = [];
    if (midPart.length !== 0) {
      midPart.forEach((item) => {
        ids.push(item._id);
      });
    }
    if (bun !== null) {
      ids.push(bun._id);
      ids.unshift(bun._id);
    }
    return ids;
  }
);

export const selectIngredientCount = (store: RootState, id: string) =>
  selectIdsArray(store).filter((item) => item === id).length;

// calcOrderTotal
export const selectOrderTotal = createSelector(
  [selectBurgerModule],
  ({ bun = null, midPart = [] }) => {
    let twoBunsPrice = 0;
    let midPartPrice = 0;

    if (bun !== null) {
      twoBunsPrice = bun.price * 2;
    }
    if (midPart.length !== 0) {
      midPartPrice = midPart.reduce((acc, current) => acc + current.price, 0);
    }
    return twoBunsPrice + midPartPrice;
  }
);

// checkIsReadyForSubmit
export const selectIsReadyForSubmit = createSelector(
  [selectBurgerModule],
  ({ bun = null, midPart = [] }) => bun === null || midPart.length === 0
);
