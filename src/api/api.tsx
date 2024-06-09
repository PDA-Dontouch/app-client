import axios from "axios";

export const BASE_URL = '/api';

export const authInstance = axios.create({
  baseURL: BASE_URL + '/users',
})

export const energyInstance = axios.create({
  baseURL: BASE_URL + '/energy',
})