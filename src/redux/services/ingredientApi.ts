import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/constants-urls';
import { Ingredient } from '../../utils/types';
import { EntityState, createEntityAdapter } from '@reduxjs/toolkit/react';

const ingredientsAdapter = createEntityAdapter<Ingredient, string>({
  selectId: (ingredient) => ingredient._id,
});

export const ingredientApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getIngredients: builder.query<EntityState<Ingredient, string>, void>({
      query: () => ({
        url: 'ingredients',
      }),
      transformResponse: (response: { data: Ingredient[] }) => {
        return ingredientsAdapter.setAll(
          ingredientsAdapter.getInitialState(),
          response.data
        );
      },
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientApi;
