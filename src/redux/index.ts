import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientApi } from './services/ingredientApi';

const rootReducer = combineReducers({
  [ingredientApi.reducerPath]: ingredientApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
