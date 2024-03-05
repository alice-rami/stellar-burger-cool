import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientApi } from './services/ingredientApi';
import { burgerSlice } from './ui/burger/index';

const rootReducer = combineReducers({
  [ingredientApi.reducerPath]: ingredientApi.reducer,
  burger: burgerSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
