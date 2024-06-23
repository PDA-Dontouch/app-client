import axios from 'axios';

export const BASE_URL = '/';
export const USER_BASE_URL = 'http://192.168.44.114:8081/api/user';
export const STOCKS_BASE_URL = 'http://192.168.44.114:8082/api/stocks';
export const ESTATES_BASE_URL = 'http://192.168.44.114:8083/api/estates';
export const ENERGY_BASE_URL = 'http://192.168.44.114:8084/api/energy';
export const HOLDING_BASE_URL = 'http://192.168.44.114:8085/api/holding';

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

export const holdingInstance = axios.create({
  baseURL: HOLDING_BASE_URL,
});
