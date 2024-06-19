import { AxiosResponse } from 'axios';

type ErrorType = {
  httpStatus: string;
  errorMessage: string;
};

type ResponseType<T> = {
  success: boolean;
  response: T;
  error: ErrorType;
};

export type WithToken = {
  token: string;
};

export type WithUserId = {
  userId: number;
};

export type AxiosRes<T> = AxiosResponse<ResponseType<T>>;
export type PromiseAxiosRes<T> = Promise<AxiosRes<T>>;
