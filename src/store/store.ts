import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import logger from 'redux-logger';
import energyReducer from './reducers/energy/energy';
import estatesReducer from './reducers/estates/estates';
import userReducer from './reducers/auth/auth';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['estates'],
};

const myMiddlewares = [logger];

const rootReducer = combineReducers({
  user: userReducer,
  energy: energyReducer,
  estates: estatesReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(myMiddlewares),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
