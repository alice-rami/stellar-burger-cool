import { useContext } from 'react';
import { IngredientModalContext } from './context';

export function useIngredientModal() {
  return useContext(IngredientModalContext);
}
