import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import logger from 'redux-logger';
import energyReducer from './reducers/energy/energy';
import stocksReducer from './reducers/stocks/stocks';
import estatesReducer from './reducers/estates/estates';
import individualStockReducer from './reducers/stocks/individualStock';
import tradingReducer from './reducers/stocks/trading';
import userReducer from './reducers/auth/auth';
import holdingEstatesReducer from './reducers/estates/holding';
import holdingEnergyReducer from './reducers/energy/holding';

const StockPersistConfig = {
  key: 'individualStock',
  storage: storage,
  whiteList: ['upDown', 'stockRate', 'close', 'detail'],
};

const TradingPersistConfig = {
  key: 'trading',
  storage: storage,
  whiteList: ['selectExchange', 'selectCode'],
};

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
  individualStock: persistReducer(StockPersistConfig, individualStockReducer),
  trading: persistReducer(TradingPersistConfig, tradingReducer),
  stocks: stocksReducer,
  holdingEstates: holdingEstatesReducer,
  holdingEnergy: holdingEnergyReducer,
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
