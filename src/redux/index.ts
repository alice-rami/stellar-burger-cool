import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientApi } from './services/ingredientApi';
import { burgerSlice } from './ui/burger/index';
import { ordersApi } from './services/feedApi';
import { userSlice } from './ui/user/index';
import { modalSlice } from './ui/modal/index';

const rootReducer = combineReducers({
  [ingredientApi.reducerPath]: ingredientApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  burger: burgerSlice.reducer,
  user: userSlice.reducer,
  modal: modalSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      ingredientApi.middleware,
      ordersApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
