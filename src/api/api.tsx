import axios from 'axios';

export const BASE_URL = '/';
export const ESTATES_BASE_URL = '/api/estates';

export const authInstance = axios.create({
  baseURL: BASE_URL + '/users',
});

export const energyInstance = axios.create({
  baseURL: BASE_URL + '/energy',
});

export const estatesInstance = axios.create({
  baseURL: ESTATES_BASE_URL,
});

export const stockInstance = axios.create({
  baseURL: 'http://localhost:8082/api/stocks',
});
