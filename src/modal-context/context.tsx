import { Dispatch, SetStateAction, createContext } from 'react';
import { IngredientModalData } from './component';

interface IngredientModalContextProps {
  ingredientModalData: IngredientModalData;
  setIngredientModalData?: Dispatch<SetStateAction<IngredientModalData>>;
}

export const IngredientModalContext =
  createContext<IngredientModalContextProps>({ingredientModalData: {isOpen: false, ingredient: null}});
