import axios from 'axios';

export const BASE_URL = '/';
export const STOCKS_BASE_URL = '/api/stocks';
export const ESTATES_BASE_URL = '/api/estates';
export const ENERGY_BASE_URL = '/api/energy';
export const SOCKET_BASE_URL = '/api';

export const authInstance = axios.create({
  baseURL: BASE_URL + '/users',
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
