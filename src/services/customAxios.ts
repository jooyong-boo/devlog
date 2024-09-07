import server from './index';

type RequestConfig = RequestInit & {
  params?: Record<string, string | number | boolean | undefined>;
};

const appendQueryString = (
  url: string,
  params?: Record<string, string | number | boolean | undefined>,
) => {
  if (!params) return url;
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  });
  return `${url}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
};

export const getData = async <T>(
  url: string,
  config?: RequestConfig,
): Promise<T> => {
  try {
    const fullUrl = appendQueryString(url, config?.params);
    const response = await server.get(fullUrl, config);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const postData = async <T>(
  url: string,
  data?: unknown,
  config?: RequestConfig,
): Promise<T> => {
  try {
    const response = await server.post(url, data, config);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const putData = async <T>(
  url: string,
  data?: unknown,
  config?: RequestConfig,
): Promise<T> => {
  try {
    const response = await server.put(url, data, config);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const patchData = async <T>(
  url: string,
  data?: unknown,
  config?: RequestConfig,
): Promise<T> => {
  try {
    const response = await server.patch(url, data, config);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteData = async <T>(
  url: string,
  config?: RequestConfig,
): Promise<T> => {
  try {
    const response = await server.delete(url, config);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  } catch (error) {
    throw error;
  }
};
