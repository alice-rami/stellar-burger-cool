import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/constants-urls';
import { Ingredient } from '../../utils/types';

export const ingredientApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getIngredients: builder.query<Ingredient[], void>({
      query: () => ({
        url: 'ingredients',
      }),
      transformResponse: (response: { data: Ingredient[] }) => response.data,
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientApi;
