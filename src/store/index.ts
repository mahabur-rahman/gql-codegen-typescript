import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './authSlice';
import advanceFilterReducer from './advanceFilterSlice';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

// Create a root reducer combining all the slices
const rootReducer = combineReducers({
  auth: authReducer,               // Non-persisted slice
  advanceFilter: advanceFilterReducer, // Slice to be persisted
});

// Configure persist for the advanceFilter slice
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['advanceFilter'], // Only advanceFilter slice will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check to avoid issues with non-serializable data in actions (redux-persist uses non-serializable data)
    }),
});

// Persist store
export const persistor = persistStore(store);

// TypeScript types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
