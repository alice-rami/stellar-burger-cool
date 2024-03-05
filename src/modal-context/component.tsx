import { useState, ReactNode } from 'react';
import { IngredientModalContext } from './context';
import { Ingredient } from '../utils/types';

interface IngredientModalProviderProps {
  children?: ReactNode;
}
export interface IngredientModalData {
  isOpen: boolean;
  ingredient: Ingredient | null;
}
export const IngredientModalProvider = ({
  children,
}: IngredientModalProviderProps) => {
  const [ingredientModalData, setIngredientModalData] =
    useState<IngredientModalData>({
      isOpen: false,
      ingredient: null,
    });
  return (
    <IngredientModalContext.Provider
      value={{ ingredientModalData, setIngredientModalData }}
    >
      {children}
    </IngredientModalContext.Provider>
  );
};
