import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['cart'],
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
