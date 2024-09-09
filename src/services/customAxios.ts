import { AxiosRequestConfig, AxiosResponse } from 'axios';
import server from '@/services/index';

export const getData = async <T>(
  url: string,
  config?: AxiosRequestConfig,
  queryString?: { [key: string]: string | number | boolean | undefined },
) => {
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

    const response: AxiosResponse<T> = await server.get<T>(fullUrl, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postData = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) => {
  try {
    const response = await server.post<T>(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putData = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await server.put<T>(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchData = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) => {
  try {
    const response: AxiosResponse<T> = await server.patch<T>(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async <T>(
  url: string,
  config?: AxiosRequestConfig,
) => {
  try {
    const response: AxiosResponse<T> = await server.delete<T>(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
