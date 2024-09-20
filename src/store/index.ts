import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from "./authSlice";
import advanceFilterReducer from "./advanceFilterSlice"; // Ensure this is updated
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: authReducer,
  advanceFilter: advanceFilterReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["advanceFilter"], // Ensure advanceFilter is persisted
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
