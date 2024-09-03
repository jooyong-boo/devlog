import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import server from '@/services/index';

const handleError = <T>(error: unknown): Promise<T> => {
  if (axios.isAxiosError(error) && typeof error.message === 'string') {
    throw new Error(error.message);
  }
  throw new Error((error as AxiosError<T>).message);
};

export const getData = async <T>(
  url: string,
  config?: AxiosRequestConfig,
  queryString?: { [key: string]: string | number | boolean | undefined },
): Promise<T> => {
  try {
    const searchParams = new URLSearchParams();
    if (queryString) {
      Object.entries(queryString).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
    }
    const fullUrl = `${url}${
      searchParams.toString() ? `?${searchParams.toString()}` : ''
    }`;

    const response = await server.get<T>(fullUrl, config);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const postData = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response = await server.post<T>(url, data, config);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const putData = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response = await server.put<T>(url, data, config);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const patchData = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response = await server.patch<T>(url, data, config);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteData = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response = await server.delete<T>(url, config);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};
