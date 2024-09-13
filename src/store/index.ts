import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import advanceFilterReducer from "./advanceFilterSlice"; // Ensure you create this file


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["advanceFilter"],
};


const persistedAdvanceFilterReducer = persistReducer(
  persistConfig,
  advanceFilterReducer
);


export const store = configureStore({
  reducer: {
    auth: authReducer,
    advanceFilter: persistedAdvanceFilterReducer,
  },
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
