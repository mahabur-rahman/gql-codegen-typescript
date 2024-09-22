import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import authReducer, { rehydrateAuth } from "./authSlice"; // Import rehydrateAuth
import advanceFilterReducer from "./advanceFilterSlice";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: authReducer,
  advanceFilter: advanceFilterReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "advanceFilter"], // Only persist necessary reducers
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Dispatch rehydrateAuth to ensure rehydration from localStorage
store.subscribe(() => {
  const { auth } = store.getState();
  if (!auth.accessToken && localStorage.getItem("accessToken")) {
    store.dispatch(rehydrateAuth());
  }
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
