import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import logger from 'redux-logger';
import energyReducer from './reducers/energy/energy';
import estatesReducer from "./reducers/estates/estates";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: [],
};

const myMiddlewares = [logger];

const rootReducer = combineReducers({
  energy: energyReducer,
  estates: estatesReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(myMiddlewares)
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;