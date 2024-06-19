import axios from 'axios';

export const BASE_URL = '/';
export const USER_BASE_URL = '/api/user';
export const STOCKS_BASE_URL = '/api/stocks';
export const ESTATES_BASE_URL = '/api/estates';
export const ENERGY_BASE_URL = '/api/energy';
export const SOCKET_BASE_URL = '/api';
export const HOLDING_BASE_URL = '/api/holding';

export const authInstance = axios.create({
  baseURL: USER_BASE_URL,
});

export const energyInstance = axios.create({
  baseURL: ENERGY_BASE_URL,
});

export const estatesInstance = axios.create({
  baseURL: ESTATES_BASE_URL,
});

export const stockInstance = axios.create({
  baseURL: STOCKS_BASE_URL,
});

export const socketInstance = axios.create({
  baseURL: SOCKET_BASE_URL,
});

export const holdingInstance = axios.create({
  baseURL: HOLDING_BASE_URL,
});
